import Banner from "../../components/Banner";
import Partner from "../../components/Partner/Partner";
import Testimonial from "../../components/Testimonial/Testimonial";
import BrandCategory from "../../components/BrandSection/BrandCategory";
import Allproducts from "../../components/AllProducts/Allproducts";
import OurMembers from "../OurMembers/OurMembers";
const Home = () => {
  return (
    <div>
      <Banner />
      <Allproducts />
      <BrandCategory />
      <Testimonial />
      <Partner />
      <OurMembers />
    </div>
  );
};

export default Home