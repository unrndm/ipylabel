import React from "react";

export interface CheckboxProps {
  label?: string;
  value: boolean;
  onChange: any;
  disabled: boolean;
}

const Checkbox = ({
  value,
  label,
  onChange,
}: CheckboxProps): JSX.Element => {
  return (
    <div>
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
        {label !== null && label}
      </label>
    </div>
  );
};

export default Checkbox;
