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
import * as WeatherActions from '../../actioncreators/weather';

import weatherDistricts from '../../constants/weather-districts';

import DayView from '../dayview';
import MonthView from '../monthview';
import Switcher from '../../components/switcher';

class Calendar extends Component {
  componentWillMount() {
    const props = this.props;
    const pathName = props.location.pathname;
    const splitPath = pathName.split('/');
    //console.log(splitPath);
    if (splitPath[1] && splitPath[2]) {
      //console.log(splitPath[2], splitPath[3]);
      props.actions.fetchMonth(splitPath[2], splitPath[3]);
    }

    this.props.actions.fetchWeather('2295423');
    this.props.actions.loadSettings();
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
    const d = new Date();
    if (viewMode === 'month') {
      this.props.history.push(`/month/${d.getFullYear()}/${d.getMonth() + 1}`);
    } else {
      this.props.history.push(`/day/${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`);
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

  handlePrevMonth = (activeMonth) => {
    const month = ((activeMonth.month - 1) > 0) ? (activeMonth.month - 1): 12;
    const year = (month === 12) ? activeMonth.year - 1 : activeMonth.year;
    this.props.history.push(`/month/${year}/${month}`);
  }

  handleNextMonth = (activeMonth) => {
    const month = ((activeMonth.month + 1) < 13) ? (activeMonth.month + 1) : 1;
    const year = (month === 1) ? activeMonth.year + 1 : activeMonth.year;
    this.props.history.push(`/month/${year}/${month}`);
  }

  handleWeatherCityChange = (settings) => {
    console.log('change', settings);
    this.props.actions.saveSettings(settings);
    this.props.actions.fetchWeather(weatherDistricts[settings.weatherCity].yahooWoeid);
  }

  renderRoute(props) {
    //TODO: Add to logic to go either to either day view or month view
    const today = moment();
    return <Redirect to={`/day/${today.year()}/${today.month() + 1}/${today.date()}`} />
  }
	render(props, state) {
		return (
      <div id={style.calendarContainer}>
        <Route exact path={props.match.url} render={this.renderRoute} />
        <Route exact path={`${props.match.url}day/:year/:month/:day`} render={(p) => {
          return <DayView {...p} 
                  day={props.month[p.match.params.day - 1]} 
                  onPrev={this.handlePrevDay} 
                  onNext={this.handleNextDay} 
                  weather={props.weather} 
                  settings={props.settings} 
                  onWeatherCityChange={this.handleWeatherCityChange}/>
        }} />
        <Route exact path={`${props.match.url}month/:year/:month`} render={(p) => {
          return <MonthView {...p} days={props.month} onPrev={this.handlePrevMonth} onNext={this.handleNextMonth}/>
        }} />
        <Switcher viewMode={props.settings.viewMode} onSwitch={this.handleViewSwitch}/>
      </div>
		);
	}
}

const mapStateToProps = state => ({
  month: state.month,
  settings: state.settings,
  weather: state.weather,
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...CalendarActions, ...SettingsActions, ...WeatherActions}, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);
