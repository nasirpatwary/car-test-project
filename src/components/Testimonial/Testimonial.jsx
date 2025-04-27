import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import SectionTitle from "../../shard/SectionTitle";
import LoadingSpinner from "../LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import { useTestimonial } from "../../hooks/useCollection";
const Testimonial = () => {
  const [testimonials, isLoading, isError] = useTestimonial()
  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorPage />
  return (
    <div className="my-8 relative">
      <SectionTitle
        subTitle={"Some Words"}
        headTitle={"testimonial"}
      ></SectionTitle>
      <Swiper
        modules={[Autoplay, Pagination]} // ✅ Enable Autoplay module
        spaceBetween={20}
        autoplay={{
          delay: 3000, // ✅ Slide every 3 seconds
          disableOnInteraction: false, // Keeps autoplay even after user swipes
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
            <div className="border border-[#3d4a51] cursor-pointer mt-4">
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
