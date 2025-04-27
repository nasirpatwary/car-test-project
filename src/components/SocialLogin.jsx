import useAuth from "../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import useAxiosPublic from "../hooks/useAxiosPublic";
const SocialLogin = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const axiosPublic = useAxiosPublic();
  const { signInGoogle, signInGithub, signInFaceBook } = useAuth();
  const handleGoogle = async () => {
    const { user } = await signInGoogle();
    const userInfo = {
      name: user?.displayName,
      email: user?.email,
    };
    try {
      const { data } = await axiosPublic.post("/users", userInfo);
      if (data) {
        toast.success("Sign In Google successful.");
        navigate(location?.state ? location?.state : "/");
      }
    } catch (err) {
      if (err) return toast.error(err);
    }
  };
  const handleGithub = async () => {
    const { user } = await signInGithub();
    const userInfo = {
      name: user?.displayName,
      email: user?.email,
    };
    try {
      const { data } = await axiosPublic.post("/users", userInfo);
      if (data) {
        toast.success("Sign In Github successful.");
        navigate(location?.state ? location?.state : "/");
      }
    } catch (err) {
      if (err) return toast.error(err);
    }
  };
  const handleFaceBook = async () => {
    const { user } = await signInFaceBook();
    console.log(user);
  };
  return (
    <div className="space-y-4">
      <div className="divider bg-300% bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient">
        Sign In with Social loing
      </div>
      <div className="flex justify-around">
        <FcGoogle className="cursor-pointer" size={25} onClick={handleGoogle} />
        <FaGithub className="cursor-pointer text-black" size={25} onClick={handleGithub} />
        <FaFacebook
          className="cursor-pointer text-black"
          size={25}
          onClick={handleFaceBook}
        />
      </div>
    </div>
  );
};

export default SocialLogin;
