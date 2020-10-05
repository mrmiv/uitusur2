import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import store from '../store'
import { closeNavbar } from '../redux/actions/navbarActions'

import pnf from '../pages/img/404_page_not_found.svg'

export default class PageNotFound extends PureComponent {

  componentWillUnmount() {
    store.dispatch(closeNavbar())
  }

  render() {
    return <div className="text-center pt-3">
    <img src={pnf} alt="404" style={{ width: "auto", maxWidth: "100%" }} />
    <h3>
        Упс! Кажется, страница не найдена :(
        <hr />
    </h3>
    <Link to="/" style={{ color: "#B21F66" }}>Вернуться на главную</Link>
  </div>
  }
}