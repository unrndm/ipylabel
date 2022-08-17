import React from "react";

export interface CheckboxProps {
  value: boolean
  label: string
  onChange: any
}

const Checkbox = ({value, label="", onChange}: CheckboxProps): JSX.Element => {
  return <div>
    <label>
      <input
        type="checkbox"
        checked={value}
        onChange={onChange}
      />
      {label}
    </label>
  </div>
}

export default Checkbox
