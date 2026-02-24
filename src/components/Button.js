"use client";

import Link from "next/link";
import React from "react";
import clsx from "clsx";

const Button = ({
  href,
  children,
  variant = "base",
  download = false,
  className,
  ...otherProps
}) => {
  const styles = clsx(
    "inline-flex items-center justify-center px-8 py-3.5 rounded-full transition-all duration-300 font-medium text-sm",
    {
      base: "text-white bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5",
      inverted: "text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300",
      ghost: "text-gray-600 bg-transparent hover:text-blue-600 hover:bg-blue-50",
    }[variant],
    className
  );

  return (
    <Link href={href} download={download} {...otherProps} className={styles}>
      {children}
    </Link>
  );
};

export default Button;
