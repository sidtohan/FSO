import axios from "axios";
import React, { useState, useEffect } from "react";

const Filter = ({ filterName, onChange }) => {
  return (
    <form>
      <input value={filterName} onChange={onChange} />
    </form>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addNewPerson}>
      <div>
        name: <input value={props.newName} onChange={props.nameInputHandler} />
      </div>
      <div>
        number:{" "}
        <input value={props.newPhone} onChange={props.phoneInputHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const PersonDetails = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  );
};

const Persons = ({ displayPersons }) => {
  return (
    <div>
      {displayPersons.map((person) => (
        <PersonDetails key={person.name} person={person} />
      ))}
    </div>
  );
};
const App = () => {
  const [persons, setPersons] = useState([]);

  const [displayPersons, setDisplayPersons] = useState(persons);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterName, setFilterName] = useState("");

  const nameInputHandler = (e) => {
    setNewName(e.target.value);
  };
  const phoneInputHandler = (e) => {
    setNewPhone(e.target.value);
  };

  const filterByName = (e) => {
    const val = e.target.value.toLowerCase();
    setFilterName(val);
    // not using filterName directly in the next line
    // since it is updated when re rendered only
    // maybe causing issues because of that
    setDisplayPersons(
      persons.filter((person) => person.name.toLowerCase().includes(val))
    );
  };

  const addNewPerson = (e) => {
    e.preventDefault();
    const newPersons = persons.concat({ name: newName, number: newPhone });
    const check = persons.filter((person) => person.name === newName);
    if (check.length !== 0) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(newPersons);
    setDisplayPersons(
      newPersons.filter((person) =>
        person.name.toLowerCase().includes(filterName)
      )
    );
    setNewName("");
    setNewPhone("");
  };

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
      setDisplayPersons(response.data);
    });
  }, []);
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} onChange={filterByName} />
      <h2>add a new</h2>
      <PersonForm
        addNewPerson={addNewPerson}
        newName={newName}
        nameInputHandler={nameInputHandler}
        newPhone={newPhone}
        phoneInputHandler={phoneInputHandler}
      />
      <h2>Numbers</h2>
      <Persons displayPersons={displayPersons} />
    </div>
  );
};

export default App;
