import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import store from './store';

import Tablero from './components/Tablero';
import Infinitive from './components/Infinitive';

import './App.css';

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route exact path="/" component={Tablero} />
					<Route exact path="/verb/:infinitive" component={Infinitive} />
				</Switch>
			</Router>
		</Provider>
	);
};

export default App;
