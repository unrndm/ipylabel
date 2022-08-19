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
  // const [result, setResult] = useModelState("result");
  // const [result] = useModelState("result");
  const [finished, setFinished] = useModelState("finished");

  const [selectedLabel, setSelectedLabel] = useState(labels[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  return (
    <div className="TextWidget">
      <div className="flex-column">
        <div className="flex-row">
          {/* alligned left */}
          <DropDown
            label="dropdown"
            options={labels.map((label, index) => ({
              text: label,
              color: colors[index],
            }))}
            onChange={({text, color})=>{
              setSelectedLabel(text);
              setSelectedColor(color);
            }}
            disabled={finished}
          />

          <Button
            label={`Label selected as ${selectedLabel}`}
            disabled={finished}
            background={selectedColor}
          />
          <Checkbox
            value={finished}
            label="Nothing to label"
            onChange={() => setFinished(!finished)}
            disabled={finished}
          />

          {/* spacer */}
          <div className="m-auto" />

          {/* alligned right */}
          <Button label="Remove selected" disabled={finished} />
          <Button label="Reset" disabled={finished} />
        </div>
        <div>
          <Selectable text={text} disabled={finished} />
        </div>
      </div>
    </div>
  );
}

function withModelContext(Component: (props: WidgetProps) => JSX.Element) {
  return (props: WidgetProps) => (
    <WidgetModelContext.Provider value={props.model}>
      <Component {...props} />
    </WidgetModelContext.Provider>
  );
}

export default withModelContext(TextWidget);
