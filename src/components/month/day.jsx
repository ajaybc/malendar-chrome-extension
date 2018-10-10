import React from 'react';
import classNames from 'classnames';

import style from './style.module.css';

export default function (props) {
  const day = props.day;
  return <div className={classNames(style.monthDayContainer, {[style.borderRight]: day.gregorian.day !== 6, [style.holiday]: day.isHoliday})}>
    <h1 className={classNames(style.gregDate, 'english')}>{day.gregorian.date}</h1>
    <div className={style.monthDayBottom}>
      <div className={classNames(style.monthDayBottomLeft, 'english')}>{day.malayalam.date}</div>
      <div className={style.monthDayBottomRight}>{day.malayalam.nakshatram}</div>
    </div>
    {
      (day.specialities && day.specialities.length > 0) && <div className={style.monthDaySpeciality}>{day.specialities[0]}</div>
    }
    {
      (props.activeDay) && <div className={style.activeDay} title="Today"></div>
    }
  </div>
}