import logo from "../assets/logo2.png";
import footer from "../assets/footer.jpg";
import useAuth from "../hooks/useAuth";
import { useOurMember } from "../hooks/useCollection";
const Footer = () => {
  const { user } = useAuth();
  const [members] = useOurMember();
  return (
    <div
      className="hero bg-cover bg-center"
      style={{
        backgroundImage: `url(${footer})`,
      }}
    >
      <div className="hero-overlay bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]"></div>
      <footer className="flex flex-col lg:flex-row justify-between text-gray-300 w-11/12 lg:w-10/12 mx-auto sm:footer-horizontal space-y-4 py-10">
        <aside className="lg:w-96 space-y-2">
          <img
            className="w-32 animate__fadeInUp animate__animated"
            src={logo}
            alt=""
          />
          <p className="text-base">
            sed do eiusmod tempor incididunt ut labore et dolore magna as
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
          </p>
          <h6 className="border-b mt-2 w-28 border-orange-500 text-xl text-white">
            Head office
          </h6>
          <div className="space-y-1 mt-4">
            <p>125 Big fella St. Road, New York, Hi 5654775</p>
            <p>Phone : 326487652</p>
            <p>Email : {user?.email || "example@gmail.com"}</p>
            <p>Office Time : 9AM- 4PM</p>
          </div>
        </aside>
        <div>
          <div className="flex lg:gap-8 gap-20">
            <nav className="flex flex-col space-y-2">
              <h6 className="border-b border-orange-500 text-xl text-white">
                Quick Links
              </h6>
              <a className="link link-hover">Branding</a>
              <a className="link link-hover">Design</a>
              <a className="link link-hover">Marketing</a>
              <a className="link link-hover">Advertisement</a>
            </nav>
            <nav className="md:mt-10 flex-col flex">
              <a className="link link-hover">Testimonials</a>
              <a className="link link-hover">Privacy Policy</a>
              <a className="link link-hover">latest News</a>
            </nav>
          </div>
          <h6 className="border-b w-24 border-orange-500 text-xl text-white">
            Newsletter
          </h6>
          <input
            className="bg-gray-500 mt-2 w-full outline-0 rounded py-1 px-3"
            type="email"
            name=""
            id=""
            placeholder="Email Address"
          />
        </div>
        <nav className="space-y-2">
          <h6 className="border-b w-28 border-orange-500 text-xl text-white">
            Recent Post
          </h6>
          <div className="lg:w-80 md:space-y-3">
            <div className="flex flex-col gap-2">
              {members.slice(0, 3).map((item) => (
                <div key={item._id} className="flex gap-2">
                  <img
                    className="w-12 rounded-full h-12 object-center object-cover animate__fadeInUp animate__animated"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="text-sm">
                    <p>{item.education}</p>
                    <p>{item.experience}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
