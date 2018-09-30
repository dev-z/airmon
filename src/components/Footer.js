import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer>
        <p>
          PLEASE NOTE:<br/>
          1. Due to lack of flight data, search by date has not been implemented as it was not possible for 
          me to generate JSON data for specific dates or a range of dates for which the user might want to search. You 
          can enable it by uncommenting the commented code in src/utils/mockdb.js.<br/>
          2. The dates displayed on the tickets are old because of the data used and may not reflect the date selected by the user.
        </p>
      </footer>
    );
  }
}

export default Footer;