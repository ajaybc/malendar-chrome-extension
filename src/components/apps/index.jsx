import { h, Component } from 'preact';

import { LOADING, SUCCESS } from '../../constants/loading-status';

import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import classNames from 'classnames';

import * as AppActions from '../../actioncreators/apps';
import style from './style.css';

class Apps extends Component {
  componentWillMount() {
    this.props.actions.fetchApps();
  }

  launchApp = (id) => {
    chrome.management.launchApp(id);
  }

  render (props) {
    return <div id={style.container} class="english">
      {
        props.apps.status === SUCCESS && props.apps.data.map((item) => {
          return <div class={style.block} onClick={() => this.launchApp(item.id)}>
            <img src={item.icons[item.icons.length - 1].url}/>
            <div class={style.label}>{item.name}</div>
          </div>
        })
      }
      {
        props.apps.status === SUCCESS && props.apps.data.length === 0  && 
          <div id={style.noData}>No Apps Installed</div>
      }
    </div>
  }
}

const mapStateToProps = state => ({
  apps: state.apps,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...AppActions }, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Apps);