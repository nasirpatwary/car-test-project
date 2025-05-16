import LoadingSpinner from "../../../components/LoadingSpinner";
import NoData from "../../../components/NoData/NoData";
import { useMyCars } from "../../../hooks/useCollection";
import SectionTitle from "../../../shard/SectionTitle";
import ErrorPage from "../../ErrorPage/ErrorPage";
import TableCart from "../TableCart/TableCart";
const TableCars = () => {
  const [cars, isError, isLoading, refetch] = useMyCars();
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;
  return (
    <div>
      <SectionTitle
        subTitle={"Add All Cars"}
        headTitle={"Did you add these cars"}
      />
      {cars.length === 0 ? (
        <NoData />
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            {/* Table Head */}
            <thead className="text-black">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Price</th>
                <th>Date</th>
                <th>Acction</th>
              </tr>
            </thead>
            <tbody>
              {/* Table Main */}
              {cars.map((item) => (
                <TableCart key={item._id} item={item} refetch={refetch} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TableCars;
