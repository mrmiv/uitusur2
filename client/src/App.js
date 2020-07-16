// Основная разметка для стандартных страниц
import React, { Component } from 'react'
// import {Route, Switch, Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
import './App.scss'

import UserRoutes from './routes/UserRoutes'
import store from './store';
import { loaduser } from './redux/actions/authActions';
import { getAllParam } from './redux/actions/data_actions/paramActions';
import { SetDomainLocation } from './redux/actions/locationActions';
// import AdminRoutes from './routes/AdminRoutes'

export class App extends Component {

  componentDidMount() {
    store.dispatch(loaduser())
    store.dispatch(getAllParam())
    store.dispatch(SetDomainLocation(document.domain))
  }

  render() {
    return <UserRoutes />
  }
}

export default connect(
  null,
  null
)(App)