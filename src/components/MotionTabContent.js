"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

const MotionTabContent = forwardRef(function MotionTabContent(props, ref) {
  return <motion.div ref={ref} {...props} />;
});

export default MotionTabContent;
