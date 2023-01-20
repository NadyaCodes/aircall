import React from "react";

export default function LoadingElement(props) {
  const delayArray = [
    ".6",
    ".5",
    ".4",
    ".3",
    ".2",
    ".1",
    "0",
    ".1",
    ".2",
    ".3",
    ".4",
    ".5",
    ".6",
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
