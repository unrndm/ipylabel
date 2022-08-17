// Copyright (c) Danil Kireev
// Distributed under the terms of the Modified BSD License.

import {
  DOMWidgetModel,
  DOMWidgetView,
  ISerializers,
} from "@jupyter-widgets/base";

import ReactWidget, { defaultModelProperties } from "./ReactWidget";
import TextWidget, {
  defaultModelProperties as defaultTextModelProperties,
} from "./TextWidget";
import { WidgetProps } from "./types";

import React from "react";
import ReactDOM from "react-dom";

import { MODULE_NAME, MODULE_VERSION } from "./version";

// Import the CSS
import "../css/widget.css";

abstract class DefaultDOMWidgetModel extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: this.model_name,
      _view_name: this.view_name,

      _model_module: this.model_module,
      _model_module_version: this.model_module_version,
      _view_module: this.view_module,
      _view_module_version: this.view_module_version,

      ...defaultModelProperties,
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  };

  abstract model_name: string;
  model_module = MODULE_NAME;
  model_module_version = MODULE_VERSION;

  abstract view_name: string;
  view_module = MODULE_NAME; // Set to null if no view
  view_module_version = MODULE_VERSION;

  abstract defaultModelProperties: any;
}

abstract class DefaultDOMWidgetView extends DOMWidgetView {
  abstract widget: (props: WidgetProps) => JSX.Element;
  render() {
    const component = React.createElement(this.widget, {
      model: this.model,
    });
    ReactDOM.render(component, this.el);
  }
}

// example
type WidgetModelState = typeof defaultModelProperties;

export class ExampleModel extends DefaultDOMWidgetModel {
  model_name = "ExampleModel";
  view_name = "ExampleView"; // Set to null if no view

  defaultModelProperties = defaultModelProperties;
}

export class ExampleView extends DefaultDOMWidgetView {
  widget = ReactWidget;
}

// Text widget
type TextLabelingModelState = typeof defaultTextModelProperties;

export class TextLabelingModel extends DefaultDOMWidgetModel {
  model_name = "TextLabelingModel";
  view_name = "TextLabelingView";

  defaultModelProperties = defaultTextModelProperties;
}

export class TextLabelingView extends DefaultDOMWidgetView {
  widget = TextWidget;
}

// global

export type ModelStates = WidgetModelState & TextLabelingModelState;
