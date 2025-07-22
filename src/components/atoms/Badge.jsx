import React from "react";
import { cn } from "@/utils/cn";

const Badge = React.forwardRef(({ 
  children, 
  variant = "default", 
  className,
  ...props 
}, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    active: "bg-green-100 text-green-800",
    "on-hold": "bg-yellow-100 text-yellow-800",
    completed: "bg-blue-100 text-blue-800",
    "to-do": "bg-gray-100 text-gray-800",
    "in-progress": "bg-purple-100 text-purple-800",
    done: "bg-green-100 text-green-800"
  };

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
        variants[variant] || variants.default,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";
export default Badge;