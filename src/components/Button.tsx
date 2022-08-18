import React from "react";

export interface ButtonProps {
  label: string;
  disabled: boolean;
  background?: string;
}

const Button = ({ label, background }: ButtonProps): JSX.Element => {
  return <div style={{ background }}>{label}</div>;
};

export default Button;
