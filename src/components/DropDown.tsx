import React from "react";

export interface DropDownProps {
  label: string;
  disabled: boolean;
}

const DropDown = ({ label }: DropDownProps): JSX.Element => {
  return <div>{label}</div>;
};

export default DropDown;
