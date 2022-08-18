import React from "react";
import { useModelState, WidgetModelContext } from "./hooks/widget-model";
import { WidgetProps } from "./types";
import { Button, Checkbox, DropDown, Selectable } from "./components";

// widget state, don't forget to update `ipylabel/text.py`
export const defaultModelProperties: {
  text: string;
  labels: string[];
  colors: string[]; // should be color
  result: { start: string; end: string; label: string }[];
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
  const [text] = useModelState("text");
  const [finished, setFinished] = useModelState("finished");

  return (
    <div className="TextWidget">
      <div className="flex-column">
        <div className="flex-row">
          {/* alligned left */}
          <DropDown label="dropdown" />
          <Button label={`Label selected as {value from dropdown}`} />
          <Checkbox
            value={finished}
            label="Nothing to label"
            onChange={() => setFinished(!finished)}
          />

          {/* spacer */}
          <div className="m-auto" />

          {/* alligned right */}
          <Button label="Remove selected" />
          <Button label="Reset" />
        </div>
        <div>
          <Selectable text={text} />
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
