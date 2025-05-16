import LoadingSpinner from "../../../components/LoadingSpinner";
import NoData from "../../../components/NoData/NoData";
import { usePayHistory } from "../../../hooks/useCollection";
import ErrorPage from "../../ErrorPage/ErrorPage";
import History from "./History";

const PaymentHistory = () => {
  const [payments, isLoading, isError, refetch] = usePayHistory();
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;
  return (
    <div>
      {payments.length < 0 ? (
        <NoData />
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="text-black">
              <tr>
                <th>Image</th>
                <th>Email</th>
                <th>Price</th>
                <th>Date</th>
                <th>Status</th>
                <th>Acction</th>
              </tr>
            </thead>
            <tbody>
                {payments.map((payment) => (
                  <History key={payment._id} payment={payment} />
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
