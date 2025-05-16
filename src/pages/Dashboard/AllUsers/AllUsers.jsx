import LoadingSpinner from "../../../components/LoadingSpinner";
import NoData from "../../../components/NoData/NoData";
import { useUsers } from "../../../hooks/useCollection";
import SectionTitle from "../../../shard/SectionTitle";
import ErrorPage from "../../ErrorPage/ErrorPage";
import AllUserTable from "../AllUserTable/AllUserTable";

const AllUsers = () => {
    const [users, isError, isLoading, refetch] = useUsers()
    if(isLoading) return <LoadingSpinner />
    if(isError) return <ErrorPage />
    return (
        <div>
      <SectionTitle
        subTitle={" How many?"}
        headTitle={"MANAGE ALL USERS"}
      />
      {users.length === 0 ? (
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
                <th>Admin</th>
                <th>Acction</th>
              </tr>
            </thead>
            <tbody>
              {/* Table users Main  */}
              {users.map((item) => (
                <AllUserTable key={item._id} item={item} refetch={refetch} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    );
};

export default AllUsers;