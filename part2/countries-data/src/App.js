import axios from "axios";
import React, { useState, useEffect } from "react";

const Search = ({ searchCountry, onChange }) => {
  return (
    <form>
      <input value={searchCountry} onChange={onChange} />
    </form>
  );
};

const Country = ({ country }) => {
  const showMore = (e) => {
    console.log(e.target.value);
  };
  return (
    <li>
      {country.name.common}{" "}
      <button onClick={showMore} value={country.name.common}>
        show more
      </button>
      <div id={country.name.common}></div>
    </li>
  );
};

const CountryDetail = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        capital {country.capital[0]} <br />
        population {country.population}
      </div>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map((lang, i) => (
          <li key={i}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Flag" />
    </div>
  );
};

const Display = ({ displayCountries, searchCountry }) => {
  if (searchCountry === "") {
    return <div>Please use the search bar to begin</div>;
  }
  if (displayCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  if (displayCountries.length == 1) {
    return <CountryDetail country={displayCountries[0]} />;
  }
  return (
    <ul>
      {displayCountries.map((country, i) => (
        <Country key={i} country={country} />
      ))}
    </ul>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const displayCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
  );

  const findCountries = (e) => {
    setSearchCountry(e.target.value);
  };

  useEffect(() => {
    console.log("begin....");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div>
      <Search onChange={findCountries} searchCountry={searchCountry} />
      <Display
        displayCountries={displayCountries}
        searchCountry={searchCountry}
      />
    </div>
  );
};

export default App;
