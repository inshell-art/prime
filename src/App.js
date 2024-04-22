import React, { useState, useEffect, useRef } from "react";
const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState("");
  const [lastInputLength, setLastInputLength] = useState(0);
  const inputRef = useRef(null);
  useEffect(() => {
    const fetchPrime = async () => {
      if (inputValue.length > 0) {
        try {
          const res = await fetch(
            `http://localhost:3000/primes/${inputValue.length}`,
          );
          const data = await res.json();
          const newPrime = data.primes || "No prime found";
          setResponse((prev) => {
            if (inputValue.length < lastInputLength) {
              return `${prev}\n${newPrime}`;
            } else {
              const lines = prev.split("\n");
              lines[lines.length - 1] = newPrime;
              return lines.join("\n");
            }
          });
        } catch (error) {
          setResponse("Failed to fetch data. Error: " + error);
        }
      }
    };
    fetchPrime();
  }, [inputValue.length, inputValue, lastInputLength]);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setLastInputLength(inputValue.length);
  };
  const saveDraft = () => {
    if (inputValue === "" && response === "") {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } else {
      const content = `Title:\n${inputValue}\n\nPrime:\n${response}`;
      const element = document.createElement("a");
      const file = new Blob([content], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "Saved Draft.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };
  return React.createElement(
    "div",
    null,
    React.createElement("textarea", {
      value: response,
      readOnly: true,
      rows: 10,
      style: { width: "100%" },
    }),
    React.createElement("input", {
      ref: inputRef,
      type: "text",
      value: inputValue,
      onChange: handleInputChange,
      placeholder: "",
    }),
    React.createElement("button", { onClick: saveDraft }, "Save"),
  );
};
export default App;
