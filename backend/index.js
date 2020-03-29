const express = require('express');
const cors = require('cors');
const rando = require('random-number-in-range');

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

function getLastId(values) {
    const lastReading = {...values[values.length - 1]};
    let lastId = lastReading.id;
    return ++lastId;
}

function createThermostat(payload) {
    const thermostatId = getLastId(thermostats);
    const thermostat = {
        ...payload,
        id: thermostatId,
    };
    thermostats.push(thermostat);

    createReading(thermostatId);

    return thermostat;
}

function createReading(thermostatId) {
    const readingId = getLastId(readings);

    readings.push({
        id: readingId,
        thermostat_id: thermostatId,
        humidity: rando(0, 100),
        temperature: rando(0, 100),
        battery_charge: rando(0, 100),
    });
}

app.get('/thermostats', (req, res) => {
    return res.status(200).send(thermostats);
});

app.get('/thermostats/:id/measurements', (req, res) => {
    const measurements = readings.filter(({thermostat_id}) => String(thermostat_id) === String(req.params.id));
    measurements.sort((a, b) => b.id - a.id);

    const length = measurements.length;

    if (req.query.page === 'undefined' || req.query.page_size === 'undefined') {
        return res.status(200).send({
            readings: measurements,
            pagination: {length}
        });
    }

    const pageIndex = Number(req.query.page);
    const pageSize = Number(req.query.page_size);

    const paginatedList = [];

    let index = 0;
    while (measurements.length > 0) {
        paginatedList[index] = measurements.splice(0, pageSize);
        index++;
    }

    const paginatedResponse = {
        readings: !!paginatedList[pageIndex] ? paginatedList[pageIndex] : [],
        pagination: {length},
    };
    return res.status(200).send(paginatedResponse);
});

app.post('/thermostats', (req, res) => {
    console.log('req body >>>', req.body);
    res.status(200).send(createThermostat(res.body));
});

app.listen(port, () => console.log(`Thermostat backend is listening on port ${port}!`));


/**
 * Generate random readings for each thermostats every 10 mins
 */
setInterval(() => thermostats.forEach(({id}) => createReading(id)), 60 * 10 * 1000);
