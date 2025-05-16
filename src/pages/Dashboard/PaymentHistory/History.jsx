import Lottie from "lottie-react";
import concel from "../../../assets/delete.json"
import { format } from "date-fns";
const History = ({ payment }) => {
  return (
   <tr className="text-black">
        <td>
          <img
            src={payment.image}
            alt={"item.name"}
            className="w-10 rounded-full object-cover object-center"
          />
        </td>
        <td className="whitespace-nowrap">{payment.email}</td>
        <td>${payment.price}</td>
        <td>{format(new Date(payment.date), 'M/d/yyyy')}</td>
        <td ><span className={`${payment.status === "pending"? "bg-green-100 py-0.5 px-2 rounded-full" : ""}`}>{payment.status}</span></td>
        {/* <td>
          <MyModal item={item} refetch={refetch} />
        </td> */}
        <td>
          <Lottie className="w-12 cursor-pointer" animationData={concel}></Lottie>
        </td>
      </tr>
  );
};

export default History;
