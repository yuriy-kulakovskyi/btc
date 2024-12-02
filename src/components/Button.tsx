import React from "react";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled, children }) => {
  return (
    <button className="my-0 mx-[10px] py-[10px] px-[20px] text-[16px] cursor-pointer disabled:bg-[#ccc] disabled:cursor-not-allowed" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
