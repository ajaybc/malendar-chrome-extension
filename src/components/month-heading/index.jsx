import React, { Component } from 'react';

import mlMonths from '../../constants/ml-months';
import style from './style.module.css';

export default function (props) {
  console.log(props);
  return <div id={style.monthHeading}>
    <h1 id={style.gregorianMonth}>
      {mlMonths[props.firstDay.gregorian.month - 1]}
    </h1>
    <h3 id={style.malayalamMonth}>
      {`${props.firstDay.malayalam.masam} - ${props.lastDay.malayalam.masam}`}
    </h3>
  </div>
}