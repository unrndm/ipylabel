import React from "react";

export interface ButtonProps {
  label: string;
  disabled: boolean;
  onClick: () => void;
  background?: string;
}

const Button = ({ label, disabled, onClick, background }: ButtonProps): JSX.Element => {
  return <button style={{ background }} disabled={disabled} onClick={onClick}>{label}</button>;
};

export default Button;
