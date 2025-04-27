import Lottie from "lottie-react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import logo from "../../assets/signup.json";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../../components/SocialLogin";
import { TbFidgetSpinner } from "react-icons/tb";
const Login = () => {
  const navigate = useNavigate();
  
  const location = useLocation();
  const { signInUser, resetPassword } = useAuth();
  const [eyes, setEyes] = useState(false);
  const [captcha, setCaptcha] = useState(null);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const { user } = await signInUser(data.email, data.password);
      if (user) {
        reset();
        navigate(location?.state ? location?.state : "/");
        toast.success(`Wellcome ${user?.displayName} Login successfully ✅`);
      }
    } catch (err) {
      if (err)
        return toast.error(
          "email and password should match with the registered email and password"
        );
    }
  };
  const handleResetPassword = async () => {
    const emailRef = getValues("email");
    if (!emailRef) {
      return toast.error("Please provider the vilid email");
    }
    await resetPassword(emailRef);
    return toast.success(
      "Do you reset Want to go to your email password? Please check your email. "
    );
  };
  return (
    <div className="hero">
      <div className="hero-content flex-col lg:flex-row">
        <div>
          <Lottie animationData={logo} loop={true} autoplay={true} />
        </div>
        <div className="car w-full max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="fieldset-label">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Enter Your Email"
                  className="input input-bordered w-full"
                />
                <label className="fieldset-label">Password</label>
                <div className="relative">
                  <input
                    type={eyes ? "text" : "password"}
                    {...register("password")}
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
                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_RECATCHA_KEY}
                  onChange={(value) => setCaptcha(value)}
                />
                <Link onClick={handleResetPassword} className="link link-hover text-black">
                  Forgot password?
                </Link>
                <button disabled={!captcha} className="btn btn-neutral mt-4">
                  {isSubmitting ? (
                    <span className="flex items-center">
                      Loading..
                      <TbFidgetSpinner
                        size={20}
                        className="animate-spin m-auto"
                      />
                    </span>
                  ) : (
                    "Login"
                  )}
                </button>
              </fieldset>
              <SocialLogin />
              <p className="text-black">
                Don’t have an account? Create an{" "}
                <Link to={"/signup"} className="text-blue-300">
                  account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
