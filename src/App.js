import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './componentes/Home';
import Suscripcion from './componentes/Suscripcion';
import logo from './logo.svg';
import BarraNav from './componentes/BarraNav';
import './App.css';

class App extends Component {

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img  src={logo} className="App-logo" alt="logo" />
          <h1 className="App-vacio">  </h1>
        </header>
        <BarraNav/>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Suscripcion" component={Suscripcion} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;