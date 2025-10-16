"use client";

import {Link} from "@/i18n/navigation";
import React from "react";
import clsx from "clsx";

const Button = ({
  href,
  children,
  variant = "base",
  download = false,
  ...otherProps
}) => {
  const styles = clsx(
    "px-5 py-2 rounded-xl transition duration-150 text-sm font-medium",
    {
      base: "text-white bg-black hover:bg-gray-800",
      inverted: "text-gray-800 border border-gray-700 hover:bg-gray-100",
      ghost: "text-secondary bg-transparent hover:underline",
    }[variant]
  );

  return (
    <Link href={href} download={download} {...otherProps} className={styles}>
      {children}
    </Link>
  );
};

export default Button;
