import toyota from "../assets/toyota.png";
import { Typewriter } from "react-simple-typewriter";
const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row mt-10">
      <div className="md:w-1/2 flex items-center justify-center">
        <img
          src={toyota}
          alt="Car"
          className="w-4/5 animate__animated animate__fadeInTopLeft animate__delay-1s max-w-md"
        />
      </div>
      <div className="md:w-1/2 flex flex-col justify-center items-start">
        <h2 className="md:text-2xl lg:w-7/11 sm-xl text-shadow font-bold text-white/75">
          Big opportunities
          <Typewriter
            words={[" Do you want to earn with us? So don't be late."]}
            loop
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={70}
            delaySpeed={2000}
          />
        </h2>
        <p className="mt-2 bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text bg-300% animate-gradient">
          Delivering reliable rides for your daily journeys.
        </p>
        <div className="group my-4 flex font-bold text-sm text-white overflow-hidden">
          {/* RENT CAR */}
          <div className="relative transition-all duration-300">
            <button className="relative cursor-pointer rounded-l px-6 py-2 flex items-center bg-black text-white transition-all duration-300 group-hover:bg-green-600 group-hover:text-white">
            BECOME A
            </button>
            {/* Diagonal Right Edge */}
            <div className="absolute top-0 right-[-15px] w-[30px] h-full bg-black transform skew-x-[40deg] transition-all duration-300 group-hover:bg-green-600"></div>
          </div>
          {/* DETAILS */}
          <div className="relative transition-all duration-300">
            <button className="relative cursor-pointer rounded-r z-10 px-6 py-2 flex items-center bg-green-600 text-white transition-all duration-300 group-hover:bg-black group-hover:text-white">
            DRIVER
              <div className="absolute top-0 left-[-15px] w-[30px] h-full bg-green-600 transform skew-x-[40deg] transition-all duration-300"></div>
            </button>
          </div>
        </div>
        {/* <button className="mt-4 hover:text-white animate__animated animate__fadeInUp cursor-pointer border-b px-6 py-2 relative overflow-hidden group">
          <span className="relative z-10"> DRIVER</span> */}
        {/* Sliding Effect from Left to Right */}
        {/* <span className="absolute left-0 top-0 w-full h-full border transform -translate-x-full bg-green-500 border-white/30 group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 pointer-events-none"></span>
        </button> */}
      </div>
    </div>
  );
};

export default Banner;
