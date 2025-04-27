import { CenterSite, LfetSite, RightSite } from "./customNavbar/NavSection";
const Navbar = () => {
  return (
    <div className="navbar text-white p-0 border_box w-11/12 lg:w-10/12 mx-auto">
      <LfetSite />
      <CenterSite />
      <RightSite />
    </div>
  );
};

export default Navbar;
