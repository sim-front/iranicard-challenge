import React, { ReactNode } from "react";

type Props = {
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: ReactNode;
  style?: React.CSSProperties;
};

const Button = (p: Props) => {
  return (
    <button
      type={p.type}
      className={`min-w-48 h-12 bg-slate-700 my-4 px-8 rounded disabled:bg-gray-500 transition ease duration-300 hover:bg-slate-600 ${p.className}`}
      onClick={p.onClick}
      disabled={p.disabled}
      style={p.style}
    >
      {p.children}
    </button>
  );
};

export default Button;
