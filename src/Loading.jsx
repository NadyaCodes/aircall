import React from "react";
import { FiRotateCw } from "react-icons/fi";
import LoadingElement from "./LoadingElement.jsx";

export default function Loading(props) {
  const { size } = props;

  const loadingArray = [
    ".",
    ".",
    ".",
    "L",
    "o",
    "a",
    "d",
    "i",
    "n",
    "g",
    ".",
    ".",
    ".",
  ];

  const loadingString = loadingArray.map((element, index) => {
    return <LoadingElement element={element} key={index} index={index} />;
  });
  return (
    <div className={`loading loading-${size}`}>
      <div className={`loading-circle loading-circle-${size}`}>
        <FiRotateCw />
      </div>
      <div className={`loading-text loading-text-${size}`}>
        <div>{loadingString}</div>
      </div>
    </div>
  );
}
