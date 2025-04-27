import { motion } from "framer-motion";
const SocialIcon = ({ icon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="w-8 h-8 bg-green-400 hover:bg-sky-400 rounded-full flex items-center justify-center text-white text-xl cursor-pointer shadow-md"
    >
      {icon}
    </motion.div>
  );
};

export default SocialIcon;
