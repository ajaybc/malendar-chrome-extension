import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import style from './style.module.css';

import NewsScroller from '../newsscroller';

import * as NewsActions from '../../actioncreators/news';

class Footer extends Component {
	state = {};

	componentWillMount() {
		this.props.actions.fetchNews();
	}

	showNewsDescription = (description) => {
		this.setState({
			newsDescription : description
		});
	}

	hideNewsDescription = (description) => {
		this.setState({
			newsDescription: null
		});
	}

	render() {
		const {props, state} = this;
		return (
			<footer>
				{state.newsDescription && <div id={style.newsDescription}>{state.newsDescription}</div>}
				<div id={style.newsContainer}>
					<div id={style.newsLeft}>വാർത്തകൾ</div>
					{
						(props.news) && <NewsScroller news={props.news} showNewsDescription={this.showNewsDescription} hideNewsDescription={this.hideNewsDescription}/>
					}
				</div>
			</footer>
		);
	}
}

const mapStateToProps = state => ({
  news: state.news
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(NewsActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);

//export default Footer;
