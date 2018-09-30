// Core imports
import React, { Component } from 'react';
import './styles/App.css';
// Custom components
import Header from './components/Header';
import SideNav from './components/Sidenav';
import SearchDetails from './components/SearchDetails';
import Flights from './components/Flights';
import Footer from './components/Footer';

// Mock a DB
import dbInstance from './utils/mockdb';

// Fetch all airports data
const airportsAvailable = dbInstance.getAirports();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPristine: true,
      flightsForward: [],
      flightsReturn: [],
      filters: {},
      sort: {
        price: 'asc',
      },
      refine: {},
    };
  }

  /**
   * Executes when usere clicks on the search button and all inputs are valid.
   * @param {Object} filters
   */
  onSearch = (filters = {}) => {
    // Make a copy of filters input to avoid mutating data
    const forwardFilters = JSON.parse(JSON.stringify(filters));
    forwardFilters.trip = 'forward';
    const flightsForward = dbInstance.getFlights(forwardFilters);
    let flightsReturn = [];
    if (filters.type === 'return') {
      // Just interchange the origin and destination values
      const returnFilters = {
        origin: filters.destination,
        destination: filters.origin,
        departureDate: filters.departureDate,
        returnDate: filters.returnDate,
        passengers: filters.passengers,
        type: filters.type,
        trip: 'return',
      };
      flightsReturn = dbInstance.getFlights(returnFilters);
    }

    this.setState({
      filters,
      flightsForward,
      flightsReturn,
      isPristine: false,
    });
  }

  /**
   * Executes when user selects an option from "Sort by price" dropdown.
   */
  onSort = (name, value) => {
    this.setState((prevState) => {
      const s = { ...prevState.sort };
      s[name] = value;
      return { sort: s };
    });
  }

  /**
   * Executes when user adjusts the price refining sliders
   */
  onPriceRefine = (name, value) => {
    this.setState((prevState) => {
      const oldRefine = { ...prevState.refine };
      oldRefine[name] = value;
      return { refine: oldRefine };
    });
  }

  render() {
    const {
      filters,
      flightsForward,
      flightsReturn,
      sort,
      refine,
      isPristine,
    } = this.state;
    return (
      <div className="App">
        <Header />
        {/* main */}
        <section className="main">
          <SideNav
            airports={airportsAvailable}
            onSearch={this.onSearch}
            onSort={this.onSort}
            onPriceRefine={this.onPriceRefine}
          />
          {/* content-area */}
          <section className="content-area">
            <SearchDetails details={filters} />
            <div className="flights-display">
              <Flights
                flightsAvailable={flightsForward}
                sort={sort}
                refine={refine}
                isPristine={isPristine}
              />
              {filters.type === 'return' && <Flights flightsAvailable={flightsReturn} sort={sort} refine={refine} isPristine={isPristine} />
              }
            </div>
          </section>
          {/* ./content-area */}
        </section>
        {/* ./main */}
        <Footer />
      </div>
    );
  }
}

export default App;
