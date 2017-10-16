import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { Provider, connect } from 'preact-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reset from '../style/reset.css';
import fontAwesome from '../style/font-awesome.css';
import style from '../style/index.css';

import Header from './header';
import Footer from './footer';
import Switcher from './switcher';
import DayView from '../routes/dayview';
import Profile from '../routes/profile';

import reducer from '../reducers';

const store = createStore(reducer, applyMiddleware(thunk))

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<Provider store={store}>
				<div id="app">
					<Header />
					<Router onChange={this.handleRoute}>
						<DayView path="/" />
						<Profile path="/profile/" user="me" />
						<Profile path="/profile/:user" />
					</Router>
					<Switcher/>
					<Footer />
				</div>
			</Provider>
		);
	}
}
