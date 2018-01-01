import { h, Component } from 'preact';

import classNames from 'classnames';

import Apps from '../apps';
import style from './style.css';
import fontAwesome from '../../style/font-awesome.css';

export default class Header extends Component {
	render() {
		return (
			<header class="clearfix english">
				<a id={style.appBtn} class={style.dropdownContainer}>
					<div class={style.label}><i class={classNames(fontAwesome.fa, fontAwesome['fa-bars'])}/> Apps</div>
					<div class={style.dropdown}>
						<Apps></Apps>
					</div>
				</a>
			</header>
		);
	}
}