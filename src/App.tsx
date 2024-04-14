import React, { useState, useEffect, useRef } from "react";

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [operationCount, setOperationCount] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchPrime = async () => {
      if (operationCount > 0) {
        // Ensure we don't fetch on initial render
        try {
          const res = await fetch(
            `http://localhost:3000/primes/${operationCount}`
          );
          const data = await res.json();
          setResponse(data.primes || "No prime found"); // Assuming 'prime' is the key in response
        } catch (error) {
          setResponse("Failed to fetch data. Error: " + error);
        }
      }
    };
    fetchPrime();
  }, [operationCount]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setOperationCount((prevCount) => prevCount + 1);
  };

  const pickToSave = () => {
    if (inputValue === "" && response === "") {
      if (inputRef.current) {
        inputRef.current.focus(); // Focus back to input if it's empty
      }
    } else {
      const content = `Title: ${inputValue}\nPrime: ${response}`;
      const element = document.createElement("a");
      const file = new Blob([content], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "Your Pick.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <div>
      <textarea value={response} readOnly rows={10} style={{ width: "100%" }} />
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder=""
      />
      <button onClick={pickToSave}>Pick</button>
    </div>
  );
};

export default App;
