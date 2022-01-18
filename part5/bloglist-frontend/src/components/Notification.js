import React from "react";

const Notification = ({ message, notifType }) => {
  if (message === null) {
    return null;
  }
  if (notifType === "success") {
    return <div className="notification">{message}</div>;
  } else {
    return <div className="error">{message}</div>;
  }
};

export default Notification;
