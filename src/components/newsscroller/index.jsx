import { h, Component } from 'preact';
import { NEWS_ITEM_HEIGHT } from '../../constants/config';

import style from './style.css';


export default class NewsScroller extends Component {
  constructor() {
    super();
    this.state = { step: 0 };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.scrollNews(), 3000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateText = e => {
    this.setState({ text: e.target.value });
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
                  <a href={item.link}>{item.title}</a>
                </li>
              })
            }
          </ul>
        </div>
        <div id={style.newsControlsContainer}>
          <a href="#" onClick={(e) => { this.scrollNews('up', e) }}><i class="fa fa-chevron-up" aria-hidden="true"></i></a>
          <a href="#" onClick={(e) => { this.scrollNews('down', e) }}><i class="fa fa-chevron-down" aria-hidden="true"></i></a>
        </div>
      </div>
		);
	}
}