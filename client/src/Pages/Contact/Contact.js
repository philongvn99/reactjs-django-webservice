import React, { useState, useEffect, useId, useReducer } from "react";

const reducer = (state, action) => {
  switch (action) {
    case "Tang":
      return state + 1;
    case "Giam":
      return state - 1;
    case "Xoa":
      return 0;
    default:
      return state;
  }
};

const ContactPage = () => {
  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <div className="contact-cover">
      <div className="contact-up">
        <span>Count: {count}</span>
        <button onClick={() => dispatch("Tang")}>Tang</button>
        <button onClick={() => dispatch("Giam")}>Giam</button>
        <button onClick={() => dispatch("Xoa")}>Xoa Dulieu</button>
      </div>
      <div className="contact-down"></div>
    </div>
  );
};

export default ContactPage;
