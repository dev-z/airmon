// Uncomment below line to enable filter by dates
// import moment from 'moment';

const flightRecords = require('./../data/flights.json');
const airportRecords = require('./../data/airports.json');

// Uncomment this function to enable filter by dates
/*
function getDatefromISODate(dtStr) {
  return moment(dtStr, moment.ISO_8601).format('YYYY-MM-DD');
}
*/

// origin, destination, departureDate, returnDate, passengers, type
function filterFlights(flights, filters = {}) {
  let filteredFlights = flights;
  // Filter by origin
  if (filters.origin) {
    filteredFlights = filteredFlights.filter(each => each.origin.airportId === filters.origin.code);
  }
  // by destination
  if (filters.destination) {
    filteredFlights = filteredFlights
      .filter(each => each.destination.airportId === filters.destination.code);
  }
  // by departure date for forward flights
  /* Uncomment this code to enable filter by departure date
  if (filters.departureDate && filters.trip === 'forward') {
    dpDate = getDatefromISODate(filters.departureDate);
    filteredFlights = filteredFlights.filter((each) => {
      const flDate = getDatefromISODate(each.origin.departure);
      return (flDate === dpDate);
    });
  }
  */

  // by return date for return flights
  /* Uncomment this code to enable filter by return date
  if (filters.returnDate && filters.trip === 'return') {
    rtDate = getDatefromISODate(filters.returnDate);
    filteredFlights = filteredFlights.filter((each) => {
      const flDate = getDatefromISODate(each.origin.departure);
      return (flDate === rtDate);
    });
  }
  */
  return filteredFlights;
}

class MockDB {
  constructor(flights, airports) {
    this.document = { flights, airports };
  }

  getFlights(filters) {
    if ((!filters) || (!Object.keys(filters).length)) {
      return this.document.flights;
    }
    return filterFlights(this.document.flights, filters);
  }

  getAirports() {
    return this.document.airports;
  }
}

const dbInstance = new MockDB(flightRecords, airportRecords);
export default dbInstance;
