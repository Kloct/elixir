import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ChangeLog from './layouts/ChangeLog';
import Home from './layouts/Home';
import ItemsDB from './layouts/ItemsDB';
import NavBar from './components/navBar';
import Items from './layouts/Items';
import Market from './layouts/Market';

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
          <Route exact path="/itemsDB" component={ItemsDB} />
          <Route exact path="/changelog" component={ChangeLog} />
        </div>
      </Router>
    );
  }
}

export default App;
