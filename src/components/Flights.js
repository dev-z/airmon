// Core imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Custom components
import Flight from './Flight';

// Class definition
class Flights extends Component {
  render() {
    const {
      flightsAvailable,
      sort,
      refine,
      isPristine,
    } = this.props;
    // Make a copy to prevent mutation.
    let flights = JSON.parse(JSON.stringify(flightsAvailable));
    // Sort by price if sort option is given and flights are available.
    if (sort && sort.price && flights.length) {
      // If sort option is ascending.
      if (sort.price === 'asc') {
        flights.sort((a, b) => (a.price.value - b.price.value));
      // If sort option is descending.
      } else if (sort.price === 'desc') {
        flights.sort((a, b) => (b.price.value - a.price.value));
      }
    }
    // Filter the flights based on the price refine parameters given.
    if (refine && flights.length) {
      if (refine.priceLow) {
        flights = flights.filter(each => each.price.value >= refine.priceLow);
      }
      if (refine.priceHigh) {
        flights = flights.filter(each => each.price.value <= refine.priceHigh);
      }
    }
    // Determine what is to be displayed.
    // By default display no flights found.
    let content = (
      <section className="flights">
        <p className="awesome-text">No flights found :(</p>
      </section>
    );
    // If this is the first time the user is opening the app, display nothing.
    if (isPristine) {
      content = null;
    }
    // If flights are available, display flights.
    if (flightsAvailable && flights.length) {
      const flightsToDisplay = flights.map(each => <Flight details={each} key={each.id} />);
      content = (
        <section className="flights">
          {flightsToDisplay}
        </section>
      );
    }
    return content;
  }
}

Flights.propTypes = {
  flightsAvailable: PropTypes.arrayOf(PropTypes.shape({})),
  sort: PropTypes.shape({
    price: PropTypes.string,
  }),
  refine: PropTypes.shape({
    priceLow: PropTypes.number,
    priceHigh: PropTypes.number,
  }),
  isPristine: PropTypes.bool,
};

Flights.defaultProps = {
  flightsAvailable: [],
  sort: {},
  refine: {},
  isPristine: false,
};

export default Flights;
