// Основная разметка для стандартных страниц
import React, { Component } from 'react'
// import {Route, Switch, Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
import './App.scss'

import UserRoutes from './routes/UserRoutes'
import store from './store';
import { loaduser } from './redux/actions/authActions';
// import AdminRoutes from './routes/AdminRoutes'

export class App extends Component {

  componentDidMount(){
    store.dispatch(loaduser)
  }

  render(){
    return <UserRoutes/>
  }
}

export default connect(
  null,
  null
)(App)