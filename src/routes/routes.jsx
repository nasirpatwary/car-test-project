import { Route, Routes } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home";
import SignUp from "../authentication/SignUp/SignUp";
import Login from "../authentication/Login/Login";
import Services from "../pages/Services/Services";
import PrivateRoute from "../private/PrivateRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
const routes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />}></Route>
          <Route
            path="/services"
            element={
              <PrivateRoute>
                <Services />{" "}
              </PrivateRoute>
            }
          ></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Route>
        <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          {/* <Route index element={<Home />}></Route>
          <Route
            path="/services"
            element={
              <PrivateRoute>
                <Services />{" "}
              </PrivateRoute>
            }
          ></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route> */}
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default routes;
