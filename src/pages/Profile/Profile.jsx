import useAuth from "../../hooks/useAuth";
import logo from "../../assets/footer.jpg";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { generateImage } from "../../api/utils/utils";
import { TbFidgetSpinner } from "react-icons/tb";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { succesToast, warningToast } from "../../components/CustomNotification";
const Profile = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user, updateUserProfile, resetPassword } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const profile = await generateImage(data.profile, data.profile);
      if(!profile) return warningToast("prompt is missing")
      await updateUserProfile(data.name, profile);
      const userInfo = {
        name: data?.name,
        image: profile,
      };
      const res = await axiosSecure.patch(
        `/update-profile/${user?.email}`,
        userInfo
      );
      console.log(res.data);
        if (res.data.modifiedCount > 0) {
          reset();
          succesToast(`✅ Create user succesfully`);
          navigate("/");
        }
    } catch (error) {
      console.log(error);
    }
  };
  const handleResetPassword = async () => {
    const emailRef = getValues("email");
    console.log(emailRef);
    if (!emailRef) {
      return warningToast.error("Please provider the vilid email");
    }
    await resetPassword(emailRef);
    navigate("/")
    return succesToast(
      "Do you reset Want to go to your email password? Please check your email. "
    );
  };
  return (
    <div
      className="bg-cover bg-center"
      style={{
        backgroundImage: `url(${logo})`,
      }}
    >
      <div className="hero-overlay bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]"></div>
      {/* Profile Content */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row gap-4 p-4">
          <div className="w-full">
            <fieldset className="fieldset">
              <label className="text-white">Email</label>
              <input
                defaultValue={user?.email}
                readOnly
                {...register("email")}
                type="email"
                className="input w-full"
                placeholder="user Email"
              />
              <label className="text-white">Update Profile</label>
              <input
                type="text"
                {...register("profile", {
                  minLength: 15,
                  maxLength: 25,
                })}
                placeholder="Generate a image name."
                className="input input-bordered w-full"
              />
              {errors.profile?.type === "minLength" && (
                <span className="text-red-500">text much be 15 characters</span>
              )}
              {errors.profile?.type === "maxLength" && (
                <span className="text-red-500">
                  Sorry 25 characters is over
                </span>
              )}
            </fieldset>
          </div>
          <div className="w-full">
            <fieldset className="fieldset">
              <label className="text-white">Update Name</label>
              <input
                defaultValue={user?.displayName}
                {...register("name")}
                type="text"
                className="input w-full"
                placeholder="user name"
              />
              <label
                onClick={handleResetPassword}
                className="text-white text-lg cursor-pointer md:mt-7 link"
              >
                Forgot password?
              </label>
            </fieldset>
          </div>
        </div>
        <button className="btn btn-neutral mt-4 w-full">
          {isSubmitting ? (
            <span className="flex items-center">
              Loading..
              <TbFidgetSpinner size={20} className="animate-spin m-auto" />
            </span>
          ) : (
            "Update & Continue"
          )}
        </button>
      </form>
    </div>
  );
};
export default Profile;
