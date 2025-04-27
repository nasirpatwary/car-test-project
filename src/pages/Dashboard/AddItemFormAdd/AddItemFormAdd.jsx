import { useForm } from "react-hook-form";
import { TbFidgetSpinner } from "react-icons/tb";
import SectionTitle from "../../../shard/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { saveImage } from "../../../api/utils/utils";
import { globalToast } from "../../../components/CustomNotification";
const AddItemForm = () => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
     try {
      const generate = await saveImage(data.image[0])
      const products = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        image: generate,
        description: data.description,
      };
      const savedData = await axiosSecure.post("/products", products);
      if (savedData.data.insertedId) {
        globalToast(`${data.name} Saved Data Successfully ✅`)
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
      <div className="">
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
                <label className="label text-black">Category</label>
                <input
                  {...register("category")}
                  type="text"
                  className="input w-full"
                  placeholder="Category"
                />
              </fieldset>
            </div>
            <div className="w-full">
              <fieldset className="fieldset">
                <label className="label text-black">Price</label>
                <input
                  {...register("price")}
                  type="text"
                  className="input w-full"
                  placeholder="Price"
                />
                <label className="label text-black">Generate Image Name</label>
                <input
                 type='file'
                 id='image'
                 accept='image/*'
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
            placeholder="Feed Back"
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
