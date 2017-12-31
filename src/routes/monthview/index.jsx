import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import Month from '../../components/month';
import MonthHeading from '../../components/month-heading';

import style from './style.css';

export default function (props) {
		const params = props.match.params;
		return (
			<div id={style.monthPageContainer}>
				{props.days && props.days.length > 0 && <MonthHeading firstDay={props.days[0]} lastDay={props.days[props.days.length - 1]}/> }
				{ props.days && props.days.length > 0 && <Month days={props.days} onPrev={props.onPrev} onNext={props.onNext}/> }
			</div>
		);
}
