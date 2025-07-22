import React from "react";
import { cn } from "@/utils/cn";

const Textarea = React.forwardRef(({ 
  className,
  error,
  ...props 
}, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full px-3 py-2 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 resize-none",
        error ? "border-red-500 bg-red-50" : "border-gray-300 bg-white",
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";
export default Textarea;