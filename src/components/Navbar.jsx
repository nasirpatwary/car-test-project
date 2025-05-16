import { Link, NavLink } from "react-router";
import { CenterSite, LfetSite, RightSite } from "./customNavbar/NavSection";
import { useAdmin, useMyCars } from "../hooks/useCollection";
import useAuth from "../hooks/useAuth";
const Navbar = () => {
  const [cars] = useMyCars();
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  console.log(isAdmin);
  const navLinks = (
    <>
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          `px-3 text-base ${
            isActive
              ? "bg-green-100 duration-700 text-black/75"
              : "text-gray-500 hover:bg-green-100 duration-700"
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to={"/profile"}
        className={({ isActive }) =>
          `px-3 text-base ${
            isActive
              ? "bg-green-100 duration-700 text-black/75"
              : "text-gray-500 hover:bg-green-100 duration-700"
          }`
        }
      >
        Profile
      </NavLink>
      {user && (
        <NavLink
          to={isAdmin ? "/dashboard/adminHome" : "/dashboard/userHome"}
          className={({ isActive }) =>
            `px-3 text-base ${
              isActive
                ? "bg-green-100 duration-700 text-black/75"
                : "text-gray-500 hover:bg-green-100 duration-700"
            }`
          }
        >
          Dashboard
        </NavLink>
      )}
      <Link to={"/dashboard/table-cars"}>
         <div className={`badge badge-secondary`}>+ {cars.length}</div>
      </Link>
    </>
  );
  return (
    <div className="navbar justify-between text-white p-0 border_box w-11/12 lg:w-10/12 mx-auto">
      <LfetSite />
      <CenterSite navLinks={navLinks} />
      <RightSite />
    </div>
  );
};

export default Navbar;
