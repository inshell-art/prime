import React, { useState, useEffect } from "react";

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [operationCount, setOperationCount] = useState<number>(0);

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setOperationCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <textarea value={response} readOnly rows={10} style={{ width: "100%" }} />
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter your query"
      />
    </div>
  );
};

export default App;
