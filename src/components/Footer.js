import React from 'react';

const Footer = () => (
  <footer>
    <p>
      PLEASE NOTE:
      <br />
      1. Due to lack of flight data, search by date has not been implemented as it was&nbsp;
      not possible for me to generate JSON data for specific dates or a range of dates&nbsp;
      for which the user might want to search. You can enable it by uncommenting the&nbsp;
      commented code in src/utils/mockdb.js.
      <br />
      2. The dates displayed on the tickets are old because of the data used and may not&nbsp;
      reflect the date selected by the user.
    </p>
  </footer>
);

export default Footer;
