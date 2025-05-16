import { useProduct } from "../../hooks/useCollection";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import SectionTitle from "../../shard/SectionTitle";
import LoadingSpinner from "../LoadingSpinner";
import AllCart from "../AllCart";
const Allproducts = () => {
  const [products, isLoading, isError, refetch] = useProduct();
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;
  return (
    <>
      <SectionTitle subTitle={"experts"} headTitle={"All brand collections"} />
      <div className="my-8">
        <AllCart products={products} refetch={refetch} />
      </div>
    </>
  );
};

export default Allproducts;
