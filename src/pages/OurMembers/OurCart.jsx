import { Rating } from "@smastrom/react-rating";
import SocialIcon from "../../components/SocialIcon";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
const OurCart = ({ member }) => {
  return (
    <div className="card shadow-lg cursor-pointer mb-8">
      <div className="relative overflow-hidden rounded-t-2xl group">
        <img src={member.image} alt={member.name} />
        <div className="absolute top-2/8 -translate-y-1/2 right-[-60px] flex flex-col gap-2 group-hover:right-4 transition-all duration-500">
          <SocialIcon icon={<FaFacebookF />} />
          <SocialIcon icon={<FaTwitter />} />
          <SocialIcon icon={<FaLinkedinIn />} />
          <SocialIcon icon={<FaInstagram />} />
        </div>
        <div className="px-4 py-2 space-y-1">
          <h2 className="card-title">{member.name}</h2>
          <p className="text-gray-500 font-medium">
            Education:{" "}
            <span className="text-black font-normal">{member.education}</span>
          </p>
          <p className="text-gray-500 font-medium">
            Experience:{" "}
            <span className="text-black font-normal">{member.experience}</span>
          </p>
          <span className="flex items-center justify-between text-gray-500 font-medium">Rating: <Rating style={{ maxWidth: 90 }} value={member.rating} readOnly /></span>
        </div>
      </div>
    </div>
  );
};

export default OurCart;
