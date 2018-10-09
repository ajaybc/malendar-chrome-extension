import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Day from '../../components/day';
import WeatherBar from '../../components/weather-bar';

import style from './style.module.css';

class DayView extends Component {
  componentWillMount() {
	}
	render() {
		const { props } = this;
		const params = props.match.params;
		return (
			<div id={style.dayPageContainer}>
				{ props.day && <Day day={props.day} onPrev={props.onPrev} onNext={props.onNext} weather={props.weather}/> }
				{ props.weather && <WeatherBar weather={props.weather} settings={props.settings} onWeatherCityChange={props.onWeatherCityChange}/> }
			</div>
		);
	}
}

export default DayView;
