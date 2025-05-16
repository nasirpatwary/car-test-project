import useAuth from "../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import { succesToast } from "./CustomNotification";
import { saveUser } from "../api/utils/utils";
const SocialLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signInGoogle, signInGithub, signInFaceBook } = useAuth();
  const handleGoogle = async () => {
    try {
      const { user } = await signInGoogle(); // This gives Firebase user
      await saveUser(user);
      succesToast("Sign In Google successful.");
      navigate(location?.state ? location?.state : "/");
    } catch (err) {
      console.log(err);
    }
  };
  // const handleGithub = async () => {
  //   const  user  = await signInGithub();
  //   const userInfo = {
  //     name: user?.displayName,
  //     email: user?.email,
  //   };
  //   try {
  //     const { data } = await axiosPublic.post("/users", userInfo);
  //     if (data) {
  //       toast.success("Sign In Github successful.");
  //       navigate(location?.state ? location?.state : "/");
  //     }
  //   } catch (err) {
  //     if (err) return toast.error(err);
  //   }
  // };
  // const handleFaceBook = async () => {
  //   const user = await signInFaceBook();
  //   console.log(user);
  // };
  return (
    <div className="space-y-4">
      <div className="divider bg-300% bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient">
        Sign In with Social loing
      </div>
      <div className="flex justify-around">
        <FcGoogle className="cursor-pointer" size={25} onClick={handleGoogle} />
        <FaGithub
          className="cursor-pointer text-black"
          size={25}
          //  onClick={handleGithub}
        />
        <FaFacebook
          className="cursor-pointer text-black"
          size={25}
          // onClick={handleFaceBook}
        />
      </div>
    </div>
  );
};

export default SocialLogin;
