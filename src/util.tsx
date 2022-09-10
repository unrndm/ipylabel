import React from "react";
import { WidgetProps } from "./types";
import { WidgetModelContext } from "./hooks/widget-model";

export function withModelContext(
  Component: (props: WidgetProps) => JSX.Element,
) {
  return function withModelContext(props: WidgetProps) {
    return (
      <WidgetModelContext.Provider value={props.model}>
        <Component {...props} />
      </WidgetModelContext.Provider>
    );
  };
}
