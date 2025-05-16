import { Link } from "react-router";
import { Typewriter } from "react-simple-typewriter";

const NoData = () => {
  return (
    <div className="text-center text-black">
      <h2 className="text-2xl font-semibold md:text-3xl bg-gradient-to-r from-sky-900 via-blue-500 bg-300% to-green-400 text-transparent bg-clip-text animate-gradient">
      Sorry, we couldn't find these products.
      </h2>
      <p className="font-serif text-base mt-4 mb-8 dark:text-gray-600">
        <span className="text-green-500">
          <Typewriter
            words={["But dont worry, you can add a product. go to home page"]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </span>
      </p>
      <Link
        to="/"
        className="relative inline-block px-4 py-2 font-medium group"
      >
        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
        <span className="relative text-black group-hover:text-white">
          Back to Home
        </span>
      </Link>
    </div>
  );
};

export default NoData;
