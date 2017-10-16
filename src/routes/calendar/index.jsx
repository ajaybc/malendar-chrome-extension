import { h, Component } from 'preact';
import moment from 'moment';
import {
  Route,
  Redirect,
} from 'react-router-dom';

import style from './style.css';

import DayView from '../dayview';

class Calendar extends Component {
  componentWillMount() {
    
  }
  renderRoute(props) {
    //TODO: Add to logic to go either to either day view or month view
    const today = moment();
    return <Redirect to={`/day/${today.year()}/${today.month()}/${today.date()}`} />
  }
	render(props) {
		return (
      <div id={style.calendarContainer}>
        <Route exact path={props.match.url} render={this.renderRoute} />
        <Route exact path={`${props.match.url}day/:year/:month/:day`} component={DayView} />
      </div>
		);
	}
}

export default Calendar;
