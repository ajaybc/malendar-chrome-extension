import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import Month from '../../components/month';

class MonthView extends Component {
  componentWillMount() {
	}
	render (props) {
		const params = props.match.params;
		return (
			<div id="month-page-container">
				{ props.days && props.days.length > 0 && <Month days={props.days} onPrev={props.onPrev} onNext={props.onNext}/> }
			</div>
		);
	}
}

export default MonthView;

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
