import { h, Component } from 'preact';
import { NEWS_ITEM_HEIGHT } from '../../constants/config';

import style from './style.css';

function gotoURL(url) {
  window.location.href = url;
}

export default class NewsScroller extends Component {
  constructor() {
    super();
    this.state = { step: 0 };
  }

  componentDidMount() {
    this.startScrolling();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startScrolling = () => {
    this.interval = setInterval(() => { this.scrollNews() }, 3000);
  }
  
  pauseScrolling = e => {
    if (this.interval) {
      clearInterval(this.interval);
    }
  };

  scrollNews(mode = 'up', e) {
    if (e) {
      e.preventDefault();
    }
    const maxSteps = (this.scroller.clientHeight / NEWS_ITEM_HEIGHT) - 1;
    const step = this.state.step;
    if (mode === 'up') {
      if (step < maxSteps) {
        this.setState((state, props) => { step : state.step++ });
      } else {
        this.setState({ step: 0 });
      }
    } else {
      if (step > 0) {
        this.setState((state, props) => { step : state.step-- });
      } else {
        this.setState({ step: (maxSteps - 1) });
      }
    }
  }

	render(props, state) {
		return (
			<div id={style.newScrollerContainer}>
        <div id={style.newsScrollerInner}>
          <ul id={style.newsUl} class="clearfix" ref={(scroller) => { this.scroller = scroller; }} style={{'margin-top': (state.step * NEWS_ITEM_HEIGHT * -1) + 'px'}}>
            {
              props.news.map((item) => {
                return <li class={style.newsLi}>
                  <button onClick={() => gotoURL(item.link)} onMouseEnter={this.pauseScrolling} onMouseLeave={this.startScrolling}>{item.title}</button>
                </li>
              })
            }
          </ul>
        </div>
        {
          props.news && props.news.length > 0 &&
          <div id={style.newsControlsContainer}>
            <button onClick={(e) => { this.scrollNews('up', e) }} onMouseEnter={this.pauseScrolling} onMouseLeave={this.startScrolling}><i class="fa fa-chevron-up" aria-hidden="true"></i></button>
            <button onClick={(e) => { this.scrollNews('down', e) }} onMouseEnter={this.pauseScrolling} onMouseLeave={this.startScrolling}><i class="fa fa-chevron-down" aria-hidden="true"></i></button>
          </div>
        }
      </div>
		);
	}
}