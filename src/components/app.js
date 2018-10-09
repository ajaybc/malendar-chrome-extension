import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import reset from '../style/reset.css';
import style from './app.module.css';

import Header from './header';
import Footer from './footer';
import Calendar from '../routes/calendar';
import DayView from '../routes/dayview';

import reducer from '../reducers';

const store = createStore(reducer, applyMiddleware(thunk))

export default class App extends Component {
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<Provider store={store}>
				<div id={style.app}>
					<Header />
					<Router>
						<Route path="/" component={ Calendar }/>
					</Router>
					<Footer />
				</div>
			</Provider>
		);
	}
}
