import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import {
  MdOutlineLightMode,
  MdOutlineDarkMode,
  MdOutlineSearch,
} from "react-icons/md";

import Country from "./components/Country";
import Footer from "./components/Footer";
import CountryDetails from "./pages/CountryDetails";

import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [dark, setDark] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [noCountries, setNoCountries] = useState(null);

  //needed for deployment branch
  const serverURL = process.env.REACT_APP_SERVER_URL;

  const fetchData = async (req, res) => {
    setLoading(true);
    const response = await axios.get(`${serverURL}/allCountries`);
    const countries = response.data;
    setLoading(false);
    setCountries(countries);
    setNoCountries(false);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSearch = (e) => {
    let name = e.target.value;
    name = name.replace(/[^A-Za-z]/g, "");
    //if search box is not empty, fetch country by name
    if (name) {
      const fetchSearch = async (req, res) => {
        const fetchData = await axios.get(`${serverURL}/countryByName/${name}`);
        const response = fetchData.data;
        //if country exists
        if (response.status !== 404) {
          setCountries(response);
        } else {
          //if country doesn't exit
          setNoCountries(true);
        }
      };

      try {
        fetchSearch();
      } catch (error) {
        console.log(error);
      }
    } else {
      //if search box is empty, fetch all countries
      try {
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleToggleTheme = () => {
    setDark(!dark);
  };

  const showDetails = (code) => {
    navigate(`/${code}`);
  };

  return (
    <div className={dark ? "container dark" : "container"}>
      <header className={dark ? "header dark" : ""}>
        <h1>
          <Link className={dark ? "link dark" : "link light"} to="/">
            REST Countries API
          </Link>
        </h1>
        <button
          onClick={handleToggleTheme}
          className={dark ? "toggle dark" : "toggle"}
        >
          {dark ? (
            <>
              <MdOutlineLightMode /> Light Mode
            </>
          ) : (
            <>
              <MdOutlineDarkMode /> Dark Mode
            </>
          )}
        </button>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            loading ? (
              <div
                className={dark ? "lds-dual-ring dark" : "lds-dual-ring light"}
              ></div>
            ) : (
              <>
                <div className={dark ? "countries dark" : "countries"}>
                  <section className="search-filter">
                    <section className={dark ? "dark" : ""}>
                      <MdOutlineSearch />
                      <input
                        onChange={handleSearch}
                        type="text"
                        placeholder="Search for a country..."
                      />
                    </section>
                  </section>
                  <section className="countries-info">
                    {!noCountries ? (
                      countries?.map((country, index) => {
                        return (
                          <Country
                            dark={dark}
                            key={index}
                            code={country.name.common}
                            name={country.name.common}
                            capital={country.capital}
                            population={country.population}
                            flag={country.flags.svg}
                            region={country.region}
                            showDetails={showDetails}
                          />
                        );
                      })
                    ) : (
                      <p>No Countries Found</p>
                    )}
                  </section>
                </div>
                <Footer />
              </>
            )
          }
        ></Route>
        <Route
          path="/:countryName"
          element={<CountryDetails dark={dark} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
