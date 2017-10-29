import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import {
  Route,
  Redirect,
} from 'react-router-dom';

import style from './style.css';

import * as CalendarActions from '../../actioncreators/calendar';
import * as SettingsActions from '../../actioncreators/settings';

import DayView from '../dayview';
import Switcher from '../../components/switcher';

class Calendar extends Component {
  // constructor (props) {
  //   super(props);
  //   this.handleViewSwitch = this.handleViewSwitch.bind(this);
  // }
  componentDidMount() {
    const props = this.props;
    const pathName = props.location.pathname;
    const splitPath = pathName.split('/');
    if (splitPath[1] && splitPath[2]) {
      console.log(splitPath[2], splitPath[3]);
      props.actions.fetchMonth(splitPath[2], splitPath[3]);
    }
  }
  componentWillReceiveProps(nextProps, nextState) {
    const oldPathName = this.props.location.pathname;
    const newPathname = nextProps.location.pathname;
    if (oldPathName !== newPathname) {
      //Route Change
      const oldSplitPath = oldPathName.split('/');
      const newSplitPath = newPathname.split('/');
      if (oldSplitPath[3] !== newSplitPath[3]) {
        //Means month changed and we need to fetch the new month
        this.props.actions.fetchMonth(newSplitPath[2], newSplitPath[3]);
      }
    }
  }

  handleViewSwitch = (viewMode) => {
    this.props.actions.switchView(viewMode);
    if (viewMode === 'month') {
      this.props.history.push('/month/2017/10');
    } else {
      this.props.history.push('/day/2017/10/29');
    }
  }

  handlePrevDay = (activeDay) => {
    const d = new Date(activeDay.gregorian.year, activeDay.gregorian.month - 1, activeDay.gregorian.date);
    d.setDate(d.getDate() - 1);
    this.props.history.push(`/day/${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`);
  }

  handleNextDay = (activeDay) => {
    const d = new Date(activeDay.gregorian.year, activeDay.gregorian.month - 1, activeDay.gregorian.date);
    d.setDate(d.getDate() + 1);
    this.props.history.push(`/day/${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`);
  }

  renderRoute(props) {
    //TODO: Add to logic to go either to either day view or month view
    const today = moment();
    return <Redirect to={`/day/${today.year()}/${today.month() + 1}/${today.date()}`} />
  }
	render(props, state) {
    //console.log('props', props);
		return (
      <div id={style.calendarContainer}>
        <Route exact path={props.match.url} render={this.renderRoute} />
        <Route exact path={`${props.match.url}day/:year/:month/:day`} render={(p) => (
          <DayView day={props.month[p.match.params.day - 1]} {...p} onPrev={this.handlePrevDay} onNext={this.handleNextDay}/>
        )} />
        <Switcher viewMode={props.settings.viewMode} onSwitch={this.handleViewSwitch}/>
      </div>
		);
	}
}

const mapStateToProps = state => ({
  month: state.month,
  settings: state.settings,
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...CalendarActions, ...SettingsActions}, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);
