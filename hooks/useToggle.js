import React, { useEffect, useState } from "react";

export default (value) => {
  const [toggle, setToggle] = useState(value);

  const toggleState = () => {
    setToggle((currentState) => !currentState);
  };

  return [toggle, toggleState];
};
