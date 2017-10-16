import { h, Component } from 'preact';

import style from './style.css'
export default class Day extends Component {
	render() {
		return (
			<div id={style.container}>
        <a href="#" id={style.prevBtn}>
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
        </a>
				<div id={style.flipper}>
          <div id={style.front}>
            <div id={style.heading}>സെപ്റ്റംബർ</div>
            <div id={style.dateWrap}>
              <div id={style.eDate}>28</div>
              <div id={style.mday}>വ്യാഴം</div>
              <div id={style.special}>Nothing special</div>
            </div>
            <div id={style.bottom}>
              <div id={style.bottomLeft}>12</div>
              <div id={style.bottomMiddle}>
                <div id={style.mMonth}>കന്നി </div>
                <div id={style.nakshathra}>മൂലം</div>
              </div>
              <div id={style.bottomRight}></div>
            </div>
          </div>
          <div id="day-back"></div>
        </div>
        <a href="#" id={style.nextBtn}>
          <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </a>
			</div>
		);
  }
}