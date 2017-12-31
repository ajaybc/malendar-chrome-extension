import { h, Component } from 'preact';
import classNames from 'classnames';

import style from './style.css';

export default function (props) {
  const day = props.day;
  return <div class={classNames(style.monthDayContainer, {[style.borderRight]: day.gregorian.day !== 6, [style.holiday]: day.isHoliday})}>
    <h1 class={classNames(style.gregDate, 'english')}>{day.gregorian.date}</h1>
    <div class={style.monthDayBottom}>
      <div class={classNames(style.monthDayBottomLeft, 'english')}>{day.malayalam.date}</div>
      <div class={style.monthDayBottomRight}>{day.malayalam.nakshatram}</div>
    </div>
    {
      (day.specialities && day.specialities.length > 0) && <div class={style.monthDaySpeciality}>{day.specialities[0]}</div>
    }
  </div>
}