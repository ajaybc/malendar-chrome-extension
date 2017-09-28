import { h, Component } from 'preact';
import Day from '../../components/day';

export default class DayView extends Component {
	render() {
		return (
			<div id="day-page-container">
				<Day/>
			</div>
		);
	}
}
