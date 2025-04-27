import { useState } from "react";
import CreateResponsive from "../shard/CreateResponsive";
import clsx from "clsx";
const OurCart = ({ products }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleBrands = showAll ? products : products.slice(0, 6);
  return (
    <div>
      <CreateResponsive>
        {visibleBrands.map((brand) => (
          <div
            key={brand._id}
            className={clsx(
              "card cart-shadow text-black",
              brand.category === "toyota" && "bg-blue-100 border-blue-400",
              brand.category === "nissan" && "bg-green-100 border-green-400",
              brand.category === "audi" && "bg-pink-100 border-pink-400",
              brand.category === "mercedes" && "bg-yellow-100 border-yellow-400"
            )}
          >
            <figure>
              <img
                className="w-42 p-2 lg:w-52 mx-auto"
                src={brand.image}
                alt={brand.name}
              />
            </figure>
            <div className="px-4 space-y-2">
              <div className="flex items-center justify-between">
              <h2 className="text-xl">{brand.name}</h2>
              <p>${brand.price}</p>
              </div>
              <p>{brand.service}</p>
              <div className="group mb-2 flex justify-center font-bold text-sm text-white overflow-hidden">
                {/* RENT CAR */}
                <div className="relative transition-all duration-300">
                  <button className="relative cursor-pointer rounded-l px-6 py-2 flex items-center bg-black text-white transition-all duration-300 group-hover:bg-green-600 group-hover:text-white">
                    RENT CAR
                  </button>
                  {/* Diagonal Right Edge */}
                  <div className="absolute top-0 right-[-15px] w-[30px] h-full bg-black transform skew-x-[40deg] transition-all duration-300 group-hover:bg-green-600"></div>
                </div>

                {/* DETAILS */}
                <div className="relative transition-all duration-300">
                  <button className="relative cursor-pointer rounded-r z-10 px-6 py-2 flex items-center bg-green-600 text-white transition-all duration-300 group-hover:bg-black group-hover:text-white">
                    DETAILS
                    <div className="absolute top-0 left-[-15px] w-[30px] h-full bg-green-600 transform skew-x-[40deg] transition-all duration-300"></div>
                  </button>
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
export default OurCart;

