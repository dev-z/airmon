import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Flight from './Flight';

class Flights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flightsAvailable: [],
    }
  }

  render() {
    const { flightsAvailable, sort, refine, isPristine } = this.props;
    // Make a copy to prevent mutation
    let flights = JSON.parse(JSON.stringify(flightsAvailable));
    if (sort && sort.price && flights.length) {
      if (sort.price === 'asc') {
        flights.sort((a, b) => (a.price.value - b.price.value));
      } else if (sort.price === 'desc') {
        flights.sort((a, b) => (b.price.value - a.price.value));
      }
    }
    if (refine && flights.length) {
      if (refine.priceLow) {
        flights = flights.filter(each => each.price.value >= refine.priceLow);
      }
      if (refine.priceHigh) {
        flights = flights.filter(each => each.price.value <= refine.priceHigh);
      }
    } 
    let content = (
      <section className="flights">
        <p className="awesome-text">{"No flights found :("}</p>
      </section>
    );
    if (isPristine) {
      content = null;
    }
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
}

Flights.defaultProps = {
  flightsAvailable: [],
  sort: {},
  refine: {},
  isPristine: false,
}

export default Flights;
