import React from 'react';
import classNames from 'classnames';

import WeatherIcon from '../weather-icon';
import fontAwesome from '../../style/font-awesome.module.css';

import malayalamDayNames from '../../constants/ml-days';
import malayalamMonthNames from '../../constants/ml-months';

import { LOADING, SUCCESS, ERROR } from '../../constants/loading-status';

import leftPad from 'left-pad';

import style from './style.module.css';

function isToday(day) {
  const today = new Date();
  return today.getDate() === day.gregorian.date && (today.getMonth() + 1) === day.gregorian.month && today.getFullYear() === day.gregorian.year;
}

export default function Day(props) {
  const day = props.day;
  return (
    <div id={style.container}>
      <button id={style.prevBtn} onClick={(e) => {e.preventDefault(); props.onPrev(day);}} >
        <i className={classNames(fontAwesome.fa, fontAwesome['fa-chevron-left'])} aria-hidden="true"></i>
      </button>
      <div id={style.flipper}>
        <div id={style.front}>
          <div id={style.heading}>{malayalamMonthNames[day.gregorian.month - 1]}</div>
          <div id={style.dateWrap}>
            <div id={style.eDate} className={classNames({[style.holiday]: day.isHoliday}, 'english')}>{day.gregorian.date}</div>
            <div id={style.mday}>{malayalamDayNames[day.gregorian.day]}</div>
            {
              (day.specialities.length > 0) && <div id={style.special}>{day.specialities[0]}</div>
            }
            {
              (isToday(day)) && <div id={style.activeDay} title="Today"></div>
            }
          </div>
          <div id={style.bottom}>
            <div id={style.bottomLeft} className="english">{leftPad(day.malayalam.date, 2, '0')}</div>
            <div id={style.bottomMiddle}>
              <div id={style.mMonth}>{day.malayalam.masam} </div>
              <div id={style.nakshathra}>{day.malayalam.nakshatram}</div>
            </div>
            <div id={style.bottomRight} className="english">
              {props.weather.status === SUCCESS && <div title={props.weather.data.condition.text}><WeatherIcon code={props.weather.data.condition.code} /><div>{props.weather.data.condition.temp}°</div></div>}
              {props.weather.status === LOADING && <div id={style.loading}><i className={classNames(fontAwesome.fa, fontAwesome['fa-refresh'], fontAwesome['fa-spin'])} aria-hidden="true"></i></div>}
            </div>
          </div>
        </div>
        <div id="day-back"></div>
      </div>
      <button id={style.nextBtn} onClick={(e) => {e.preventDefault(); props.onNext(day);}}>
        <i className={classNames(fontAwesome.fa, fontAwesome['fa-chevron-right'])} aria-hidden="true"></i>
      </button>
    </div>
  );
}