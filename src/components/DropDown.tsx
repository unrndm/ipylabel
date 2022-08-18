import React from "react";

export interface DropDownProps {
  label: string;
}

const DropDown = ({ label }: DropDownProps): JSX.Element => {
  return <div>{label}</div>;
};

export default DropDown;
