import React, { useState } from "react";

const AnecdoteOfTheDay = ({ anecdote, votes }) => {
  return (
    <div className="of-the-day">
      <h1>Anecdote of the day</h1>
      <p>{anecdote}</p>
      <p>has {votes} votes.</p>
    </div>
  );
};

const MaxAnecdote = ({ votes, anecdotes }) => {
  // took reference from the internet here
  // using the reduce method
  let maxVoteAnecdote = Object.keys(votes).reduce((a, b) =>
    votes[a] > votes[b] ? a : b
  );
  let testVote = Math.max(...Object.values(votes));
  if (testVote === 0) {
    return (
      <div className="max-votes">
        <h1>Anecdote with most votes</h1>
        <p>No Data Yet</p>
      </div>
    );
  }
  return (
    <div className="max-votes">
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxVoteAnecdote]}</p>
      <p>has {testVote} votes.</p>
    </div>
  );
};
const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};
const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const reqVotes = {};
  for (let i = 0; i < anecdotes.length; i++) {
    reqVotes[i] = 0;
  }
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(reqVotes);

  const voteSelected = () => {
    setVotes({ ...votes, [selected]: votes[selected] + 1 });
  };

  const updateSelected = () => {
    const choice = Math.floor(Math.random() * anecdotes.length);
    setSelected(choice);
  };
  return (
    <div>
      <AnecdoteOfTheDay
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
      />
      <Button onClick={voteSelected} text="vote" />
      <Button onClick={updateSelected} text="next ancedote" />
      <MaxAnecdote votes={votes} anecdotes={anecdotes} />
    </div>
  );
};

export default App;
