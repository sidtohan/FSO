import React, { useState, useImperativeHandle } from "react";
const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible === true ? "block" : "none" };
  const hideWhenVisible = { display: visible === true ? "none" : "block" };
  
  const toggleVisibility = () => setVisible(!visible);
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>add blog</button>
      </div>
    </>
  );
});

export default Togglable;
