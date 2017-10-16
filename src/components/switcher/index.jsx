import { h, Component } from 'preact';

import style from './style.css';

export default class Switcher extends Component {
	render() {
		return (
			<div id={style.switcher}>
          <a href="#"><i class="fa fa-calendar-o"></i></a>
          <a href="#"><i class="fa fa-calendar"></i></a>
			</div>
		);
	}
}
