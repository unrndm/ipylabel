import React, { useState, useEffect } from "react";

export interface DropDownProps {
  label?: string;
  options: { text: string; color: string }[];
  disabled: boolean;
  onChange: ({ text, color }: { text: string; color: string }) => void;
}

const DropDown = ({
  label,
  options,
  disabled = false,
  onChange,
}: DropDownProps): JSX.Element => {
  const [selectedText, setSelectedText] = useState(options[0].text);
  const [selectedColor, setSelectedColor] = useState(options[0].color);

  useEffect(
    () => onChange({ text: selectedText, color: selectedColor }),
    [selectedColor, selectedText],
  );

  return (
    <div>
      <label>
        <select
          onChange={(event) => {
            const option = options[parseInt(event.target.value)];
            setSelectedText(option.text);
            setSelectedColor(option.color);
          }}
          disabled={disabled}
        >
          {options.map((option, index) => (
            <option value={index}>{option.text}</option>
          ))}
        </select>
        {label !== null && label}
      </label>
    </div>
  );
};

export default DropDown;
