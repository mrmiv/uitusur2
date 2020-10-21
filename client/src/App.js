import React, { PureComponent } from 'react'
import './App.scss'

import UserRoutes from './routes/UserRoutes'
import store from './store';
import { loaduser } from './redux/actions/authActions';
import { getActiveParams } from './redux/actions/data_actions/paramActions';
import { SetDomainLocation } from './redux/actions/locationActions';

export default class App extends PureComponent {

  componentDidMount() {
    store.dispatch(loaduser())
    store.dispatch(getActiveParams())
    store.dispatch(SetDomainLocation(document.domain))
  }

  render() {
    return <UserRoutes />
  }
}