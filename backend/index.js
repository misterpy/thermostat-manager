const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

const thermostats = [
    {
        id: 1,
        household_token: 'user',
        location: 'living room',
    },
    {
        id: 2,
        household_token: 'user',
        location: 'bedroom 1',
    },
    {
        id: 3,
        household_token: 'user',
        location: 'bedroom 2',
    },
    {
        id: 4,
        household_token: 'user',
        location: 'kitchen',
    },
    {
        id: 5,
        household_token: 'user1',
        location: 'bedroom 2',
    },
    {
        id: 6,
        household_token: 'user1',
        location: 'kitchen',
    },
];

const readings = [
    {
        id: 1,
        humidity: 60,
        temperature: 20,
        thermostat_id: 1,
        battery_charge: 90,
    },
    {
        id: 2,
        humidity: 60,
        temperature: 20,
        thermostat_id: 2,
        battery_charge: 90,
    },
    {
        id: 3,
        humidity: 60,
        temperature: 20,
        thermostat_id: 3,
        battery_charge: 90,
    },
    {
        id: 4,
        humidity: 60,
        temperature: 20,
        thermostat_id: 4,
        battery_charge: 90,
    },
    {
        id: 5,
        humidity: 60,
        temperature: 20,
        thermostat_id: 1,
        battery_charge: 90,
    },
    {
        id: 6,
        humidity: 60,
        temperature: 20,
        thermostat_id: 2,
        battery_charge: 90,
    },
    {
        id: 7,
        humidity: 60,
        temperature: 20,
        thermostat_id: 3,
        battery_charge: 25,
    },
    {
        id: 8,
        humidity: 60,
        temperature: 20,
        thermostat_id: 4,
        battery_charge: 90,
    },
    {
        id: 9,
        humidity: 60,
        temperature: 20,
        thermostat_id: 5,
        battery_charge: 25,
    },
    {
        id: 10,
        humidity: 60,
        temperature: 20,
        thermostat_id: 6,
        battery_charge: 90,
    },
];

app.get('/thermostats', (req, res) => {
    return res.status(200).send(thermostats);
});

app.get('/thermostats/:id/measurements', (req, res) => {
    const measurements = readings.filter(({thermostat_id}) => String(thermostat_id) === String(req.params.id));
    return res.status(200).send(measurements);
});

app.post('/thermostats', (req, res) => {
    console.log('req body >>>', req.body);
});

app.listen(port, () => console.log(`Thermostat backend is listening on port ${port}!`));
