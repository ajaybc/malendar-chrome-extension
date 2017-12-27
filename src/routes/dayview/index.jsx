import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import Day from '../../components/day';
import WeatherBar from '../../components/weather-bar';

class DayView extends Component {
  componentWillMount() {
	}
	render (props) {
		const params = props.match.params;
		return (
			<div id="day-page-container">
				{ props.day && <Day day={props.day} onPrev={props.onPrev} onNext={props.onNext} weather={props.weather}/> }
				{ props.weather && <WeatherBar weather={props.weather} settings={props.settings} onWeatherCityChange={props.onWeatherCityChange}/> }
			</div>
		);
	}
}

export default DayView;
