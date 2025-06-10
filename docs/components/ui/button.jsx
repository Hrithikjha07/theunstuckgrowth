import React from "react";

export function Button({ 
  children, 
  className = "", 
  variant = "default", 
  ...props 
}) {
  const getVariantClasses = () => {
    switch (variant) {
      case "ghost":
        return "bg-transparent hover:bg-gray-100";
      case "outline":
        return "bg-white border border-gray-300 hover:bg-gray-50";
      case "default":
      default:
        return "bg-black text-white hover:bg-gray-800";
    }
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 ${getVariantClasses()} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
