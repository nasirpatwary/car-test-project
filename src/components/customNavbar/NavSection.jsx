import { Tab } from "@headlessui/react";
import { useLocation } from "react-router-dom";
import navLogo from "../../assets/logo.png";
// Right site import
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";
import CopyToClipboard from "react-copy-to-clipboard";
import { BiHome } from "react-icons/bi";
import useAuth from "../../hooks/useAuth";
import {  succesToast } from "../CustomNotification";
const navLinks = [
  { name: "Home", route: "/" },
  { name: "Services", route: "/services" },
  { name: "Profile", route: "/profile" },
];

const LfetSite = () => {
  return (
    <div className="navbar-start">
      <Link className="text-xl">
        <img
          className="w-32 animate__animated animate__fadeInLeft"
          src={navLogo}
          alt=""
        />
      </Link>
    </div>
  );
};
const CenterSite = () => {
  const location = useLocation();
  return (
    <div className="navbar-center hidden md:flex">
      <Tab.Group
        selectedIndex={navLinks.findIndex(
          (cat) => cat.route === location.pathname
        )}
      >
        <Tab.List className="flex gap-2">
          {navLinks.map(({ name, route }) => (
            <Tab
              key={name}
              className={({ selected }) =>
                `rounded-full py-1 px-3 text-sm font-semibold focus:outline-none
                 ${
                   selected
                     ? "bg-green-100 text-black/75"
                     : "text-gray-500 hover:bg-green-100"
                 }`
              }
            >
              <Link to={route}>{name}</Link>
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  );
};
const RightSite = () => {
  const { user, signOutUser, signInGoogle } = useAuth();
  return (
    <div className="navbar-end">
      <div className="menu hidden lg:flex menu-horizontal px-1 gap-1 lg:gap-2">
        {user?.email && user?.email ? (
          <>
            <CopyToClipboard text={user?.displayName}>
              <span
                data-tooltip-id="my-tooltip"
                data-tooltip-content={`If you want this text coppy click here ${user?.displayName}`}
              >
                <img
                  onClick={() => succesToast("✅ Copied Successfully!")}
                  className="w-8 h-8 cursor-pointer animate__animated animate__fadeInLeft  rounded-full"
                  referrerPolicy="no-referrer"
                  src={
                    user?.photoURL
                      ? user?.photoURL
                      : "https://image.shutterstock.com/image-vector/man-icon-vector-260nw-1040084344.jpg"
                  }
                  alt={user?.displayName}
                />
              </span>
            </CopyToClipboard>
            <Link
              className="flex animate__animated animate__fadeInRight justify-evenly items-center border py-1 px-4 bg-black"
              onClick={signOutUser}
            >
              <CgLogOut size={18} /> LogOut
            </Link>
          </>
        ) : (
          <>
            <Link
              className="flex animate__animated animate__fadeInLeft justify-evenly items-center border py-1 px-4 bg-black"
              onClick={signInGoogle}
            >
              <span className="text-[#ff3d00]">G</span>
              <span className="text-[#ffc107]">o</span>
              <span className="text-[#ffc107]">o</span>
              <span className="text-[#4caf50]">g</span>
              <span className="text-[#ff3d00]">l</span>
              <span className="text-[#4caf50]">e</span>
            </Link>
            <Link
              className="border animate__animated animate__fadeInUp py-1 px-4 bg-black"
              to={"/signup"}
            >
              SignUp
            </Link>
            <Link
              className="border animate__animated animate__fadeInRight py-1 px-4 bg-black"
              to={"/login"}
            >
              Login
            </Link>
          </>
        )}
      </div>
      <div className="lg:hidden w-52 text-right">
        <Menu __demoMode>
          <MenuButton className="inline-flex items-center gap-2 rounded-md py-1 px-3 text-sm/6 font-semibold text-black/75 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-white/30 data-[open]:bg-white/20 data-[focus]:outline-1 data-[focus]:outline-white">
            Menu
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom end"
            className="w-52 mt-4 origin-top-right rounded-xl border bg-base-300 p-1 text-sm/6 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <MenuItem>
              <Link
                to="/"
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
              >
                <BiHome size={18}></BiHome> Home
                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                  ⌘D
                </kbd>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to="/services"
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
              >
                <BiHome size={18}></BiHome> Services
                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                  ⌘D
                </kbd>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to="/"
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
              >
                <BiHome size={18}></BiHome> Profile
                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                  ⌘D
                </kbd>
              </Link>
            </MenuItem>
            <div className="my-1 h-px bg-white/5" />
            {user?.email && (
              <>
                <img
                  className="w-8 h-8 animate__animated animate__bounce animate__repeat-2 mx-auto rounded-full"
                  referrerPolicy="no-referrer"
                  src={
                    user?.photoURL
                      ? user?.photoURL
                      : "https://image.shutterstock.com/image-vector/man-icon-vector-260nw-1040084344.jpg"
                  }
                  alt={user?.displayName}
                />
                <p className="text-center">{user?.displayName}</p>
              </>
            )}
            {user?.email ? (
              <>
                <MenuItem>
                  <button
                    onClick={signOutUser}
                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                  >
                    LogOut
                    <kbd className="ml-auto hidden font-sans text-xs group-data-[focus]:inline">
                      <MdOutlineLogout size={20} />
                    </kbd>
                  </button>
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem>
                  <button
                    onClick={signInGoogle}
                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                  >
                    <p>
                      <span className="text-[#ff3d00]">G</span>
                      <span className="text-[#ffc107]">o</span>
                      <span className="text-[#ffc107]">o</span>
                      <span className="text-[#4caf50]">g</span>
                      <span className="text-[#ff3d00]">l</span>
                      <span className="text-[#4caf50]">e</span>
                    </p>
                    <kbd className="ml-auto hidden font-sans text-xs group-data-[focus]:inline">
                      ⌘G
                    </kbd>
                  </button>
                </MenuItem>
                <MenuItem>
                  <Link
                    to={"/signup"}
                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                  >
                    Sign Up
                    <kbd className="ml-auto hidden font-sans text-xs group-data-[focus]:inline">
                      ⌘S
                    </kbd>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to={"/login"}
                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                  >
                    Login
                    <kbd className="ml-auto hidden font-sans text-xs group-data-[focus]:inline">
                      ⌘L
                    </kbd>
                  </Link>
                </MenuItem>
              </>
            )}
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
};

export { LfetSite, CenterSite, RightSite };
