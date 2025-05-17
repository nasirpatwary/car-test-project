import Lottie from "lottie-react";
import logo from "../../assets/signup.json";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import SocialLogin from "../../components/SocialLogin";
import { globalToast, succesToast, warningToast } from "../../components/CustomNotification";
import { TbFidgetSpinner } from "react-icons/tb";
import { generateImage } from "../../api/utils/utils";
const SignUp = () => {
  const [eyes, setEyes] = useState(false);
  const [eyes2, setEyes2] = useState(false);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile, emailVerify } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const profile = await generateImage(data.profile, data.profile);
      await createUser(data.email, data.password);
      await updateUserProfile(data.name, profile);
      const userInfo = {
        name: data?.name,
        email: data?.email,
        image: profile,
      };
      try {
        const { data } = await axiosPublic.post("/users", userInfo);
        if (data.insertedId) {
          reset();
          succesToast(`✅ Create user succesfully`);
          navigate("/");
          await emailVerify();
          globalToast("✅ Check Your Email or verified");
        }
      } catch (error) {
        console.log(error);
      }
    } catch (err) {
      if (err)
        return warningToast(
          "auth email-already-in-use please log in or use a different email."
        );
    }
  };
  const password = watch("password");
  return (
    <div className="hero">
      <div className="hero-content flex-col md:flex-row">
        <div>
          <Lottie animationData={logo} loop={true} autoplay={true} />
        </div>
        <div className="car w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="md:card-body">
              <fieldset className="fieldset">
                <label className="fieldset-label">Name</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Enter Your Name"
                  className="input input-bordered w-full"
                />
                {errors.name && (
                  <span className="text-red-500">Please name is required</span>
                )}
                <label className="fieldset-label">Generate Image</label>
                <input
                  type="text"
                  {...register("profile", {
                    minLength: 15,
                    maxLength: 25,
                  })}
                  placeholder="Please create a image name."
                  className="input input-bordered w-full"
                />
                {errors.profile?.type === "minLength" && (
                   <span className="text-red-500">
                  text much be 15 characters
                 </span>
                )}
                {errors.profile?.type === "maxLength" && (
                   <span className="text-red-500">
                  Sorry 25 characters is over
                 </span>
                )}
                <label className="fieldset-label">Email</label>
                <input
                  type="email"
                  {...register("email", {
                    pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,}[com]/,
                  })}
                  placeholder="Enter Your Email"
                  className="input input-bordered w-full"
                />
                {errors.email?.type === "pattern" && (
                  <span className="text-red-500">
                    Email must be lowercase, include a number, and be valid
                    format
                  </span>
                )}
                <label className="fieldset-label">Password</label>
                <div className="relative">
                  <input
                    type={eyes ? "text" : "password"}
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern:
                        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}/,
                    })}
                    placeholder="Enter Your Password"
                    className="input input-bordered w-full"
                  />
                  {eyes ? (
                    <FaEye
                      onClick={() => setEyes(!eyes)}
                      className="absolute cursor-pointer right-6 top-[13px]"
                      size={15}
                    />
                  ) : (
                    <FaEyeSlash
                      onClick={() => setEyes(!eyes)}
                      className="absolute cursor-pointer right-6 top-[13px]"
                      size={15}
                    />
                  )}
                </div>
                {errors.password?.type === "required" && (
                  <span className="text-red-500">password is required</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-500">
                    password much be 6 characters
                  </span>
                )}
                {errors.password?.type === "maxLength" && (
                  <span className="text-red-500">
                    password much be lesten 18 characters
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-500">
                    password at least one lowercase one uppercase one number and
                    one special character
                  </span>
                )}
                <label className="fieldset-label">Confirm Password</label>
                <div className="relative">
                  <input
                    type={eyes2 ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password ||
                        "Passwords do not match Please Check Password",
                    })}
                    placeholder="Confirm Password"
                    className="input input-bordered w-full"
                  />
                  {eyes2 ? (
                    <FaEye
                      onClick={() => setEyes2(!eyes2)}
                      className="absolute cursor-pointer right-6 top-[13px]"
                      size={15}
                    />
                  ) : (
                    <FaEyeSlash
                      onClick={() => setEyes2(!eyes2)}
                      className="absolute cursor-pointer right-6 top-[13px]"
                      size={15}
                    />
                  )}
                </div>
                {errors.confirmPassword && (
                  <span className="text-red-500">
                    {errors.confirmPassword.message}
                  </span>
                )}
                <label className="fieldset-label">
                  <input
                    type="checkbox"
                    {...register("terms", { required: true })}
                    className="checkbox"
                  />
                  Accept Our Terms And Conditions
                </label>
                {errors.terms && (
                  <p className="text-red-500">
                    Accept Our Terms And Conditions
                  </p>
                )}
                <button className="btn btn-neutral mt-4">
                  {isSubmitting ? (
                    <span className="flex items-center">
                      Loading..
                      <TbFidgetSpinner
                        size={20}
                        className="animate-spin m-auto"
                      />
                    </span>
                  ) : (
                    "SignUp"
                  )}
                </button>
              </fieldset>
              <SocialLogin />
              <p className="text-black text-center">
                Already haven an account? Please{" "}
                <Link to={"/login"} className="text-blue-300">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
