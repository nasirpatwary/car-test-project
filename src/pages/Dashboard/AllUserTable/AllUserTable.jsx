import Lottie from "lottie-react";
import concel from "../../../assets/delete.json";
import admin from "../../../assets/admin.json";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { succesToast } from "../../../components/CustomNotification";
import { toast } from "react-toastify";
const AllUserTable = ({ item, refetch }) => {
  const axiosPublic = useAxiosPublic()
  const hnadleAdmin = async (id) => {
    const {data} = await axiosPublic.patch(`/update-admin/${id}`)
    if (data.modifiedCount > 0) {
      succesToast(`${item.name} is admin`)
      refetch()
    }
  }
    const handleConcel = async (id) => {
      const { data } = await axiosPublic.delete(`/delete-user/${id}`);
      if (data.deletedCount > 0) {
        refetch()
      }
    };
    const deleteToastify = id => {
      toast.success(
          (t) => (
              <div className='flex items-center gap-3'>
                  <p>
                      Are You Sure
                  </p>
                  <div className='space-x-2'>
                      <button
                          className='border py-.5 px-2 rounded bg-green-500 text-white'
                          onClick={() => {
                              toast.dismiss(t.id)
                              handleConcel(id)
                          }}>Yes</button>
                      <button className='border py-.5 px-2 rounded bg-red-500 text-white' onClick={() => toast.dismiss(t.id)}>Cancel</button>
                  </div>
              </div>
          ),
        {position: "top-center"}
        );
  }
  return (
    <tr className="text-black">
      <td>
        <img
         referrerPolicy="no-referrer"
          src={item.image}
          alt={item.name}
          className="w-8 h-8 rounded-full object-cover object-center"
        />
      </td>
      <td className="whitespace-nowrap">{item.name}</td>
      <td className="whitespace-nowrap">{item.email}</td>
      <td>
       {item.role === "admin" ? 
       "Admin"
       :
       <Lottie onClick={() => hnadleAdmin(item._id)} className="w-12 cursor-pointer" animationData={admin}></Lottie>
       }
      </td>
      <td onClick={() => deleteToastify(item._id)}>
        <Lottie className="w-12 cursor-pointer" animationData={concel}></Lottie>
      </td>
    </tr>
  );
};

export default AllUserTable;
