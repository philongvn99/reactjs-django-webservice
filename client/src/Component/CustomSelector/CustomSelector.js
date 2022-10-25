import React, { useState, useRef, useEffect } from "react";
import "./custom-selector-styles.scss";

const CustomSelector = (props) => {
  const [selectedOption, setSelectedOption] = useState(
    props.defaultValue || {
      label: (props.placeholder || "Select Option") + "...",
      logo: null,
      value: null,
    }
  );
  const [isOpened, setIsOpened] = useState(false);
  const ref = useRef();

  const handleSelect = (selection) => {
    setIsOpened(!isOpened);
    setSelectedOption(selection);
    if (props.onChange) props.onChange(selection);
  };

  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current && ref.current.contains(event.target)) {
        return;
      }
      setIsOpened(false);
    };

    // add event listener
    document.body.addEventListener("click", onBodyClick);

    // remove event listener
    return () => {
      document.body.removeEventListener("click", onBodyClick);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={
        isOpened ? "selector-container expanded" : "selector-container"
      }
    >
      <div className="select-input" onClick={() => setIsOpened(!isOpened)}>
        <span
          className={`${
            selectedOption.value === null
              ? "select-label placeholder"
              : "select-label"
          }`}
        >
          {selectedOption.label}
        </span>
        {selectedOption.logo}
      </div>
      {isOpened && (
        <div className="select-list">
          {props.options.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelect(item)}
              className="select-item"
            >
              <span className="select-label">{item.label}</span>
              {item.logo}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelector;
