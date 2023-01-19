import React from "react";

export default function LoadingElement(props) {
  const delayArray = [
    "0",
    ".1",
    ".2",
    ".3",
    ".4",
    ".5",
    ".6",
    ".7",
    ".8",
    ".9",
    "1",
    "1.1",
    "1.2",
    "1.3",
    "1.4",
  ];

  return (
    <span
      className="blink"
      style={{ animationDelay: `${delayArray[props.index]}s` }}
    >
      {props.element}
    </span>
  );
}
