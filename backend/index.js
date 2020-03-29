const express = require('express');
const app = express();
const port = 3000;

app.get('/thermostats', (req, res) => res.send('Hello World!'));

app.get('/thermostats/:id/measurements', (req, res) => res.send('Hello World!'));

app.post('/thermostats', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Thermostat backend is listening on port ${port}!`));
