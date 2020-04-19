import React, { Component } from 'react'
import {Link, useLocation} from 'react-router-dom'
import store from '../store'
import { closeNavbar } from '../redux/actions/navbarActions'

export default class PageNotFound extends Component{

  componentWillUnmount(){
    store.dispatch(closeNavbar())
  }
  
  render(){
    return(<PageNotFoundFN/>)
  }
}

function PageNotFoundFN(){

  const location = useLocation()

  return(
    <div className="text-center">
        <h3>
          Страницы <code>{location.pathname}</code> не существует 
          <hr/>
        </h3>
        <Link to="/">Вернуться на главную</Link>
      </div>
  )
}