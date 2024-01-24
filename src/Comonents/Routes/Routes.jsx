import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../../LayOut/MainLayOut";
import Home from "../../Pages/Home/Home";
import SignUp from "../../Pages/SignUp/SignUp";
import Login from "../../Pages/Login/Login";
import Error from "../../Pages/Error/Error";
import Signup2 from "../../Pages/Signup2/Signup2";
import ManagerSignup from "../../Pages/Signup2/ManagerSignup";
import ManagerLogin from "../../Pages/Signup2/ManagerLogin";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut/>,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/',
        element: <Home/>,
      }
    ]
  },
  { 
    path: '/signup', element: <SignUp></SignUp> 
  },
  { 
    path: '/signup2', element: <Signup2></Signup2>
  },
  { 
    path: '/managersignup', element: <ManagerSignup></ManagerSignup>
  },
  { 
    path: '/managerlogin', element: <ManagerLogin></ManagerLogin>
  },
 {
  path:"/login",
  element:<Login></Login>
 }
]);

export default router;
