import concel from "../../../assets/delete.json";
import Lottie from "lottie-react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import MyModal from "../../Modal/MyModal";
import { format } from "date-fns";
import { toast } from "react-toastify";
const TableCart = ({ item, refetch }) => {
  const axiosPublic = useAxiosPublic();
  const handleConcel = async (id) => {
    const { data } = await axiosPublic.delete(`/delete-car/${id}`);
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
                        className='border cursor-pointer py-.5 px-2 rounded bg-green-500 text-white'
                        onClick={() => {
                            toast.dismiss(t.id)
                            handleConcel(id)
                        }}>Yes</button>
                    <button className='border cursor-pointer py-.5 px-2 rounded bg-red-500 text-white' onClick={() => toast.dismiss(t.id)}>Cancel</button>
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
          src={item.image}
          alt={item.name}
          className="md:w-24 object-cover object-center"
        />
      </td>
      <td className="whitespace-nowrap">{item.name}</td>
      <td className="whitespace-nowrap">{item.email}</td>
      <td>${item.price}</td>
      <td>{format(new Date(item.date), 'M/d/yyyy')}</td>
      <td>
        <MyModal item={item} refetch={refetch} />
      </td>
      <td onClick={() => deleteToastify(item._id)}>
        <Lottie className="w-12 cursor-pointer" animationData={concel}></Lottie>
      </td>
    </tr>
  );
};

export default TableCart;
