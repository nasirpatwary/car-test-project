import { Navigate, Route, Routes } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home";
import SignUp from "../authentication/SignUp/SignUp";
import Login from "../authentication/Login/Login";
import PrivateRoute from "../private/PrivateRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import CarDetails from "../pages/CarDetails/CarDetails";
import Profile from "../pages/Profile/ProfileLayout";
import TableCars from "../pages/Dashboard/TableCars/TableCars";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import PrivateAdmin from "../private/PrivateAdmin";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import Payment from "../pages/Dashboard/Payment/Payment";
import AddItemForm from "../pages/Dashboard/AddItemForm/AddItemForm";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
const routes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />}></Route>
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          ></Route>
          <Route path="details/:id" element={<CarDetails />}></Route>
          <Route path="signup" element={<SignUp />}></Route>
          <Route path="login" element={<Login />}></Route>
        </Route>
        {/* Dashboard Layout */}
        {/* Redirect /dashboard to /dashboard/home */}
        <Route
          path="/dashboard"
          element={<Navigate to="/dashboard/table-cars" replace />}
        />
        {/* Dashboard Layout with nested routes */}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="table-cars" element={<TableCars />}></Route>
          <Route path="payment" element={<Payment />}></Route>
          <Route path="users" element={<AllUsers />}></Route>
          <Route path="userHome" element={<UserHome />}></Route>
          <Route
            path="adminHome"
            element={
              <PrivateAdmin>
                <AdminHome />
              </PrivateAdmin>
            }
          ></Route>
          <Route
            path="pay-history"
            element={
              <PrivateAdmin>
                <PaymentHistory />
              </PrivateAdmin>
            }
          ></Route>
          <Route path="add-product" element={<AddItemForm />}></Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default routes;
