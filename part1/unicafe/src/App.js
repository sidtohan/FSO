import React, { useState } from "react";

const Display = ({ value, text }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const [total, setTotal] = useState(0);
  const [score, setScore] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGood = () => {
    setPositive(positive + 1);
    setScore(score + 1);
    setTotal(total + 1);
    setGood(good + 1);
  };
  const handleNeutral = () => {
    // skipping setScore here because 0 anyway
    setTotal(total + 1);
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setScore(score - 1);
    setTotal(total + 1);
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={handleGood} />
      <Button text="neutral" onClick={handleNeutral} />
      <Button text="bad" onClick={handleBad} />

      <h1>statistics</h1>
      <Display text="good" value={good} />
      <Display text="neutral" value={neutral} />
      <Display text="bad" value={bad} />
      <Display text="all" value={total} />
      <Display
        text="average"
        value={isNaN(score / total) ? "N/A" : score / total}
      />
      <Display
        text="positive"
        value={isNaN(positive / total) ? "N/A" : `${(positive / total) * 100}%`}
      />
    </div>
  );
};

export default App;
