import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import Day from '../../components/day';

import * as CalendarActions from '../../actioncreators/calendar';

class DayView extends Component {
  componentWillMount() {
		const props = this.props;
		const params = props.match.params;
    props.actions.fetchMonth(params.year, params.month);
	}
	render (props) {
		const params = props.match.params;
		return (
			<div id="day-page-container">
				<Day year={params.year} month={params.month} day={params.day} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
  days: state.days
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(CalendarActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DayView);
