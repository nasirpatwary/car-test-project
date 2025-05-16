import { useState } from "react";
import CreateResponsive from "../shard/CreateResponsive";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { succesToast } from "./CustomNotification";
import { handleCustomized } from "../api/utils/utils";
import { useMyCars } from "../hooks/useCollection";
const AllCart = ({ products }) => {
  const { user, signInGoogle } = useAuth();
  const [,,,refetch] = useMyCars()
  const axiosPublic = useAxiosPublic();
  const [showAll, setShowAll] = useState(false);
  const visibleBrands = showAll ? products : products.slice(0, 6);
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
    <div>
      <CreateResponsive>
        {visibleBrands.map((brand) => (
          <div key={brand._id} className="card cart-shadow text-black">
            <figure>
              <img
                className="w-42 p-2 lg:w-52 mx-auto"
                src={brand.image}
                alt={brand.name}
              />
            </figure>
            <div className="space-y-2">
              <div className="flex px-4 items-center justify-between">
                <h2 className="text-xl">{brand.name}</h2>
                <p>${brand.price}</p>
              </div>
              <p className="px-4 cursor-pointer" title={brand.service}>
                {brand.service.length > 20
                  ? brand.service.slice(0, 20) + "..."
                  : brand.service}
              </p>
              <div className="group mb-2 flex justify-center font-bold text-sm text-white overflow-hidden">
                {/* RENT CAR */}
                <div className="relative transition-all duration-300">
                  <button
                    onClick={() => handleAddToCar(brand)}
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
                    to={`/details/${brand._id}`}
                    className="relative cursor-pointer rounded-r z-10 px-6 py-2 flex items-center bg-green-600 text-white transition-all duration-300 group-hover:bg-black group-hover:text-white"
                  >
                    DETAILS
                    <div className="absolute top-0 left-[-15px] w-[30px] h-full bg-green-600 transform skew-x-[40deg] transition-all duration-300"></div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CreateResponsive>
      {!showAll && products.length > 6 && (
        <div
          onClick={() => setShowAll(true)}
          className="group mt-8 flex justify-center font-bold text-sm text-white overflow-hidden"
        >
          {/* RENT CAR */}
          <div className="relative transition-all duration-300">
            <button className="relative cursor-pointer rounded-l px-6 py-2 flex items-center bg-black text-white transition-all duration-300 group-hover:bg-green-600 group-hover:text-white">
              Brand
            </button>
            {/* Diagonal Right Edge */}
            <div className="absolute top-0 right-[-15px] w-[30px] h-full bg-black transform skew-x-[40deg] transition-all duration-300 group-hover:bg-green-600"></div>
          </div>

          {/* DETAILS */}
          <div className="relative transition-all duration-300">
            <button className="relative cursor-pointer rounded-r z-10 px-6 py-2 flex items-center bg-green-600 text-white transition-all duration-300 group-hover:bg-black group-hover:text-white">
              More...
              <div className="absolute top-0 left-[-15px] w-[30px] h-full bg-green-600 transform skew-x-[40deg] transition-all duration-300"></div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default AllCart;
