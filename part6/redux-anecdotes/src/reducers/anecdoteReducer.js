const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
  if (action.type === "VOTE") {
    const id = action.data.id;
    const anecdoteToBeVoted = state.find((anc) => anc.id === id);
    const newAnecdote = {
      ...anecdoteToBeVoted,
      votes: anecdoteToBeVoted.votes + 1,
    };
    const newList = state.map((an) => (an.id === id ? newAnecdote : an));
    newList.sort((an1, an2) => an2.votes - an1.votes);
    // for sorting
    // sort function positive : an1 after an2 in ordering
    return newList;
  } else if (action.type === "NEW") {
    // new anecdote made here
    return state.concat(asObject(action.data));
  }
  return state;
};

export const updateVote = (id) => {
  return {
    type: "VOTE",
    data: { id },
  };
};

export const createNew = (anecdote) => {
  return {
    type: "NEW",
    data: anecdote,
  };
};
export default reducer;
