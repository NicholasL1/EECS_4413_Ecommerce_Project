"use client";

import { motion } from "framer-motion";
import shoe from "@/public/shoe-animation.json";
import Lottie from "lottie-react";

const variants = {
  initial: {
    opacity: 0,
    scale: 0.1,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      delay: 0,
      duration: 1.75,
      ease: "easeInOut",
    },
  },
};

const ShoeAnimation = () => {
  return (
    <div className="w-full h-full relative">
      <motion.div
        variants={variants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <Lottie animationData={shoe} loop={true} className="object-contain" />
      </motion.div>
    </div>
  );
};

export default ShoeAnimation;
