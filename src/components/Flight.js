import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class Flight extends Component {
  parseTime(dtStr) {
    return moment(dtStr, moment.ISO_8601).format('DD-MM-YYYY hh:mm:ss A')
  }
  render() {
    const { details } = this.props;
    const { price, origin, destination } = details;
    const arrivalTime = this.parseTime(destination.arrival);
    const departureTime = this.parseTime(origin.departure);
    return (
      <div className="flight">
        {/* details */}
        <div className="fl-details">
          <div className="fl-price">
            <p className="price">{`${price.currencySymbol} ${price.value}`}</p>
          </div>
          <div className="timings">
            <div className="toward">
              <p>{details.flId}, {details.airlineName}</p>
              <p>{origin.airportId} &gt; {destination.airportId}</p>
              <p>Departure: {departureTime}</p>
              <p>Arrival: {arrivalTime}</p>
            </div>
          </div>
        </div>
        {/* details */}
        {/* logo */}
        <div className="fl-logo">
          <div className="fl-logo-container">
            <div className="img-area">
              <img src="assets/flight_logo_default.png" alt="Flight Logo" />
            </div>
            <div className="btn-area">
              <button className="btn btn-block btn-rounded">Book this flight</button>
            </div>
          </div>
        </div>
        {/* details */}
      </div>
    );
  } 
}

Flight.propTypes = {
  details: PropTypes.shape({
    id: PropTypes.number.isRequired,
    flId: PropTypes.string.isRequired,
    airlineName: PropTypes.string.isRequired,
    price: PropTypes.shape({
      value: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      currencySymbol: PropTypes.string.isRequired,
    }),
    origin: PropTypes.shape({
      airportId: PropTypes.string.isRequired,
      departure: PropTypes.string.isRequired,
    }),
    destination: PropTypes.shape({
      airportId: PropTypes.string.isRequired,
      arrival: PropTypes.string.isRequired,
    }),
  }),
}

export default Flight;
