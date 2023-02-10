const express = require('express');
const request = require("request");

const app = express();

const API_KEY = "91256a0530b9b02ca05a2233a7608072"; 


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

app.get("/weather/:latitude/:longitude", (req, res) => {
  const lat = req.params.latitude;
  const lon = req.params.longitude;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;

  request(weatherUrl, (error, response, body) => {
    if (error) {
      return res.status(500).send("Error retrieving weather information.");
    }

    const weatherData = JSON.parse(body);
    const temperature = weatherData.main.temp;
    const weatherStatus = weatherData.weather[0].main;

    res.send({ temperature, weatherStatus });
  });
});

app.get('/weather/forecast/:lat/:lon', (req, res) => {
  const lat = req.params.lat;
  const lon = req.params.lon;
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;

  request(url, (err, response, body) => {
    if (err) {
      res.status(500).send({ error: 'Something went wrong' });
    } else {
      const data = JSON.parse(body);
      const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const forecast = [];
      let currentDay = new Date().getDay();

      for (let i = 0; i < 5; i++) {
        let tempSum = 0;
        let count = 0;

        data.list.forEach(hourlyData => {
          const date = new Date(hourlyData.dt * 1000);
          if (date.getDay() === currentDay) {
            tempSum += hourlyData.main.temp;
            count++;
          }
        });

        const day = {
          dayName: week[currentDay],
          temp: Math.round(tempSum / count),
        };
        forecast.push(day);
        currentDay = (currentDay + 1) % 7;
      }

      res.send({ forecast });
    }
  });
});
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});