/* global chrome */
import React, { Component } from 'react';

import { SUCCESS } from '../../constants/loading-status';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as AppActions from '../../actioncreators/apps';
import style from './style.module.css';

class Apps extends Component {
  componentWillMount() {
    this.props.actions.fetchApps();
  }

  launchApp = (id) => {
    chrome.management.launchApp(id);
  }

  render () {
    const { props } = this;
    return <div id={style.container} className="english">
      {
        props.apps.status === SUCCESS && props.apps.data.map((item) => {
          return <div className={style.block} onClick={() => this.launchApp(item.id)}>
            <img alt={`${item.name} icon`} src={item.icons[item.icons.length - 1].url}/>
            <div className={style.label}>{item.name}</div>
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