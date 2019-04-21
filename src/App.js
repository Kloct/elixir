import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import BrokerAnalytics from './layouts/BrokerAnalytics';
import Home from './layouts/Home';
import ItemsDB from './layouts/ItemsDB';
import NavBar from './components/navBar';
import { defaults } from 'react-chartjs-2';

defaults.global.defaultFontColor='white';

class App extends Component {

  render() {
    document.body.style.backgroundColor = "#1b1b1e";
    return (
      <Router>
        <div>
          <NavBar />
          <Route exact path="/" component={Home} />
          <Route exact path="/BrokerAnalytics" component={BrokerAnalytics} />
          <Route exact path="/ItemsDB" component={ItemsDB} />
        </div>
      </Router>
    );
  }
}

export default App;
