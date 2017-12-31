import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import style from './style.css';

import NewsScroller from '../newsscroller';

import * as NewsActions from '../../actioncreators/news';

class Footer extends Component {
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

	render(props) {
		return (
			<footer>
				{this.state.newsDescription && <div id={style.newsDescription}>{this.state.newsDescription}</div>}
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
