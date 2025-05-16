import { useNavigate, useParams } from "react-router";
import { useMyCars, useProduct, useTestimonial } from "../../hooks/useCollection";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { succesToast } from "../../components/CustomNotification";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SectionTitle from "../../shard/SectionTitle";
import { handleCustomized } from "../../api/utils/utils";
const CarDetails = () => {
  const axiosPublic = useAxiosPublic();
  const { user, signInGoogle } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate()
  const [testimonials] = useTestimonial();
  const [products] = useProduct();
  const [,,,refetch] = useMyCars()
  const singleTestimonial = testimonials.find(
    (testimonial) => testimonial._id === id
  );
  const testimonial = singleTestimonial || {};
  const singleProduct = products.find((product) => product._id === id);
  const product = singleProduct || {};
  const date = new Date().toLocaleDateString();
  const handleAddToCar = (product) => {
    handleCustomized({
      testimonial,
      product,
      refetch,
      user,
      date,
      axiosPublic,
      Swal,
      succesToast,
      signInGoogle,
    });
    navigate("/dashboard/table-cars");
  };
  return (
    <>
      <SectionTitle
        subTitle={"Add A Car"}
        headTitle={"It is a big opportunity Do you want to add a car"}
      />
      <div className="bg-white shadow rounded p-6 flex flex-col md:flex-row items-center gap-6">
        {/* Left Image */}
        <div>
          <img
            src={product.image || testimonial.image}
            alt={product.name || testimonial.name}
            className="rounded-xl object-cover"
          />
        </div>

        {/* Center Content */}
        <div className="space-y-2 text-left">
          <h2 className="text-2xl font-semibold text-black">
            {product.name || testimonial.name}
          </h2>
          <p className="text-gray-600 font-medium">
            Service:{" "}
            <span className="font-normal">
              {product.service || testimonial.description}
            </span>
          </p>
          <p className="text-gray-600 font-medium">
            Description:{" "}
            <span className="font-normal">
              {product.description || testimonial.price}
            </span>
          </p>
        </div>

        {/* Right Button  */}
        <div>
            <button
              onClick={() => handleAddToCar(product)}
              className="box-border relative z-30 inline-flex items-center justify-center w-auto px-4 py-2 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none"
            >
              <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span className="relative z-20 flex items-center text-sm">
                AddToCar
              </span>
            </button>
        </div>
      </div>
    </>
  );
};

export default CarDetails;
