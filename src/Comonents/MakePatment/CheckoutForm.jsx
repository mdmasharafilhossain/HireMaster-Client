import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";

import Swal from "sweetalert2";
import UseAxiosSecure from "../Hooks/UseAxiosSecure/UseAxiosSecure";
import { AuthContext } from "../AuthProvider/AuthProvider";

const CheckoutForm = () => {
  const [clicked, setClicked] = useState(false);
  const { user } = useContext(AuthContext);
  const [clientSecret, setClinetSecret] = useState("");
  const [transitionId, setTransitionId] = useState("");
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = UseAxiosSecure();
  const PayAblePrice = 16.99;

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: PayAblePrice })
      .then((res) => {
        console.log(res.data.clientSecret);
        setClinetSecret(res.data.clientSecret);
      });
  }, [axiosSecure, PayAblePrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setClicked(true);
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("Payment Successful", paymentMethod);

      setError("");
    }

    //confirm payment

    const {
      paymentIntent,
      error: confirmError,
    } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || "anonymous",
          name: user?.displayName || "anonymous",
        },
      },
    });

    if (confirmError) {
      console.log("Confirm Error", confirmError.message);
    } else {
      console.log("payment Intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("Transition ID :", paymentIntent.id);
        setTransitionId(paymentIntent.id);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Payment Successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        // Save info in database

        const payment = {
          email: user.email,
          name: user.displayName,
          price: PayAblePrice,
          date: new Date(),
          transaction_ID: paymentIntent.id,
        };
        console.log(payment);
        axiosSecure.post("/payments", payment).then((res) => {
          console.log(res.data);
        });
      }
    }
  };

  return (
    // <form className="container mx-auto border-2 rounded-lg border-orange-600 w-3/4 py-20 px-20" onSubmit={handleSubmit}>
    //   <CardElement
    //     options={{
    //       style: {
    //         base: {
    //           fontSize: '25px',
    //           color: '#FB8C00',
    //           '::placeholder': {
    //             color: '#FB8C00',
    //           },
    //         },
    //         invalid: {
    //           color: '#9e2146',
    //         },
    //       },
    //     }}
    //   />
    //   <button disabled={!stripe || !clientSecret || clicked} className={`border rounded-lg px-5 py-1 ${!stripe || !clientSecret || clicked ? 'bg-white text-black' : 'bg-orange-500 hover:bg-orange-600 text-white'}`} type="submit">
    //   Pay
    //   </button>
    //   <p className="text-red-700 font-bold">{error}</p>
    //   {
    //     transitionId && <p className="text-green-600 font-bold mt-10">Your Transition ID : {transitionId}</p>
    //   }
    // </form>
    <form
      className="container mx-auto border-2 rounded-lg border-orange-600 sm:w-full md:w-3/4 lg:w-1/2 py-10 px-5 sm:px-10 md:px-20"
      onSubmit={handleSubmit}
    >
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px", // Adjust font size for smaller screens
              color: "#FB8C00",
              "::placeholder": {
                color: "#FB8C00",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        disabled={!stripe || !clientSecret || clicked}
        className={`border rounded-lg px-5 py-2 mt-5 sm:mt-8 ${
          !stripe || !clientSecret || clicked
            ? "bg-white text-black"
            : "bg-orange-500 hover:bg-orange-600 text-white"
        }`}
        type="submit"
      >
        Pay
      </button>
      <p className="text-red-700 font-bold mt-3 md:mt-5">{error}</p>
      {transitionId && (
        <p className="text-green-600 font-bold mt-5">
          Your Transition ID : {transitionId}
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
