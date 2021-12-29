import React, { useState, useEffect } from "react";
import phoneService from "./services/phone";

const Notification = ({ message, notifType }) => {
  if (message === null) {
    return null;
  }
  if (notifType === "suc") {
    return <div className="notification">{message}</div>;
  } else {
    return <div className="error">{message}</div>;
  }
};
const Filter = ({ filterName, onChange }) => {
  return (
    <form>
      <span>filter shown with</span>{" "}
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
    <span>
      {person.name} {person.number}{" "}
    </span>
  );
};

const Persons = (props) => {
  const displayPersons = props.persons.filter((person) =>
    person.name.toLowerCase().includes(props.filterName.toLowerCase())
  );
  const deletePerson = (person) => {
    const deletedName = person.name;
    if (window.confirm(`Delete ${deletedName}?`)) {
      const id = person.id;
      phoneService.remove(id).then((response) => {
        props.setPersons(
          props.persons.filter((person) => person.name !== deletedName)
        );
        console.log(`${response} delete successfully`);
      });
    }
  };
  return (
    <div>
      {displayPersons.map((person) => {
        return (
          <div key={person.name}>
            <PersonDetails person={person} />
            <button onClick={() => deletePerson(person)}>delete</button>
          </div>
        );
      })}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterName, setFilterName] = useState("");
  const [message, setMessage] = useState(null);
  const [notifType, setNotifType] = useState("suc");
  const nameInputHandler = (e) => {
    setNewName(e.target.value);
  };
  const phoneInputHandler = (e) => {
    setNewPhone(e.target.value);
  };

  const filterByName = (e) => {
    const val = e.target.value;
    setFilterName(val);
    // not using filterName directly in the next line
    // since it is updated when re rendered only
    // maybe causing issues because of that
  };

  const addNewPerson = (e) => {
    e.preventDefault();
    const check = persons.filter((person) => person.name === newName);
    if (check.length !== 0) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number?`
        )
      ) {
        phoneService
          .update({ ...check[0], number: newPhone }, check[0].id)
          .then((response) => {
            const newPersons = persons.map((person) => {
              return response.id === person.id ? response : person;
            });
            setPersons(newPersons);
            setNewName("");
            setNewPhone("");
            setMessage(`${response.name} has been updated.`);
            setTimeout(() => setMessage(null), 2500);
          })
          .catch((err) => {
            setMessage(`${newName} was removed from the server`);
            setNotifType("err");
            setTimeout(() => setMessage(null), 2700);
          });
      }
    } else {
      phoneService
        .create({ name: newName, number: newPhone })
        .then((response) => {
          setPersons(persons.concat(response));
          setNewName("");
          setNewPhone("");
          setMessage(`${response.name} was added successfully`);
          setTimeout(() => setMessage(null), 2500);
        });
    }
  };
  useEffect(() => {
    phoneService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} notifType={notifType} />
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
      <Persons
        persons={persons}
        setPersons={setPersons}
        filterName={filterName}
      />
    </div>
  );
};

export default App;
