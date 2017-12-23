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
		console.log('props.weather');
		console.log(props.weather);
		return (
			<div id="day-page-container">
				{ props.day && <Day day={props.day} onPrev={props.onPrev} onNext={props.onNext} condition={props.weather.condition}/> }
				{props.weather.forecast && <WeatherBar forecast={props.weather.forecast}/> }
			</div>
		);
	}
}

export default DayView;

// const mapStateToProps = state => ({
//   days: state.days
// })

// const mapDispatchToProps = dispatch => ({
//     actions: bindActionCreators(CalendarActions, dispatch)
// })

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(DayView);
