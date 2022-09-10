import React from "react";

export interface SelectableProps {
  text: string;
  disabled: boolean;
  selected: { start: number; end: number; label: string }[];
  label2color: { [key: string]: string };
  onSelectionChange: ({ start, end }: { start: number; end: number }) => void;
}

const Selectable = ({
  text,
  disabled,
  selected,
  label2color,
  onSelectionChange,
}: SelectableProps): JSX.Element => {
  const handleSelection = (event: any) => {
    const selection = window.getSelection()!;

    const first_end = parseInt(
      (selection.getRangeAt(0).startContainer.parentNode! as HTMLElement)
        .dataset.position!,
    );
    const second_end = parseInt(
      (selection.getRangeAt(0).endContainer.parentNode! as HTMLElement).dataset
        .position!,
    );

    let selectionStart, selectionEnd;
    if (first_end < second_end) {
      [selectionStart, selectionEnd] = [first_end, second_end];
    } else {
      [selectionStart, selectionEnd] = [second_end, first_end];
    }

    onSelectionChange({ start: selectionStart, end: selectionEnd });
  };

  return (
    <div onMouseUp={handleSelection} onDoubleClick={handleSelection}>
      {text.split("").map((letter, idx) => {
        let label_as: string | null = null;
        selected.forEach((element) => {
          if (idx >= element["start"] && idx <= element["end"]) {
            label_as = element["label"];
          }
        });
        if (typeof label_as === "string") {
          return (
            <span
              data-position={idx}
              style={{ background: disabled ? "none" : label2color[label_as] }}
              key={idx}
            >
              {letter}
            </span>
          );
        } else {
          return (
            <span data-position={idx} key={idx}>
              {letter}
            </span>
          );
        }
      })}
    </div>
  );
};

export default Selectable;
