import React, { Component } from 'react';

import classNames from 'classnames';

import Apps from '../apps';
import style from './style.module.css';
import fontAwesome from '../../style/font-awesome.module.css';

export default class Header extends Component {
	render() {
		return (
			<header className="clearfix english">
				<button id={style.appBtn} className={style.dropdownContainer}>
					<div className={style.label}><i className={classNames(fontAwesome.fa, fontAwesome['fa-bars'])}/> Apps</div>
					<div className={style.dropdown}>
						<Apps></Apps>
					</div>
				</button>
			</header>
		);
	}
}