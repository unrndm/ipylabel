import React from 'react';
import { WidgetModel } from '@jupyter-widgets/base';
import { useModelState, WidgetModelContext } from './hooks/widget-model';

interface TextWidgetProps {
  model: WidgetModel;
}

function TextWidget(props: TextWidgetProps) {
  const [name, setName] = useModelState('value');
  const [disabled, setDisabled] = useModelState('disabled');
  const inputStyle = {
    padding: '7px',
    background: 'whitesmoke',
    border: '1px solid gray',
    borderRadius: '4px',
  };

  return (
    <div className="Widget">
      <h1>Hello {name}, I'm a text widget!</h1>
      <input
        style={inputStyle}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="checkbox"
        checked={disabled}
        onChange={(e) => setDisabled(!disabled)}
      />
    </div>
  );
}

function withModelContext(Component: (props: TextWidgetProps) => JSX.Element) {
  return (props: TextWidgetProps) => (
    <WidgetModelContext.Provider value={props.model}>
      <Component {...props} />
    </WidgetModelContext.Provider>
  );
}

export default withModelContext(TextWidget);
