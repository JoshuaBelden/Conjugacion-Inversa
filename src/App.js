import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import store from './store';

import ConjugationPractice from './components/ConjugationPractice';
import Verb from './components/Verb';

import './app.scss';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <header className="app-header">
            <h1 className="title">Conjugación Inversa</h1>
            <nav>
              <ul>
                <li>
                  <Link to="/">home</Link>
                </li>
                <li>
                  <Link to="/verb">conjugations</Link>
                </li>
              </ul>
            </nav>
          </header>
          <div className="app-page">
            <Switch>
              <Route exact path="/" component={ConjugationPractice} />
              <Route exact path="/verb" component={Verb} />
              <Route exact path="/verb/:infinitive" component={Verb} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
