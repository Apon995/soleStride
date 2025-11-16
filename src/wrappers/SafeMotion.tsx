"use client";

import React, { useEffect, useState } from "react";
import { motion, MotionProps } from "framer-motion";

interface SafeMotionProps extends MotionProps {
  children?: React.ReactNode;
  className?: string;
}

export default function SafeMotion({ children, className, ...props }: SafeMotionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={className}>{children}</div>;
  }


  return (
    <motion.div className={className} {...props}>
      {children}
    </motion.div>
  );
}
