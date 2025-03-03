import React from "react";

const Button = ({ label, onPress }) => {
  return (
    <button
      onClick={onPress}
      className="bg-black text-white font-bold mt-5 rounded-lg pt-3 pb-3 w-80"
    >
      {label}
    </button>
  );
};

export default Button;
