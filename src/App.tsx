import React, { useState, useEffect, useRef } from "react";
import styles from "./App.module.css";

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [lastInputLength, setLastInputLength] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <textarea
          className={styles.textarea}
          value={response}
          readOnly
          rows={10}
        />
        <div className={styles.inputRow}>
          <input
            className={styles.input}
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder=""
          />
          <button className={styles.button} onClick={saveDraft}>
            Save
          </button>
        </div>
        <div className={styles.titlePrime}>Prime</div>
      </div>
    </div>
  );
};

export default App;
