import { useForm } from "react-hook-form";
import { TbFidgetSpinner } from "react-icons/tb";
import SectionTitle from "../../../shard/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { saveImage } from "../../../api/utils/utils";
import { globalToast } from "../../../components/CustomNotification";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import { useRef, useState } from "react";
import { BsCalendarDate } from "react-icons/bs";
const AddItemForm = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
    const datePickerRef = useRef(null);
  const [startDate, setStartDate] = useState(new Date());
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const generate = await saveImage(data.image[0]);
      const products = {
        name: data.name,
        category: data.category,
        service: data.service,
        price: parseFloat(data.price),
        data: startDate,
        image: generate,
        description: data.description,
      };
      const savedData = await axiosSecure.post("/products", products);
      if (savedData.data.insertedId) {
        reset();
        globalToast(`${data.name} Saved Data Successfully ✅`);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <SectionTitle
        subTitle={"Add To Product"}
        headTitle={"Are you sure you want to produce"}
      />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <fieldset className="fieldset">
                <label className="label text-black">Brand Name</label>
                <input
                  {...register("name")}
                  type="text"
                  className="input w-full"
                  placeholder="Brand Name"
                />
                <label className="label text-black">Select Category</label>
                <select
                  defaultValue="default"
                  {...register("category")}
                  className="select w-full"
                >
                  <option value="default" disabled>
                    Select a category
                  </option>
                  <option value="toyota">Toyota</option>
                  <option value="nissan">Nissan</option>
                  <option value="audi">Audi</option>
                  <option value="mercedes">Mercedes</option>
                </select>
                <div className="flex flex-col relative w-full">
                  <label className="text-black mb-1">Select a Date:</label>
                  <DatePicker selected={startDate} 
                  ref={datePickerRef}
                  className="input w-full"
                  placeholderText="Click to select a date"
                  onChange={(date) => setStartDate(date)}
                   />
                  <BsCalendarDate
                    size={20}
                    className="absolute top-8 right-3 cursor-pointer text-white"
                    onClick={() => datePickerRef.current.setOpen(true)}
                  />
                </div>
              </fieldset>
            </div>
            <div className="w-full">
              <fieldset className="fieldset">
                <label className="label text-black">Service</label>
                <input
                  {...register("service")}
                  type="text"
                  className="input w-full"
                  placeholder="Service"
                />
                <label className="label text-black">Price</label>
                <input
                  {...register("price")}
                  type="text"
                  className="input w-full"
                  placeholder="Price"
                />
                <label className="label text-black">Generate Image Name</label>
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
          <label className="label text-black">Description</label>
          <textarea
            className="textarea w-full"
            {...register("description")}
            placeholder="Description..."
          ></textarea>
          <button className="btn btn-neutral mt-4 w-full">
            {isSubmitting ? (
              <span className="flex items-center">
                Loading..
                <TbFidgetSpinner size={20} className="animate-spin m-auto" />
              </span>
            ) : (
              "Save & Continue"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddItemForm;
