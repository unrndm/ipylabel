import React, { useState, useEffect } from "react";

export interface DropDownProps {
  disabled: boolean;
  options: { text: string; color: string }[];
  onChange: ({ text, color }: { text: string; color: string }) => void;
  label?: string;
}

const DropDown = ({
  disabled = false,
  options,
  onChange,
  label,
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
            <option value={index} key={index}>
              {option.text}
            </option>
          ))}
        </select>
        {label ?? label}
      </label>
    </div>
  );
};

export default DropDown;
