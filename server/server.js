const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/allCountries", async (req, res) => {
  const response = await axios.get("https://restcountries.com/v3.1/all");
  const countries = response.data;
  res.json(countries);
});

app.get("/countryByName/:country", async (req, res) => {
  const { country } = req.params;
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${country}`
    );
    const countries = response.data;
    res.json(countries);
  } catch (error) {
    res.json(error);
  }
});

app.listen(5000, () => {
  console.log("server listening to port 5000");
});
