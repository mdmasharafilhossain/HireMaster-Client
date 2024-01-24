import { useContext } from "react";
import { AuthContext } from './../AuthProvider/AuthProvider';
import { useForm } from "react-hook-form";
import UseAxiosPublic from "../Hooks/UseAxiosPublic/UseAxiosPublic";
import Swal from "sweetalert2";

// image added key from imgbb
const Image_Hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const Profile_Hosting = `https://api.imgbb.com/1/upload?key=${Image_Hosting_key}`;


const UserProfileForm = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    const { register, handleSubmit } = useForm();
    const AxiosPublic = UseAxiosPublic();
    const onSubmit = async (data) => {

        console.log(data);
        const ImageFile = { image: data.image[0] }
        const res = await AxiosPublic.post(Profile_Hosting, ImageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        console.log(res.data);
        if(res.data.success){
            const UserProfileInfo = {
                name: data.name,
                image: res.data.data.display_url,
                location: data.location,
                experience: data.experience,
                role: data.role,
                email:user?.email,
                bio:data.bio
    
            }
            // console.log(articleInfo);
            const ArticleRes = await AxiosPublic.post('/article',UserProfileInfo);
            console.log(ArticleRes.data);
            if(ArticleRes.data.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your data Added Successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
           }
 


    }
    return (
        <div className="container mx-auto">
            <div className="mt-32 border text-center p-14 " >
                <div className="mx-auto text-center  ">
                    <h1 className="text-5xl text-orange-600 border-red-400 font-bold  mb-12 py-4">Set Your HireMaster Profile</h1>
                </div>



                <div className="flex gap-96 mt-20">
                    {/* text div */}
                    <div className="mt-4">
                        <p className="text-xl font-bold">About</p>
                        <p className="text-sm ml-16">Tell us about Yourself</p>
                    </div >
                    {/* main div */}
                    <div className="flex-1">
                        <form className="container mx-auto space-y-5" onSubmit={handleSubmit(onSubmit)}>

                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text text-lg font-bold">Your Name*</span>

                                </div>
                                <input
                                    {...register("name")}
                                    type="text"
                                    placeholder="Your Name" required
                                    className="input input-bordered w-full" />

                            </label>
                            <div className="flex">
                                {/* Image div */}
                                <div>

                                </div>
                                <div>
                                    <p className="text-lg font-bold mr-32 mb-2">Upload Your Photo*</p>
                                    <input
                                        {...register("image")}
                                        type="file"
                                        className="file-input file-input-bordered w-full max-w-xs" />
                                </div>
                            </div>
                            
                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text text-lg font-bold">Your Location*</span>

                                </div>
                                <input
                                    {...register("location")}
                                    type="text"
                                    placeholder="Your Location" required
                                    className="input input-bordered w-full " />

                            </label>
                            <div className="flex gap-5">
                                <select {...register("role")}
                                    className="select select-bordered w-full text-lg font-bold mt-4">
                                    <option disabled selected required>Select Your Role*</option>
                                    <option value="Frontend Developer">Frontend Developer</option>
                                    <option value="Full Stack Developer">Full Stack Developer</option>
                                    <option value="Software Engineer">Software Engineer</option>
                                    <option value="Data Engineer">Data Engineer</option>
                                    <option value="Data Scientist">Data Scientist</option>
                                    <option value="iOS Developer">iOS Developer</option>
                                    <option value="Backend Developer">Backend Developer</option>

                                </select>
                                <select {...register("experience")}
                                    className="select select-bordered w-full text-lg font-bold mt-4">
                                    <option disabled selected required>Years of experience*</option>
                                    <option value="0 Year">0 Year</option>
                                    <option value="1 Years">1 Years</option>
                                    <option value="2 Years">2 Years</option>
                                    <option value="3 Years">3 Years</option>
                                    <option value="5 Years+">5 Years+</option>
                                    <option value="10 Years+">10 Years+</option>

                                </select>
                                
                            </div>
                            <label className="form-control">
                                <div className="label">
                                    <span className="label-text text-lg font-bold">Your bio</span>
                                   
                                </div>
                                <textarea 
                                {...register("bio")}
                                className="textarea textarea-bordered h-24" placeholder="Your Bio"></textarea>
                                
                            </label>

                            <input className="btn w-full bg-orange-600 text-white" type="submit" />
                        </form>
                    </div>
                </div>
                <hr className="text-bold mt-10" />
            </div>

        </div>
    );
};

export default UserProfileForm;