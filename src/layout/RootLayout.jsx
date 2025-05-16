import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const RootLayout = () => {
  const location = useLocation();
  const isLocation = location.pathname;
  const noHeFo =
    isLocation.includes("/login") || isLocation.includes("/signup");
  return (
    <div>
    {/* <div className="bg-gradient-to-b lg:bg-gradient-to-b from-cyan-100"> */}
      {noHeFo || <Navbar />}
       {/* ✅ এটি এখানে বসানো সঠিক  */}
      <div className="w-11/12 lg:w-10/12 mx-auto min-h-[calc(100svh-125px)]">
        <Outlet />
      </div>
      {noHeFo || <Footer />}
    </div>
  );
};

export default RootLayout;
