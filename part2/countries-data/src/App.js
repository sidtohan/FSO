import axios from "axios";
import React, { useState, useEffect } from "react";

const api_key = process.env.REACT_APP_API_KEY;
const apiLink = "https://api.openweathermap.org/data/2.5/weather?";

const Weather = ({ city }) => {
  city = city[0];
  const [weather, setWeather] = useState({});
  useEffect(() => {
    axios
      .get(apiLink, {
        params: {
          q: city,
          appid: api_key,
        },
      })
      .then((response) => {
        setWeather({
          temp: Math.round(response.data.main.temp - 273),
          wind: response.data.wind.speed,
          icon: response.data.weather.icon,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="weather-display">
      <h2>Weather in {city}</h2>
      <div>
        <strong>temperature</strong>: {weather.temp} celsius
      </div>
      <div>
        <strong>wind</strong>: {weather.wind} mph
      </div>
    </div>
  );
};
const Search = ({ searchCountry, onChange }) => {
  return (
    <form>
      <input value={searchCountry} onChange={onChange} />
    </form>
  );
};

const Country = ({ country, setActiveDetail, idx, activeDetail }) => {
  const showMore = (e) => {
    setActiveDetail(activeDetail.map((detail, i) => (i === idx ? 1 : detail)));
  };
  return (
    <li>
      {country.name.common}{" "}
      <button onClick={showMore} value={country.name.common}>
        show more
      </button>
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
      <Weather city={country.capital} />
    </div>
  );
};

const Display = ({
  displayCountries,
  searchCountry,
  activeDetail,
  setActiveDetail,
}) => {
  if (searchCountry === "") {
    return <div>Please use the search bar to begin</div>;
  }
  if (displayCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  if (displayCountries.length === 1) {
    return <CountryDetail country={displayCountries[0]} />;
  }
  return (
    <ul>
      {displayCountries.map((country, i) => {
        if (activeDetail[i] === 1) {
          return <CountryDetail key={i} country={country} />;
        }
        return (
          <Country
            key={i}
            country={country}
            idx={i}
            setActiveDetail={setActiveDetail}
            activeDetail={activeDetail}
          />
        );
      })}
    </ul>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const displayCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
  );
  const [activeDetail, setActiveDetail] = useState([]);
  const findCountries = (e) => {
    setSearchCountry(e.target.value);

    // setting the new filtered countries
    const helper = countries.filter((country) =>
      country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (helper.length < 10) {
      const temp = [];
      for (let i = 0; i < helper.length; i++) {
        temp.push(0);
      }
      setActiveDetail(temp);
    }
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      <Search onChange={findCountries} searchCountry={searchCountry} />
      <Display
        displayCountries={displayCountries}
        searchCountry={searchCountry}
        activeDetail={activeDetail}
        setActiveDetail={setActiveDetail}
      />
    </div>
  );
};

export default App;
