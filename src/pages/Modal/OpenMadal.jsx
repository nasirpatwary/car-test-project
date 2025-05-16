import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { BsCalendarDate } from "react-icons/bs";
import Lottie from "lottie-react";
import { useRef, useState } from "react";
import edit from "../../assets/edit.json";
import { useForm } from "react-hook-form";
import { TbFidgetSpinner } from "react-icons/tb";
import DatePicker from "react-datepicker";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { saveImage } from "../../api/utils/utils";
import { globalToast } from "../../components/CustomNotification";
const OpenMadal = ({isOpen, open, item, close, refetch}) => {
  const axiosPublic = useAxiosPublic()
  const datePickerRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(item.date);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    const image = await saveImage(data.image[0])
      try {
        const updateDoc = {
           name: data.name,
           image,
           service: data.service,
           price: parseFloat(data.price),
           date: selectedDate
        }
        console.log(updateDoc);
        const updateData = await axiosPublic.patch(`/update-cars/${item._id}`, updateDoc) 
        reset()
        console.log(updateData.data);
         if (updateData.data.modifiedCount > 0) {
            globalToast("Update Succesfully")
            refetch()
         }
    } catch (error) {
        console.log(error);
    }
  };
  return (
    <>
      <Lottie
        onClick={open}
        className="w-8 cursor-pointer"
        animationData={edit}
      ></Lottie>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex items-center justify-center p-4">
            <DialogPanel
              transition
              className="rounded-xl border border-black p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 text-center font-medium text-black"
              >
                Update successful
              </DialogTitle>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full">
                    <fieldset className="fieldset">
                      <label className="label text-black">Brand Name</label>
                      <input
                        defaultValue={item.name}
                        {...register("name")}
                        type="text"
                        className="input w-full"
                        placeholder="Brand Name"
                      />
                      <label className="label text-black">Service</label>
                      <input
                        defaultValue={item.service}
                        {...register("service")}
                        type="text"
                        className="input w-full"
                        placeholder="Service"
                      />
                    </fieldset>
                  </div>
                  <div className="w-full">
                    <fieldset className="fieldset">
                      <label className="label text-black">Price</label>
                      <input
                        defaultValue={item.price}
                        {...register("price")}
                        type="text"
                        className="input w-full"
                        placeholder="Price"
                      />
                      <label className="label text-black">
                        Generate Image Name
                      </label>
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        {...register("image")}
                        className="file-input w-full bg-lime-500"
                        placeholder="Are you image generating"
                      />
                    </fieldset>
                  </div>
                </div>
                <div className="flex flex-col relative w-full">
                  <label className="text-black mb-1">Select a Date:</label>
                  <DatePicker
                    ref={datePickerRef}
                    className="input w-full"
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Click to select a date"
                  />
                  <BsCalendarDate
                    size={20}
                    className="absolute top-10 right-3 cursor-pointer text-white"
                    onClick={() => datePickerRef.current.setOpen(true)}
                  />
                </div>
                <button onClick={close} className="btn btn-neutral mt-4 w-full">
                  {isSubmitting ? (
                    <span className="flex items-center">
                      Loading..
                      <TbFidgetSpinner
                        size={20}
                        className="animate-spin m-auto"
                      />
                    </span>
                  ) : (
                    "Save & Continue"
                  )}
                </button>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default OpenMadal;
