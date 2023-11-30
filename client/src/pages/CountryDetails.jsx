import "../App.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { MdArrowBack } from "react-icons/md";

const CountryDetails = ({ dark }) => {
  const navigate = useNavigate();
  const params = useParams();
  const countryName = params.countryName;
  const [loading, setLoading] = useState(false);
  const [noCountry, setNoCountry] = useState(null);
  const [country, setCountry] = useState({
    name: "",
    official: "",
    flagImg: "",
    population: 0,
    region: "",
    subregion: "",
    capital: "",
    currencies: {},
    languages: [],
    borders: [],
  });

  const serverURL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const fetchCountry = async (req, res) => {
      setLoading(true);
      const fetchData = await axios.get(
        `${serverURL}/countryByName/${countryName}`
      );
      const country = fetchData.data;
      if (country.status !== 404) {
        setCountry({
          ...country,
          name: country[0].name.common,
          official: country[0].name.official,
          flagImg: country[0].flags.svg,
          population: country[0].population,
          region: country[0].region,
          subregion: country[0].subregion,
          capital: country[0].capital,
          currencies: country[0].currencies,
          languages: country[0].languages,
          borders: country[0].borders,
        });
      } else {
        setNoCountry(true);
      }
      setLoading(false);
    };
    fetchCountry();
  }, [countryName]);

  return loading ? (
    <div className={dark ? "lds-dual-ring dark" : "lds-dual-ring light"}></div>
  ) : !noCountry ? (
    <div className={dark ? "country-details dark" : "country-details"}>
      <button
        className={dark ? "back-btn dark" : "back-btn"}
        onClick={() => navigate(-1)}
      >
        <MdArrowBack />
        Back
      </button>
      <div className="country-details-body">
        <div className="img-container">
          <img src={country.flagImg} alt="Country Flag" />
        </div>
        <div className="country-details-content">
          <div className="country-details-name">
            <h1>{country.name}</h1>
          </div>
          <div className="country-details-info">
            <section>
              {/* <p>
                    Native Name: <span>{nativeName}</span>
                  </p> */}
              <p>
                Official Name: <span>{country.official}</span>
              </p>
              <p>
                Population:{" "}
                <span>
                  {new Intl.NumberFormat().format(country.population)}
                </span>
              </p>
              <p>
                Region: <span>{country.region}</span>
              </p>
              <p>
                Sub Region: <span>{country.subregion}</span>
              </p>
              <p>
                Capital: <span>{country.capital}</span>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>No Country found</p>
  );
};

export default CountryDetails;
