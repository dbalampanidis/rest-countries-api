import React from "react";

const Country = ({
  dark,
  name,
  capital,
  population,
  flag,
  region,
  showDetails,
  code,
}) => {
  const handleShowDetails = () => {
    showDetails(code);
  };

  return (
    <div
      className={dark ? "country dark" : "country"}
      onClick={handleShowDetails}
    >
      <picture>
        <img src={flag} alt="Country Flag" />
      </picture>
      <section>
        <h2>{name}</h2>
        <p>
          <span className="country-info-highlight">Population: </span>
          {new Intl.NumberFormat().format(population)}
        </p>
        <p>
          <span className="country-info-highlight"> Capital: </span>
          {capital}
        </p>
        <p>
          <span className="country-info-highlight">Region: </span>
          {region}
        </p>
      </section>
    </div>
  );
};

export default Country;
