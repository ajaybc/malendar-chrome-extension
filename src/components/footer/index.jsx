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
	render(props) {
		return (
			<footer>
				<div id={style.newsContainer}>
					<div id={style.newsLeft}>വാർത്തകൾ</div>
					{
						(props.news) && <NewsScroller news={props.news}/>
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
