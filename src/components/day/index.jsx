import { h, Component } from 'preact';

import malayalamDayNames from '../../constants/mlDays';
import malayalamMonthNames from '../../constants/mlMonths';

import style from './style.css'
export default class Day extends Component {
	render(props) {
    const day = props.day;
		return (
			<div id={style.container}>
        <a href="#" id={style.prevBtn} onClick={(e) => {e.preventDefault(); props.onPrev(day);}} >
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
        </a>
				<div id={style.flipper}>
          <div id={style.front}>
            <div id={style.heading}>{malayalamMonthNames[day.gregorian.month - 1]}</div>
            <div id={style.dateWrap}>
              <div id={style.eDate} class={style.holiday}>{day.gregorian.date}</div>
              <div id={style.mday}>{malayalamDayNames[day.gregorian.day]}</div>
              {
                (day.specialities.length > 0) && <div id={style.special}>{day.specialities[0]}</div>
              }
            </div>
            <div id={style.bottom}>
              <div id={style.bottomLeft}>{day.malayalam.date}</div>
              <div id={style.bottomMiddle}>
                <div id={style.mMonth}>{day.malayalam.masam} </div>
                <div id={style.nakshathra}>{day.malayalam.nakshatram}</div>
              </div>
              <div id={style.bottomRight}></div>
            </div>
          </div>
          <div id="day-back"></div>
        </div>
        <a href="#" id={style.nextBtn} onClick={(e) => {e.preventDefault(); props.onNext(day);}}>
          <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </a>
			</div>
		);
  }
}