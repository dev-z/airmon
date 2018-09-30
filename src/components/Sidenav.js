// Core imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Constants
const DATEPICKER_FORMAT = 'YYYY-MM-DD';

// Class definition
class SideNav extends Component {
  constructor(props) {
    super(props);
    const minDate = moment().format(DATEPICKER_FORMAT);
    this.state = {
      origin: null,
      destination: null,
      departureDate: minDate,
      returnDate: minDate,
      passengers: 1,
      activeTab: 0,
      errors: {},
      minDate,
      priceLow: 0,
      priceHigh: 15000,
    };
  }

  /**
   * Takes in the array of airports object and converts them to a html <options /> node.
   * @param {Array} airports Array of airport data.
   * @returns {Array}
   */
  getAirportsOptions = (airports = []) => airports.map((each) => {
    const codeCity = `${each.code} ${each.city}`;
    return <option value={codeCity} key={each.code} />;
  });

  /**
   * Executes when user given any input.
   */
  handleInputChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  /**
   * Executes when user changes the "sort by price" dropdown.
   */
  handleSort = (event) => {
    const { target } = event;
    const { onSort } = this.props;
    const { value, name } = target;
    onSort(name, value);
  }

  /**
   * Executes when user interacts with the price refining sliders.
   */
  onPriceRefine = (event) => {
    const { target } = event;
    const { onPriceRefine } = this.props;
    const { value, name } = target;
    const val = Number(value);
    this.setState({
      [name]: val,
    });
    onPriceRefine(name, val);
  }

  // Handles the tab selection logic.
  selectTab = (index) => {
    this.setState({ activeTab: index });
  }

  // Generates and returns the classes for the tabs for properly highlighting the active tab.
  getTabClasses = (activeTab) => {
    // Highlight the active tab
    const tabClasses = [
      'tablinks btn btn-l',
      'tablinks btn btn-r',
    ];
    tabClasses[activeTab] += ' active';
    return tabClasses;
  }

  /**
   * Validates the search criteria given by the user.
   * @param {Object} userInputs The inputs given by the user.
   * @returns {Object} error object, if any.
   */
  validate = (userInputs) => {
    const { airports } = this.props;
    const {
      origin,
      destination,
      departureDate,
      returnDate,
      passengers,
      activeTab,
    } = userInputs;
    const airportCodes = airports.map(each => each.code);
    const errors = {};
    // 1. Check origin is one of available airports
    if (origin) {
      const originCode = origin.split(' ')[0];
      if (airportCodes.indexOf(originCode) === -1) {
        errors.origin = 'Invalid value';
      }
    } else {
      errors.origin = 'This field cannot be blank';
    }
    // 2.a Check destination is one of available airports
    // 2.b Check if destination is not equal to origin
    if (destination) {
      const destinationCode = destination.split(' ')[0];
      if (airportCodes.indexOf(destinationCode) === -1) {
        errors.destination = 'Invalid value';
      } else if (origin) {
        const originCode = origin.split(' ')[0];
        if (destinationCode === originCode) {
          errors.destination = 'Destination cannot be same as origin';
        }
      }
    } else {
      errors.destination = 'This field cannot be blank';
    }

    const today = moment();
    // 3. Check if departure date is valid
    const departureDateMoment = moment(departureDate, DATEPICKER_FORMAT);
    if (departureDate && departureDateMoment.isValid()) {
      // Check if date is in past
      const diff = today.diff(departureDate, 'days', true);
      if (diff >= 1) {
        errors.departureDate = 'Departure date cannot be in past';
      }
    } else {
      errors.departureDate = 'Invalid date';
    }
    // 4. Check if return date is valid
    const returnDateMoment = moment(returnDate, DATEPICKER_FORMAT);
    if (activeTab === 1 && returnDate && returnDateMoment.isValid()) {
      // Check if date is in past
      const diff = today.diff(returnDate, 'days', true);
      if (diff >= 1) {
        errors.returnDate = 'Return date cannot be in past';
      }
      // Check if return date is less than departure date
      const diff2 = returnDateMoment.diff(departureDateMoment, 'days', true);
      if (diff2 < 0) {
        errors.returnDate = 'Return date cannot be less than departure date';
      }
    } else if (activeTab === 1) {
      errors.returnDate = 'Invalid date';
    }
    // 5. Check if passengers is valid
    if (passengers <= 0) {
      errors.passengers = 'Passengers cannot be less than 1';
    }
    // iF errors object has field set, return the errors object,
    // otherwise return null.
    if (Object.keys(errors).length) {
      return errors;
    }
    return null;
  }

