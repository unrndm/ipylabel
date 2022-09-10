import React, { useState } from "react";
import { useModelState, WidgetModelContext } from "./hooks/widget-model";
import { WidgetProps } from "./types";
import { Button, Checkbox, DropDown, Selectable } from "./components";

// widget state, don't forget to update `ipylabel/text.py`
export const defaultModelProperties: {
  text: string;
  labels: string[];
  colors: string[]; // should be color
  result: { start: number; end: number; label: string }[];
  finished: boolean;
} = {
  // use as inputs
  text: "",
  labels: [],
  colors: [],
  // set as outputs
  result: [],
  finished: false,
};

const TextWidget = (props: WidgetProps) => {
  // use as input
  const [text] = useModelState("text");
  const [labels] = useModelState("labels");
  const [colors] = useModelState("colors");

  // set as output
  const [result, setResult] = useModelState("result");
  const [finished, setFinished] = useModelState("finished");

  // values for inner use
  const [selectedLabel, setSelectedLabel] = useState(labels[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selection, setSelection] = useState<{start: number, end: number} | null>(null);

  let label2color: { [key: string]: string } = Object.fromEntries(
    labels.map((label, idx) => [label, colors[idx]]),
  );

  function selections_overlap(
    first: {
      start: number, end: number
    },
    second: {
      start: number, end: number
    }
  ): boolean {
    return (
      ((first.start <= second.start) && (first.end >= second.start))
      || ((first.start >= second.start) && (first.end <= second.end))
      || ((first.start <= second.end) && (first.end >= second.end))
    )
  }

  const handleAddClick = () => {
    if (selection != null) {
      if (result.filter(element => selections_overlap({start: element.start, end: element.end}, selection) ).length == 0) {
        // dont have overlaps
        setResult(
          result.concat([
            { start: selection.start, end: selection.end, label: selectedLabel },
          ]),
        );
      }
      
    }
  };
  const handleRemoveClick = () => {
    if (selection != null) {
      setResult(
        result.filter(
          element => !(selection.start <= element.start && selection.end >= element.end),
        ),
      );
    }
  };

  return (
    <div className="TextWidget">
      <div className="flex-column">
        <div className="flex-row">
          {/* alligned left */}
          <DropDown
            options={labels.map((label, index) => ({
              text: label,
              color: colors[index],
            }))}
            onChange={({ text, color }) => {
              setSelectedLabel(text);
              setSelectedColor(color);
            }}
            disabled={finished}
          />

          <Button
            label={`Label selected as ${selectedLabel}`}
            disabled={finished}
            background={selectedColor}
            onClick={handleAddClick}
          />

          <Checkbox
            value={finished}
            label="Nothing to label"
            onChange={() => setFinished(!finished)}
          />

          {/* spacer */}
          <div className="m-auto" />

          {/* alligned right */}
          <Button
            label="Remove selected"
            disabled={finished}
            onClick={handleRemoveClick}
          />
          <Button
            label="Reset"
            disabled={finished}
            onClick={() => setResult([])}
          />
        </div>
        <div>
          <Selectable
            text={text}
            selected={result}
            disabled={finished}
            label2color={label2color}
            onSelectionChange={setSelection}
          />
        </div>
      </div>
    </div>
  );
};

function withModelContext(Component: (props: WidgetProps) => JSX.Element) {
  return (props: WidgetProps) => (
    <WidgetModelContext.Provider value={props.model}>
      <Component {...props} />
    </WidgetModelContext.Provider>
  );
}

export default withModelContext(TextWidget);
