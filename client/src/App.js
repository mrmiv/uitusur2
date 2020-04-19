// Основная разметка для стандартных страниц
import React, { Component } from 'react'
// import {Route, Switch, Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
import './App.scss'

import UserRoutes from './routes/UserRoutes'
// import AdminRoutes from './routes/AdminRoutes'

export class App extends Component {

  render(){
    return <UserRoutes/>
  }
}

export default connect(
  null,
  null
)(App)