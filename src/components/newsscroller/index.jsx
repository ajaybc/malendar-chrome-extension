import React, { Component } from 'react';
import classNames from 'classnames';

import { NEWS_ITEM_HEIGHT, NEWS_SCROLL_TIMER } from '../../constants/config';

import fontAwesome from '../../style/font-awesome.module.css';
import style from './style.module.css';

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
    this.interval = setInterval(() => { this.scrollNews() }, NEWS_SCROLL_TIMER);
  }
  
  pauseScrolling = () => {
    if (this.interval) {
      clearInterval(this.interval);
    }
  };

  handleScroll = (e) => {
    const wheelDelta = e.nativeEvent.wheelDelta;
    if (e.wheelDelta > 0) {
      this.scrollNews('up');
    } else {
      this.scrollNews('down');
    }
  }

  handleMouseEnter = (description) => {
    this.pauseScrolling();
    this.props.showNewsDescription(description);
  }

  handleMouseLeave = () => {
    this.startScrolling();
    this.props.hideNewsDescription();
  }

  scrollNews(mode = 'up', e) {
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

	render() {
    const { props, state } = this;
		return (
			<div id={style.newScrollerContainer}>
        <div id={style.newsScrollerInner} onWheel={this.handleScroll}>
          <ul id={style.newsUl} className="clearfix" ref={(scroller) => { this.scroller = scroller; }} style={{'marginTop': (state.step * NEWS_ITEM_HEIGHT * -1) + 'px'}}>
            {
              props.news.map((item) => {
                return <li key={item.title} className={style.newsLi} onMouseEnter={this.pauseScrolling} onMouseLeave={this.startScrolling}>
                  {/* <button onClick={() => gotoURL(item.link)} onMouseEnter={() => { this.pauseScrolling(); props.showNewsDescription(item.description);}} onMouseLeave={() => {this.startScrolling(); props.hideNewsDescription()}}>&bull; {item.title}</button> */}
                  <button onClick={() => gotoURL(item.link)}>&bull; {item.title}</button>
                </li>
              })
            }
          </ul>
        </div>
        {
          props.news && props.news.length > 0 &&
          <div id={style.newsControlsContainer}>
            <button onClick={(e) => { this.scrollNews('up', e) }} onMouseEnter={this.pauseScrolling} onMouseLeave={this.startScrolling}><i className={classNames(fontAwesome.fa, fontAwesome['fa-chevron-up'])} aria-hidden="true"></i></button>
            <button onClick={(e) => { this.scrollNews('down', e) }} onMouseEnter={this.pauseScrolling} onMouseLeave={this.startScrolling}><i className={classNames(fontAwesome.fa, fontAwesome['fa-chevron-down'])} aria-hidden="true"></i></button>
          </div>
        }
      </div>
		);
	}
}