import SectionTitle from "../../shard/SectionTitle";
import OurCart from "./OurCart";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useOurMember } from "../../hooks/useCollection";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorPage from "../ErrorPage/ErrorPage";
const OurMembers = () => {
  const [members, isError, isLoading] = useOurMember();
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;
  return (
    <div>
      <SectionTitle subTitle={"experts"} headTitle={"Our Members"} />
      <Swiper
        modules={[Autoplay]} // ✅ Enable Autoplay module
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
      >
        {members.map((member) => (
          <SwiperSlide key={member._id}>
            <OurCart member={member} />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Custom Buttons */}
    </div>
  );
};

export default OurMembers;
