import { Slide, Zoom } from "react-awesome-reveal";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { succesToast } from "../CustomNotification";
import { handleCustomized } from "../../api/utils/utils";
import { useMyCars } from "../../hooks/useCollection";
const BrandCart = ({ item }) => {
  const [,,,refetch] = useMyCars()
  const { user, signInGoogle } = useAuth();
  const axiosPublic = useAxiosPublic();
  const date = new Date().toLocaleDateString();
  const handleAddToCar = async (product) => {
    handleCustomized({
      product,
      refetch,
      user,
      date,
      axiosPublic,
      Swal,
      succesToast,
      signInGoogle,
    });
  };
  return (
    <>
      <div className="card text-black cart-shadow">
        <figure className="p-4">
          <Slide duration="left">
            <Zoom delay={300} duration={1000}>
              <img className="w-52" src={item.image} alt={item.item} />
            </Zoom>
          </Slide>
        </figure>
        <div className="space-y-2 px-4">
          <h2>{item.name}</h2>
          <p className="cursor-pointer" title={item.description}>
            {item.description.length > 28
              ? item.description.slice(0, 28) + "..."
              : item.description}
          </p>
        </div>
        <div className="group my-2 flex justify-center font-bold text-sm text-white overflow-hidden">
          {/* RENT CAR */}
          <div className="relative transition-all duration-300">
            <button
              onClick={() => handleAddToCar(item)}
              className="relative cursor-pointer rounded-l px-6 py-2 flex items-center bg-black text-white transition-all duration-300 group-hover:bg-green-600 group-hover:text-white"
            >
              Add To Car
            </button>
            {/* Diagonal Right Edge */}
            <div className="absolute top-0 right-[-15px] w-[30px] h-full bg-black transform skew-x-[40deg] transition-all duration-300 group-hover:bg-green-600"></div>
          </div>

          {/* DETAILS */}
          <div className="relative transition-all duration-300">
            <Link
              to={`/details/${item._id}`}
              className="relative cursor-pointer rounded-r z-10 px-6 py-2 flex items-center bg-green-600 text-white transition-all duration-300 group-hover:bg-black group-hover:text-white"
            >
              DETAILS
              <div className="absolute top-0 left-[-15px] w-[30px] h-full bg-green-600 transform skew-x-[40deg] transition-all duration-300"></div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandCart;
