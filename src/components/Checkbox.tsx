import React from "react";

export interface CheckboxProps {
  value: boolean;
  onChange: any;
  label?: string;
}

const Checkbox = ({ value, label, onChange }: CheckboxProps): JSX.Element => {
  return (
    <div>
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
        {label ?? label}
      </label>
    </div>
  );
};

export default Checkbox;
