import React, { Component } from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Bank of React!</h1>
{/*
  I am using Link to allow the user to click on it and transfer to another page
*/}
        <Link to="/userProfile">User Profile  </Link>
        <Link to="/Login">Log In  </Link>
        <Link to="/Debits">Debits  </Link>
        <Link to="/Credits">Credits  </Link>
      </div>
    );
  }
}

export default Home;