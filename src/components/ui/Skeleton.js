import React from "react";

export default function Skeleton({ className = "", style = {} }) {
  return (
    <div
      className={`animate-pulse bg-zinc-200 dark:bg-zinc-700 rounded ${className}`}
      style={style}
    />
  );
}
