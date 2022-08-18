import React from "react";

export interface ButtonProps {
  label: string;
  disabled: boolean;
}

const Button = ({ label }: ButtonProps): JSX.Element => {
  return <div>{label}</div>;
};

export default Button;
