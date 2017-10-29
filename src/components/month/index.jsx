import { h, Component } from 'preact';

import malayalamDayNames from '../../constants/mlDays';
import malayalamMonthNames from '../../constants/mlMonths';

import Day from './day';
import style from './style.css';

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
    return (<tr>
      {
        malayalamDayNames.map((d) => {
          return <th>{d}</th>;
        })
      }
    </tr>);
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
    const weeks = [];
    const weekCount = Math.ceil(this.state.paddedDays.length / 7);
    for (let i = 0; i < weekCount; i++) {
      weeks.push(this.renderWeek(i));
    }
    console.log(weeks);
    return weeks;
  }

	render(props) {
    const { days } = props;
		return (
			<div id={style.container}>
        <a href="#" id={style.prevBtn} onClick={(e) => {e.preventDefault(); props.onPrev(day);}} >
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
        </a>
        <div id={style.monthContainer}>
          <table>
            { this.renderWeekDayTitles() }
            { this.renderMonth() }
          </table>
        </div>
        <a href="#" id={style.nextBtn} onClick={(e) => {e.preventDefault(); props.onNext(day);}}>
          <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </a>
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