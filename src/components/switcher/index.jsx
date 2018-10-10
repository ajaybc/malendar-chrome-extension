import React from 'react';
import classNames from 'classnames';

import fontAwesome from '../../style/font-awesome.module.css';
import style from './style.module.css';

export default function (props) {
	return (
		<div id={style.switcher}>
			<button onClick={(e) => { e.preventDefault(); props.onSwitch('day') }} className={classNames({ [style.active]: (props.viewMode === 'day') })}><i className={classNames(fontAwesome.fa, fontAwesome['fa-calendar-o'])}></i></button>
			<button onClick={(e) => { e.preventDefault(); props.onSwitch('month') }} className={classNames({ [style.active]: (props.viewMode === 'month') })}><i className={classNames(fontAwesome.fa, fontAwesome['fa-calendar'])}></i></button>
		</div>
	);
}
