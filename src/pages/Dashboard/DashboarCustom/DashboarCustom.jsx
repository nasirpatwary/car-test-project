import { Link, NavLink, useLocation } from "react-router";
import useAuth from "../../../hooks/useAuth";
import {
  useAdmin,
  useMyCars,
  useProduct,
  useUsers,
} from "../../../hooks/useCollection";
export const DashboardLeftSite = () => {
  const [cars] = useMyCars();
  const [isAdmin] = useAdmin();
  const { user, signOutUser, signInGoogle } = useAuth();
  return (
    <div>
      <div className="flex flex-col space-y-2">
        {isAdmin ? (
          <>
            <span>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-400 duration-700 delay-300 underline underline-offset-8"
                    : "hover:underline hover:underline-offset-8 hover:text-orange-400 duration-700 delay-300"
                }
                to="/dashboard/adminHome"
              >
                AdminHome
              </NavLink>
            </span>
            <span>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-400 duration-700 delay-300 underline underline-offset-8"
                    : "hover:underline hover:underline-offset-8 hover:text-orange-400 duration-700 delay-300"
                }
                to="/dashboard/pay-history"
              >
                PayHistory
              </NavLink>
            </span>
            <span>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-400 duration-700 delay-300 underline underline-offset-8"
                    : "hover:underline hover:underline-offset-8 hover:text-orange-400 duration-700 delay-300"
                }
                to="/dashboard/payment"
              >
                Payment
              </NavLink>
            </span>
            <span>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-400 duration-700 delay-300 underline underline-offset-8"
                    : "hover:underline hover:underline-offset-8 hover:text-orange-400 duration-700 delay-300"
                }
                to="/dashboard/table-cars"
              >
                My Cars
              </NavLink>{" "}
              ({cars.length})
            </span>
          </>
        ) : (
          <>
            <span>
              <NavLink
                className={({ isActive }) => {
                  isActive
                    ? "text-orange-400 duration-700 delay-300 underline underline-offset-8"
                    : "hover:underline hover:underline-offset-8 hover:text-orange-400 duration-700 delay-300";
                }}
                to="/dashboard/userHome"
              >
                UserHome
              </NavLink>
            </span>
            <span>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-400 duration-700 delay-300 underline underline-offset-8"
                    : "hover:underline hover:underline-offset-8 hover:text-orange-400 duration-700 delay-300"
                }
                to="/dashboard/users"
              >
                All Users
              </NavLink>
            </span>
            <span>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-400 duration-700 delay-300 underline underline-offset-8"
                    : "hover:underline hover:underline-offset-8 hover:text-orange-400 duration-700 delay-300"
                }
                to="/dashboard/add-product"
              >
                Add Products
              </NavLink>
            </span>
          </>
        )}
        <div className="my-1 h-px bg-white/15" />
        <span>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-orange-400 duration-700 delay-300 underline underline-offset-8"
                : "hover:underline hover:underline-offset-8 hover:text-orange-400 duration-700 delay-300"
            }
            to="/"
          >
            Home
          </NavLink>
        </span>
        {!user?.email ? (
          <>
            <span>
              <Link to="/login">Login</Link>
            </span>
            <span>
              <Link to="/signup">SignIn</Link>
            </span>
            <Link onClick={signInGoogle}>
              <p>
                <span className="text-[#ff3d00]">G</span>
                <span className="text-[#ffc107]">o</span>
                <span className="text-[#ffc107]">o</span>
                <span className="text-[#4caf50]">g</span>
                <span className="text-[#ff3d00]">l</span>
                <span className="text-[#4caf50]">e</span>
              </p>
            </Link>
          </>
        ) : (
          <>
            <Link
              onClick={signOutUser}
              className="duration-700 delay-300 flex items-center gap-5"
            >
              LogOut
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export const DashboardRightSite = () => {
  const location = useLocation();
  const myCarsLocation = location.pathname.includes("/dashboard/table-cars");
  const allUserLocation = location.pathname.includes("/dashboard/users");
  const productsLocation = location.pathname.includes("/dashboard/add-product");
  const [cars] = useMyCars();
  const [users] = useUsers();
  const [products] = useProduct();
  const producttotalPrice = products.reduce(
    (sum, total) => sum + total.price,
    0
  );
  const totalPrice = cars.reduce((sum, total) => sum + total.price, 0);
  return (
    <div
      className={`w-56 ${
        cars.length ? "bg-white" : ""
      } border-l hidden lg:block p-4`}
    >
      {!myCarsLocation || (
        <aside className="text-black">
          <h3
            className={`${
              cars.length ? "" : "text-white"
            } text-lg font-semibold mb-4`}
          >
            Payment Collections
          </h3>
          <div className="space-y-3">
            <h2 className="bg-gray-100  p-2 rounded">
              Saved Cars: {cars.length}
            </h2>
            <h2 className="bg-gray-100 p-2 rounded">
              Saved Price: ${totalPrice.toFixed(2)}
            </h2>
            <Link
              to="/dashboard/payment"
              disabled={!cars.length}
              className="btn btn-sm w-full"
            >
              Pay
            </Link>
          </div>
        </aside>
      )}
      {!productsLocation || (
        <aside>
          <h3 className="text-lg font-semibold mb-4 text-black">
            Products Collections
          </h3>
          <div className="space-y-3 text-black">
            <h2 className="bg-gray-100 p-2 rounded">
              Saved Products: {products.length}
            </h2>
            <h2 className="bg-gray-100 p-2 rounded">
              Saved Price: ${producttotalPrice.toFixed(2)}
            </h2>
          </div>
        </aside>
      )}
      {!allUserLocation || (
        <aside>
          <h3 className="text-lg font-semibold mb-4 text-black">
            Users Collections
          </h3>
          <div className="space-y-3">
            <h2 className="bg-gray-100 text-black p-2 rounded">
              Saved Users: {users.length}
            </h2>
          </div>
        </aside>
      )}
    </div>
  );
};
