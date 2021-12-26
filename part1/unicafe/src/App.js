import React, { useState } from "react";

const StatisticLine = ({ value, text }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given </p>
      </>
    );
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine value={props.good} text="good" />
          <StatisticLine value={props.neutral} text="neutral" />
          <StatisticLine value={props.bad} text="bad" />
          <StatisticLine value={props.total} text="all" />
          <StatisticLine value={props.score / props.total} text="average" />
          <StatisticLine
            value={(props.positive / props.total) * 100 + "%"}
            text="positive"
          />
        </tbody>
      </table>
    </>
  );
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

      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        score={score}
        total={total}
        positive={positive}
      />
    </div>
  );
};

export default App;
