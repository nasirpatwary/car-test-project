import { Typewriter } from "react-simple-typewriter";
const ErrorPage = () => {
    return (
        <section className="flex items-center h-full p-16">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-9xl bg-gradient-to-r from-sky-900 via-blue-500 bg-300% to-green-400 text-transparent bg-clip-text animate-gradient dark:text-gray-400">
                        <span className="sr-only">Error</span><span className="animate-animated animate-bounce">404</span>
                    </h2>
                    <h2 className="text-2xl font-semibold md:text-3xl bg-gradient-to-r from-sky-900 via-blue-500 bg-300% to-green-400 text-transparent bg-clip-text animate-gradient">
                    Sorry, we couldn't find this page.
                    </h2>
                    <p className="font-serif text-base mt-4 mb-8 dark:text-gray-600">
                        <span className="text-green-500">
                            <Typewriter
                                words={["But dont worry, you can find plenty of other things on our Home page."]}
                                loop={0}
                                cursor
                                cursorStyle='|'
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1000}
                            />
                        </span>
                    </p>
                    <a href="/" className="relative inline-block px-4 py-2 font-medium group">
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                        <span className="relative text-black group-hover:text-white">Back to Home</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;