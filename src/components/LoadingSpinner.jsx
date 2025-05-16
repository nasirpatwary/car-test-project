import { RotatingLines } from "react-loader-spinner";
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100svh-125px)]">
      <RotatingLines
        visible={true}
        height="70"
        width="70"
        color="grey"
        strokeWidth="5"
        strokeColor="black"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default LoadingSpinner;
