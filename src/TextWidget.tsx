import React from "react";
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

function TextWidget(props: WidgetProps) {
  // use as input
  const [text] = useModelState("text");
  const [labels, setLabels] = useModelState("labels");
  const [colors, setColors] = useModelState("colors");

  // set as output
  const [result, setResult] = useModelState("result");
  const [finished, setFinished] = useModelState("finished");

  console.table({text, labels, colors,result, finished})

  return (
    <div className="TextWidget">
      <div className="flex-column">
        <div className="flex-row">
          {/* alligned left */}
          <DropDown label="dropdown" disabled={finished}/>
          <Button label={`Label selected as {value from dropdown}`} disabled={finished}/>
          <Checkbox
            value={finished}
            label="Nothing to label"
            onChange={() => setFinished(!finished)}
            disabled={finished}
          />

          {/* spacer */}
          <div className="m-auto" />

          {/* alligned right */}
          <Button label="Remove selected" disabled={finished}/>
          <Button label="Reset" disabled={finished}/>
        </div>
        <div>
          <Selectable text={text} disabled={finished}/>
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
