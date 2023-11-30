const express = require("express");
const axios = require("axios");

const app = express();

app.get("/allCountries", async (req, res) => {
  const response = await axios.get("https://restcountries.com/v3.1/all");
  const countries = response.data;
  res.json(countries);
});

app.listen(5000, () => {
  console.log("server listening to port 5000");
});