  /**
   * Executes when the user clicks on search button.
   */
  search = () => {
    const {
      origin,
      destination,
      departureDate,
      returnDate,
      passengers,
      activeTab,
    } = this.state;
    const { onSearch } = this.props;
    // Validate the user input
    const errors = this.validate(this.state);
    // If errors are found on validation,
    if (errors) {
      // set the errors object in state,
      this.setState({ errors });
      return;
    }
    // otherwise, reset the errors object.
    this.setState({ errors: {} });
    const originCode = origin.split(' ')[0];
    const destinationCode = destination.split(' ')[0];
    const filters = {
      origin: this.findAirportByCode(originCode),
      destination: this.findAirportByCode(destinationCode),
      departureDate: this.convertToISOTime(departureDate),
      returnDate: this.convertToISOTime(returnDate),
      passengers,
      type: (activeTab === 1) ? 'return' : 'oneway',
    };
    if (activeTab === 0) {
      filters.returnDate = null;
    }
    onSearch(filters);
  }

  findAirportByCode = (code) => {
    const { airports } = this.props;
    return airports.find(each => each.code === code);
  }

  convertToISOTime = (dtStr) => {
    return moment(dtStr, DATEPICKER_FORMAT).toISOString();
  }

  render() {
    const {
      activeTab,
      errors,
      minDate,
      priceLow,
      priceHigh,
      passengers,
    } = this.state;
    const { airports } = this.props;
    const airportsAvailable = this.getAirportsOptions(airports);
    const tabClasses = this.getTabClasses(activeTab);
    return (
      <nav>
        {/* search-area */}
        <div className="search-area">
          {/* Tab links */}
          <div className="tab">
            <button className={tabClasses[0]} onClick={() => this.selectTab(0)} type="button">One way</button>
            <button className={tabClasses[1]} onClick={() => this.selectTab(1)} type="button">Return</button>
          </div>

          {/* </div> Tab content */}
          <div id="oneway" className="tabcontent">
            <form>
              <label>From:</label>
              <input
                type="text"
                className="form-control"
                name="origin"
                list="origins"
                placeholder="Enter origin city"
                onChange={this.handleInputChange}
              />
              <datalist id="origins">
                {airportsAvailable}
              </datalist>
              {errors.origin && <p className="input-error">{errors.origin}</p>}
              <br />
              <label>To:</label>
              <input
                type="text"
                className="form-control"
                name="destination"
                list="dests"
                placeholder="Enter destination city"
                onChange={this.handleInputChange}
              />
              <datalist id="dests">
                {airportsAvailable}
              </datalist>
              {errors.destination && <p className="input-error">{errors.destination}</p>}
              <br />
              <label>Departure Date:</label>
              <input
                type="date"
                className="form-control"
                name="departureDate"
                placeholder="Departure Date"
                min={minDate}
                defaultValue={minDate}
                onChange={this.handleInputChange}
              />
              {errors.departureDate && <p className="input-error">{errors.departureDate}</p>}
              <br />
              {activeTab === 1 && (
                <div>
                  <label>Return Date:</label>
                  <input
                    type="date"
                    className="form-control"
                    name="returnDate"
                    placeholder="Return Date"
                    min={minDate}
                    defaultValue={minDate}
                    onChange={this.handleInputChange}
                  />
                  {errors.returnDate && <p className="input-error">{errors.returnDate}</p>}
                  <br />
                </div>
              )}
              <label>Number of Passengers:</label>
              <input
                type="number"
                className="form-control"
                name="passengers"
                placeholder="Passengers"
                min="1"
                max="100"
                defaultValue={passengers}
                onChange={this.handleInputChange}
              />
              {errors.passengers && <p className="input-error">{errors.passengers}</p>}
              <br />
              <br />
              <button className="btn btn-rounded btn-block" type="button" onClick={this.search}>Search</button>
            </form>
          </div>
        </div>
        {/* ./search-area */}
        {/* refine-area */}
        <div className="refine-area">
          <label><strong>Refine flight search</strong></label>
          <br />
          <br />
          <label>
            Price lower limit:&nbsp;
            {priceLow}
          </label>
          <input
            type="range"
            className="slider"
            name="priceLow"
            min="0"
            max="15000"
            step="1000"
            defaultValue={0}
            onChange={this.onPriceRefine}
          />
          <label>Price upper limit: {priceHigh}</label>
          <input
            type="range"
            className="slider"
            name="priceHigh"
            min="0"
            max="15000"
            step="1000"
            defaultValue={15000}
            onChange={this.onPriceRefine}
          />
          <label>Sort by price:</label>
          <select className="form-control" name="price" onChange={this.handleSort}>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </nav>
    );
  }
}

SideNav.propTypes = {
  airports: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSearch: PropTypes.func.isRequired,
  onSort: PropTypes.func,
  onPriceRefine: PropTypes.func,
}

SideNav.defaultProps = {
  onSort: () => null,
  onPriceRefine: () => null,
}

export default SideNav;
