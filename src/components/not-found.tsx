import React from 'react';
import { Link } from 'react-router-dom';
const NotFound: React.FC<{}> = (props) => {
  return (
    <p>
      Can not find the page. Please go to <Link to='/'>home</Link>
    </p>
  );
};

export default NotFound;
