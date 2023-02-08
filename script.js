const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/date', (req, res) => {
  const date = new Date();
  const dateString = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
  res.send(dateString);
});

app.get('/temperature', (req, res) => {
  const temperature = 72; // sample data
  res.send(temperature + '°F');
});

app.get('/forecast', (req, res) => {
  const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const forecast = {
    forecast: [
      {
        dayName: week[new Date().getDay()],
        temp: 60,
      },
      {
        dayName: week[(new Date().getDay() + 1) % 7],
        temp: 60,
      },
      {
        dayName: week[(new Date().getDay() + 2) % 7],
        temp: 61,
      },
      {
        dayName: week[(new Date().getDay() + 3) % 7],
        temp: 62,
      },
      {
        dayName: week[(new Date().getDay() + 4) % 7],
        temp: 63,
      },
      {
        dayName: week[(new Date().getDay() + 5) % 7],
        temp: 64,
      },
      {
        dayName: week[(new Date().getDay() + 6) % 7],
        temp: 65,
      },
    ],
  };
  res.send(forecast);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});