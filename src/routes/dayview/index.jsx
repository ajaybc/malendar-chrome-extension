import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import Day from '../../components/day';

class DayView extends Component {
  componentWillMount() {
	}
	render (props) {
		const params = props.match.params;
		console.log(props);
		return (
			<div id="day-page-container">
				{ props.day && <Day day={props.day} onPrev={props.onPrev} onNext={props.onNext}/> }
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
