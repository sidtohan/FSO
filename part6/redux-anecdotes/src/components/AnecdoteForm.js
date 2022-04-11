import React from "react";
import { useDispatch } from "react-redux";
import { createNew } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addNew = (e) => {
    e.preventDefault();
    const dat = e.target.anecdote.value;
    e.target.anecdote.value = "";
    dispatch(createNew(dat));
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
