import logo from "../../assets/footer.jpg"
import { ImPhone } from "react-icons/im";
const Partner = () => {
  return (
    <div
      className="hero bg-cover bg-center"
      style={{
        backgroundImage:
          `url(${logo})`,
      }}
    >
      <div className="hero-overlay bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]"></div>
      <div className="py-2 md:py-10 md:px-30 md:space-y-5 space-y-1 text-white text-center">
        <h2 className="md:text-4xl text-xl font-semibold">With Over <span className="text-[#cb4639]">150</span> Partners Locations</h2>
        <p>Labore dolore magna aliqua ipsum veniam quis nostrud exercitation voluptate velit cillum dolore feu fugiat nulla excepteur sint occaecat sed ipsum cupidatat proident culpa exercitation ullamco laboris aliquik.</p>
        <div className="flex justify-center items-center gap-2">
          <ImPhone size={35} />
          <div>
            <p className="text-[#cb4639]">Need Any Help?</p>
            <h3 className="md:text-2xl font-semibold">(431) 529 2093</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partner;
