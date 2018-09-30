import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const DATE_DISPLAY_FORMAT = 'Do MMM YYYY';

class SearchDetails extends Component {

  formatDateForDisplay = (dtStr) => {
    return moment(dtStr, moment.ISO_8601).format(DATE_DISPLAY_FORMAT);
  }

  render() {
    const { details } = this.props;
    const { origin, destination, departureDate, returnDate, type } = details;
    if (Object.keys(details).length === 0) {
      return <p className="awesome-text">Hit search to get started with the most awesome flight search engine!</p>;
    }
    return (
      <section className="search-details">
        <div className="path">
          <p>{origin.city} &gt; {destination.city}
          { type === 'return' && `> ${origin.city}`}</p>
        </div>
        <div className="dates">
          <p>Depart: {this.formatDateForDisplay(departureDate)}</p>
          {returnDate && <p>Return: {this.formatDateForDisplay(returnDate)}</p>}
        </div>
      </section>
    );
  }
}

SearchDetails.propTypes = {
  details: PropTypes.shape({
    origin: PropTypes.shape({
      code: PropTypes.string,
      city: PropTypes.string,
      name: PropTypes.string,
    }),
    destination: PropTypes.shape({
      code: PropTypes.string,
      city: PropTypes.string,
      name: PropTypes.string,
    }),
    departureDate: PropTypes.string,
    returnDate: PropTypes.string,
    passengers: PropTypes.number,
    type: PropTypes.string,
  }),
}

SearchDetails.defaultProps = {
  details: {},
}

export default SearchDetails;
