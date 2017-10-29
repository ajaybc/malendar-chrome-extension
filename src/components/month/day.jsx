import { h, Component } from 'preact';
import classNames from 'classnames';

import style from './style.css';

export default function (props) {
  const day = props.day;
  return <div class={classNames(style.monthDayContainer, {[style.borderRight]: day.gregorian.day !== 6, [style.holiday]: day.isHoliday})}>
    <h1 class={style.gregDate}>{day.gregorian.date}</h1>
    <div class={style.monthDayBottom}>
      <div class={style.monthDayBottomLeft}>{day.malayalam.date}</div>
      <div class={style.monthDayBottomRight}>{day.malayalam.nakshatram}</div>
    </div>
  </div>
}