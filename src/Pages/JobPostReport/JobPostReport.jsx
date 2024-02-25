import { useParams } from "react-router-dom";
import useFetchData from "../../Comonents/Hooks/UseFetchData/useFetchData";
import Loader from "../../Comonents/Loader/Loader";
import { AuthContext } from "../../Comonents/AuthProvider/AuthProvider";
import { useContext } from "react";
import UseAxiosPublic from "../../Comonents/Hooks/UseAxiosPublic/UseAxiosPublic";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


const JobPostReport = () => {

    const {id}=useParams()
    const { user } = useContext(AuthContext);
   console.log(user)
  const axiosPublic = UseAxiosPublic();
  const { register, handleSubmit, reset } = useForm();
  
    const { data: job, loading, refetch } = useFetchData(
        `/staticjobpost/${id}`,
        "job"
      );
    
      if (loading) {
        return <Loader />;
      }
    
      refetch();
      
      const {
        job_title,
        company_name,
        hiring_manager_email,
      } = job;
    
  
  const onSubmit = async (data) => {
    const formData = {
      job_title: data.name,
      company_name: data.companyname,
      hiring_manager_email: data.manageremail,
      user_email: data.useremail,
      user_name:data.username,
      user_comments:data.comments
     
    };
    console.log(formData);
    const dataForm = await axiosPublic.post("/userreport", formData);
    if (dataForm.data.insertedId) {
              reset();
              Swal.fire({
                position: "top",
                icon: "success",
                title: "Thank you for sharing the report with us",
                showConfirmButton: false,
                timer: 1500,
              });
            }



  };

    return (
        <div>
            <form className="p-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text font-serif font-bold text-lg ">
              Job Title*
            </span>
          </label>
          <input
            type="text"
            placeholder="Job Title"
            {...register("name", { required: true })}
            required
            className="input input-bordered w-full"
            defaultValue={ job_title}
            readOnly
          />
        </div>
        <div className="flex gap-6">
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text font-serif font-bold text-lg ">
                Company Name*
              </span>
            </label>
            <input
              type="text"
              placeholder="Company Name"
              {...register("companyname", { required: true })}
              required
              className="input input-bordered w-full"
              defaultValue={company_name}
              readOnly
            />
          </div>

          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text font-serif font-bold text-lg ">
                Hiring Manager Email*
              </span>
            </label>
            <input
              type="text"
              placeholder="Hiring Manager Email"
              {...register("logo", { required: true })}
              className="input input-bordered w-full"
              defaultValue={hiring_manager_email}
              readOnly
            />
          </div>
        </div>
        <div className="flex gap-6">
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text font-serif font-bold text-lg ">
                User Name*
              </span>
            </label>
            <input
              type="text"
              placeholder="User Name"
              {...register("username", { required: true })}
              required
              className="input input-bordered w-full"
              
            />
          </div>

          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text font-serif font-bold text-lg ">
               user Email*
              </span>
            </label>
            <input
              type="text"
              placeholder="User Email"
              {...register("useremail", { required: true })}
              className="input input-bordered w-full"
              defaultValue={user?.email}
              readOnly
            />
          </div>
        </div>
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text font-serif font-bold text-lg ">
              Your Comments*
            </span>
          </label>
          <input
            type="text"
            placeholder="Your Comments"
            {...register("comments", { required: true })}
            required
            className="input input-bordered w-full"
          />
        </div>
        <button
          className="btn btn-warning w-full bg-white text-black text-xl font-semibold hover:bg-orange-500 hover:text-white"
          // className="btn w-full bg-orange-600 text-white"
        >
         Submit
        </button>
      </form>
        </div>
    );
};

export default JobPostReport;