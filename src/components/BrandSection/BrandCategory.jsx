import { useTestimonial } from "../../hooks/useCollection";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import LoadingSpinner from "../LoadingSpinner";
import BrandTabs from "./BrandTabs";
const BrandCategory = () => {
  const [testimonials, isLoading, isError] = useTestimonial()
  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorPage />
  return (
    <div>
      {/* Brand Tabs */}
      <BrandTabs testimonials={testimonials} />
    </div>
  );
};

export default BrandCategory;
