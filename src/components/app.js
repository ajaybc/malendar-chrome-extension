import { h, Component } from 'preact';
// import { Router } from 'preact-router';
import { Provider, connect } from 'preact-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import reset from '../style/reset.css';
import style from '../style/index.css';

import Header from './header';
import Footer from './footer';
import Calendar from '../routes/calendar';
import DayView from '../routes/dayview';

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
