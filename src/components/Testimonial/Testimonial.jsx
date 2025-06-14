import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import SectionTitle from "../../shard/SectionTitle";
import LoadingSpinner from "../LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import { useTestimonial } from "../../hooks/useCollection";
import { useRef } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
const Testimonial = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [testimonials, isLoading, isError] = useTestimonial()
  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorPage />
  return (
    <div className="my-8 relative">
      <SectionTitle
        subTitle={"Some Words"}
        headTitle={"testimonial"}
      ></SectionTitle>
       {/* Custom Previous Button with Icon */}
        <button
          ref={prevRef}
          className={`bg-black text-white transition-all duration-300 animate-pulse p-2 cursor-pointer absolute left-0 top-2/3 transform -translate-y-1/2 z-10 rounded-full`}
        >
          <FaArrowAltCircleRight />
        </button>

        {/* Custom Next Button with Icon */}
        <button
          ref={nextRef}
          className="bg-green-600 transition-all duration-300 animate-pulse p-2 cursor-pointer absolute right-0 top-2/3 transform -translate-y-1/2 z-10 rounded-full"
        >
          <FaArrowAltCircleLeft />
        </button>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]} // ✅ Enable Autoplay module
        spaceBetween={20}
        autoplay={{
          delay: 3000, // ✅ Slide every 3 seconds
          disableOnInteraction: false, // Keeps autoplay even after user swipes
        }}
         navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        loop // ✅ Loop back to the start
        pagination={{
          el: ".custom-pagination",
          clickable: true,
          bulletClass: "swiper-pagination-bullet custom-dot",
          bulletActiveClass:
            "swiper-pagination-bullet-active custom-dot-active",
        }}

      >
        {testimonials.map((product, i) => (
          <SwiperSlide key={i}>
            <div className="cursor-pointer mt-4">
              <figure className="p-4">
                <img
                  src={product.image}
                  alt={`Slide ${i + 1}`}
                  className="lg:w-52 w-42 mx-auto"
                />
              </figure>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination flex justify-center transition-all duration-700 delay-300 gap-2 px-4 mt-3" />
    </div>
  );
};

export default Testimonial;
