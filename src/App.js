import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ChangeLog from './pages/ChangeLog';
import Home from './pages/Home';
import NavBar from './components/navBar';
import Items from './pages/Items';
import Market from './pages/Market';
import Sellers from './pages/Sellers';

class App extends Component {

  render() {
    document.body.style.backgroundColor = "#1b1b1e";
    return (
      <Router>
        <div>
          <NavBar />
          <Route exact path="/" component={Home} />
          <Route exact path="/items" component={Items} />
          <Route exact path="/market" component={Market} />
          <Route exact path="/sellers" component={Sellers} />
          <Route exact path="/changelog" component={ChangeLog} />
        </div>
      </Router>
    );
  }
}

export default App;
