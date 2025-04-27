import { useState } from "react";
import CreateResponsive from "../../shard/CreateResponsive";
import SectionTitle from "../../shard/SectionTitle";
import BrandCart from "./BrandCart";
const BrandTabs = ({ testimonials }) => {
  const [activeTab, setActiveTab] = useState("toyota");
  // Unique category list (optional — dynamic tabs)
  const brands = ["toyota", "nissan", "audi", "mercedes"];
  const testimonialCategories = testimonials.filter(
    (item) => item.category === activeTab
  );
  return (
    <>
      <SectionTitle
        subTitle={"Come With"}
        headTitle={"Hot Offers"}
      ></SectionTitle>
      {/* Tabs */}
      <div className="my-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {brands.map((brand, index) => {
            const isActive = activeTab === brand;
            return (
              <div
                key={index}
                onClick={() => setActiveTab(brand)}
                className={`relative overflow-hidden group px-4 py-2 sm:px-6 cursor-pointer font-bold text-white uppercase text-sm transition-all duration-300 transform ${
                  isActive ? "bg-green-600" : "bg-black"
                }`}
                style={{
                  clipPath:
                    "polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%, 10% 50%)",
                  marginLeft: index === 0 ? "0" : "-20px",
                  zIndex: brands.length - index,
                  minWidth: "120px",
                }}
              >
                <span className="relative z-10">{brand}</span>
                <span className="absolute inset-0 bg-white opacity-10 rounded-full scale-150 group-hover:rotate-180 transition-transform duration-500 ease-in-out z-0"></span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Cart content */}
      <CreateResponsive>
        {testimonialCategories.map((item) => (
          <BrandCart key={item._id} item={item} />
        ))}
      </CreateResponsive>
    </>
  );
};

export default BrandTabs;
