import React, { Component } from 'react';
import classNames from 'classnames';

import malayalamDayNames from '../../constants/ml-days';

import Day from './day';
import style from './style.module.css';
import fontAwesome from '../../style/font-awesome.module.css';

export default class Month extends Component {
  componentWillMount() {
    this.setState({
      paddedDays: padDays(this.props.days),
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.days !== this.props.days) {
      this.setState({
        paddedDays: padDays(nextProps.days),
      });
    }
  }

  renderWeekDayTitles = () => {
    return (<div id={style.weekDayTitleContainer}>
      {
        malayalamDayNames.map((d) => {
          return <div className={style.weekDayTitle}>{d}</div>;
        })
      }
    </div>);
  }

  renderDay(day) {
    if (day) {
      return <Day day={day}/>
    } else {
      return <td>&nbsp;</td>
    }
  }

  renderWeek = (weekIndex) => {
    const days = [];
    for (let i = weekIndex * 7; i < ((weekIndex * 7) + 7); i++) {
      days.push(this.renderDay(this.state.paddedDays[i]));
    }
    return (
      <tr>
        { days }
      </tr>
    )
  }

  renderMonth = () => {
    const today = new Date();
    function isToday(day) {
      return today.getDate() === day.gregorian.date && (today.getMonth() + 1) === day.gregorian.month && today.getFullYear() === day.gregorian.year;
    }
    return (
      <div id={style.monthDaysContainer}>
        {
          this.state.paddedDays.map(function (day) {
            return (day) ? <Day key={day.gregorian.date} day={day} activeDay={isToday(day)}/>:<div className={style.emptyDayContainer}></div>
          })
        }
      </div>
    )
  }

	render() {
    const { props } = this;
    const { days } = props;
		return (
			<div id={style.container}>
        <div href="#" id={style.prevBtn} onClick={(e) => { e.preventDefault(); props.onPrev({ month: days[0].gregorian.month, year: days[0].gregorian.year});}} >
          <i className={classNames(fontAwesome.fa, fontAwesome['fa-chevron-left'])} aria-hidden="true"></i>
        </div>
        <div id={style.monthContainer}>
          { this.renderWeekDayTitles() }
          { this.renderMonth() }
        </div>
        <div href="#" id={style.nextBtn} onClick={(e) => { e.preventDefault(); props.onNext({ month: days[0].gregorian.month, year: days[0].gregorian.year }); }} >
          <i className={classNames(fontAwesome.fa, fontAwesome['fa-chevron-right'])} aria-hidden="true"></i>
        </div>
			</div>
		);
  }
}

// Makes adjustments in the days array such that a padding is applied in the front as well as the week count is limited to 
// a maximum of 5. Any remaining days are added to the front padding like in a real physical calendar.
function padDays(days) {
  const firstOfMonth = days[0];
  const lastOfMonth = days[days.length - 1];

  const used = firstOfMonth.gregorian.day + lastOfMonth.gregorian.date;
  const weekCount = Math.ceil(used / 7);
  if (weekCount > 5) {
    // console.log('weekCount', weekCount);
    // console.log('extraDayCount', extraDayCount);
    const extraDayCount = used % 7;
    let padding = [];
    for (let i = extraDayCount; i < firstOfMonth.gregorian.day; i++) {
      padding.push(null);
    }
    return [ ...days.slice(days.length - extraDayCount, days.length), ...padding, ...days.slice(0, days.length - extraDayCount)];
  } else {
    let padding = [];
    for (let i = 0; i < firstOfMonth.gregorian.day; i++) {
      padding.push(null);
    }
    return [ ...padding, ...days ];
  }
}



//Source : https://stackoverflow.com/a/2485172/923109
// function weekCount(year, month_number) {
//   // month_number is in the range 1..12
//   var firstOfMonth = new Date(year, month_number-1, 1);
//   var lastOfMonth = new Date(year, month_number, 0);

//   var used = firstOfMonth.getDay() + lastOfMonth.getDate();

//   return Math.ceil( used / 7);
// }