import React from "react";

const Balance = ({ label }) => {
  return (
    <div className="flex m-4">
      <div className="font-bold text-lg ">Your balance:</div>
      <div className="font-semibold ml-4 text-lg">Rs {label}</div>
    </div>
  );
};

export default Balance;
