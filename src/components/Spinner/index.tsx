import React from "react";

const Spinner = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center z-50">
      <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-50" />
      <div className="relative">
        <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    </div>
  );
};

export default Spinner;
