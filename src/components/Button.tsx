import React from "react";

export interface ButtonProps {
  label: string;
  disabled: boolean;
  onClick: () => void;
  displayColor?: string;
}

const Button = ({
  label,
  disabled,
  onClick,
  displayColor,
}: ButtonProps): JSX.Element => {
  return (
    <button disabled={disabled} onClick={onClick}>
      <div className="flex-column">
        <div className="flex-row">
          {label}
          {displayColor ? (
            <span
              style={{
                background: displayColor,
                width: "1em",
                height: "1em",
                marginLeft: "0.5em",
              }}
            >
              &nbsp;
            </span>
          ) : null}
        </div>
      </div>
    </button>
  );
};

export default Button;
