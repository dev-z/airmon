/**
 * This utility generates dummy data for flights.
 * Each record has the following structure:
 {
    "id": 254,
    "flId": "AV-254",
    "airlineName": "Air Vistara",
    "price": {
      "value": 5300,
      "currency": "INR",
      "currencySymbol": "Rs."
    },
    "origin": {
      "airportId": "BLR",
      "departure": "2018-09-29T08:00:00.525Z"
    },
    "destination": {
      "airportId": "CCU",
      "arrival": "2018-09-29T10:00:00.525Z"
    }
  }
 */
const fs = require('fs');

const operators = [
  {
    id: 'AI',
    name: 'Air India'
  },
  {
    id: 'AV',
    name: 'Air Vistara'
  },
  {
    id: 'JA',
    name: 'Jet Airways'
  },
  {
    id: 'IG',
    name: 'Indigo'
  },
  {
    id: 'GO',
    name: 'Go Air'
  },
  {
    id: 'SP',
    name: 'SpiceJet'
  },
];

const airports = ['AMD', 'BLR', 'BOM', 'HYD', 'DEL', 'CCU', 'PNQ'];

const RECORDS_COUNT = 1000;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const records = [];

for (let i = 0; i < RECORDS_COUNT; i += 1) {
  const operatorIndex = getRandomInt(operators.length);
  const operator = operators[operatorIndex];

  const originIndex = getRandomInt(airports.length);
  let destIndex = getRandomInt(airports.length);
  if (destIndex === originIndex) {
    destIndex = getRandomInt(airports.length);
  }
  const originAirport = airports[originIndex];
  const destAirport = airports[destIndex];
  
  const id = i + 1;

  let record = {
    id,
    flId: `${operator.id}-${id}`,
    airlineName: operator.name,
    price: {
      value: getRandomInt(9000) + 1500,
      currency: 'INR',
      currencySymbol: 'Rs.'
    },
    origin: {
      airportId: originAirport,
      departure: "2018-09-29T08:00:00.525Z"
    },
    destination: {
      airportId: destAirport,
      arrival: "2018-09-29T10:00:00.525Z"
    }
  };
  records.push(record);
}

const dataToWrite = JSON.stringify(records, null, 2);

fs.appendFile('sample.json', dataToWrite, function (err) {
  if (err) {
    console.log('Error');
    console.log(err);
  } else {
    console.log('Saved!');
  }
});
