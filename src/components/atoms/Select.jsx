import React from "react";
import { cn } from "@/utils/cn";

const Select = React.forwardRef(({ 
  children, 
  className,
  error,
  ...props 
}, ref) => {
  return (
    <select
      ref={ref}
      className={cn(
        "w-full px-3 py-2 border rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 appearance-none bg-no-repeat bg-right bg-[length:16px_16px] pr-10",
        error ? "border-red-500 bg-red-50" : "border-gray-300",
        className
      )}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`
      }}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = "Select";
export default Select;