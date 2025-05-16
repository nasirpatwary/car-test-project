import { useState } from "react";
import OpenMadal from "./OpenMadal";
const MyModal = ({ item, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  function open() {
    setIsOpen(true);
  }
  function close() {
    setIsOpen(false);
  }
  return (
    <div>
      <OpenMadal isOpen={isOpen} open={open} item={item} close={close} refetch={refetch} />
    </div>
  )
};

export default MyModal;
