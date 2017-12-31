import { h, Component } from 'preact';
import classNames from 'classnames';

import fontAwesome from '../../style/font-awesome.css';
import style from './style.css';

export default function (props) {
	return (
		<div id={style.switcher}>
			<a href="#" onClick={(e) => { e.preventDefault(); props.onSwitch('day') }} className={classNames({ [style.active]: (props.viewMode === 'day') })}><i class={classNames(fontAwesome.fa, fontAwesome['fa-calendar-o'])}></i></a>
			<a href="#" onClick={(e) => { e.preventDefault(); props.onSwitch('month') }} className={classNames({ [style.active]: (props.viewMode === 'month') })}><i class={classNames(fontAwesome.fa, fontAwesome['fa-calendar'])}></i></a>
		</div>
	);
}
