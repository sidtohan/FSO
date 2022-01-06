const Notification = ({ message, notifType }) => {
  if (message === null) {
    return null;
  }
  if (notifType === "suc") {
    return <div className="notification">{message}</div>;
  } else {
    return <div className="error">{message}</div>;
  }
};

export default Notification;
