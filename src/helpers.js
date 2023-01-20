import React from "react";
import {
  FiPhoneMissed,
  FiPhoneIncoming,
  FiPhoneOutgoing,
  FiPhone,
  FiMic,
} from "react-icons/fi";

export function formatUnknown(info) {
  if (typeof info === "string" && info.toLowerCase().includes("unknown")) {
    return "Unknown";
  }
  return info;
}

export function formatTime(time) {
  let hours = Math.floor(time / 3600);
  time = time - hours * 3600;
  let minutes = Math.floor(time / 60);
  let seconds = time - minutes * 60;
  return { hours, minutes, seconds };
}

export function phoneIcon(call) {
  switch (call.call_type) {
    case "missed":
      return <FiPhoneMissed />;
    case "answered":
      if (call.direction === "inbound") {
        return <FiPhoneIncoming />;
      }
      if (call.direction === "outbound") {
        return <FiPhoneOutgoing />;
      } else return <FiPhone />;
    case "voicemail":
      return <FiMic />;
    default:
      return <FiPhone />;
  }
}

export function toggleDetails(details, settingFunc) {
  if (details === false) {
    return settingFunc(true);
  }
  return settingFunc(false);
}
