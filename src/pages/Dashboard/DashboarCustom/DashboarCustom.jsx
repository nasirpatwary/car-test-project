import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
export const DashboardLeftSite = () => {
  const {user, signOutUser, signInGoogle } = useAuth();
  return (
    <div>
      <div className="flex flex-col space-y-2">
        <Link to="/" className="hover:text-orange-400 duration-700 delay-300">
          Home
        </Link>
        <div className="my-1 h-px bg-white/15" />
        {!user?.email ? 
        <>
        <Link
          to="/login"
          className="hover:text-orange-400 duration-700 delay-300"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="hover:text-orange-400 duration-700 delay-300"
        >
          SignIn
        </Link>
        <Link
         onClick={signInGoogle}
          className="hover:text-orange-400 duration-700 delay-300"
        >
          <p>
            <span className="text-[#ff3d00]">G</span>
            <span className="text-[#ffc107]">o</span>
            <span className="text-[#ffc107]">o</span>
            <span className="text-[#4caf50]">g</span>
            <span className="text-[#ff3d00]">l</span>
            <span className="text-[#4caf50]">e</span>
          </p>
        </Link>
        </>:
        <>
        <Link
          onClick={signOutUser}
          className="duration-700 delay-300 flex items-center gap-5"
        >
          LogOut
        </Link>
        </>
        }
      </div>
    </div>
  );
};
