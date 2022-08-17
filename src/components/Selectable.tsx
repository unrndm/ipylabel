import React from "react";

export interface SelectableProps {
  text: string
}

const Selectable = ({text}: SelectableProps): JSX.Element => {
  const handleSelection = (event: any) =>{
    console.log(event)
    const selection = window.getSelection()
    console.log(selection)
  }
  
  return <div onMouseUp={handleSelection} onDoubleClick={handleSelection}>
    {text.split("").map((letter)=><span>{letter}</span>)}
  </div>
}

export default Selectable
