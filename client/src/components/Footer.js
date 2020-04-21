import React, {Component} from 'react'
import './styles/Footer.scss'
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import {faVk, faYoutube, faFacebookF} from '@fortawesome/free-brands-svg-icons'
import {Link} from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { faQuestionCircle, faCogs } from '@fortawesome/free-solid-svg-icons'

export default class Footer extends Component {

  render() {
    return (
      <footer id="footer">
        <div className="container-md container-fluid">
          <div className="row no-gutters align-content-between">
            <div className="footer_nav col-md-8">
              <h4>Карта сайта</h4>
              <div className="row no-gutters row-cols-2 pt-2">
                <ul className="list_footer_nav">
                  <li className="list-item main">
                    <Link to="/">Главная</Link>
                  </li>
                  <li className="list-item main not_active">Новости</li>
                  <li className="list-item">
                    <Link to="/announcements">Объявления кафедры</Link>
                  </li>
                  <li className="list-item">
                    <Link to="/conferences">Конференции</Link>
                  </li>
                  <li className="list-item">
                    <Link to="/grants">Стипендии и гранты</Link>
                  </li>
                  <li className="list-item main">
                    <Link to="/about">О кафедре</Link>
                  </li>
                  <li className="list-item">
                  <HashLink  smooth to={{
                            pathname: "/about",
                            hash: "#staff",
                            state: { fromNavbar: true }
                        }} >Сотрудники кафедры</HashLink>
                  </li>
                  <li className="list-item">
                  <HashLink smooth to={{
                            pathname: "/about",
                            hash: "#CMK",
                            state: { fromNavbar: true }
                        }} >СМК</HashLink>
                  </li>
                </ul>
                <ul className="list_footer_nav">
                  <li className="list-item main not_active">Поступающему</li>
                  <li className="list-item">
                    <Link to="/degree/bak">Абитуриенту</Link>
                  </li>
                  <li className="list-item">
                    <Link to="/degree/mag">Магистратура ФИТ</Link>
                  </li>
                  <li className="list-item main">
                    <Link to="/student">Обучающимся</Link>
                  </li>
                  <li className="list-item">
                    <Link to="/student/bak">Бакалавр</Link>
                  </li>
                  <li className="list-item">
                    <Link to="/student/mag">Магистратура</Link>
                  </li>
                  <li className="list-item main">
                    <Link to="/docs">Регламентирующие документы</Link>
                  </li>
                  <li className="list-item main">
                    <Link to="/literature">Литература кафедры</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer_contacts col-md-4 text-right">
              <h4>Контакты</h4>
              <div className="contacts pt-2">
                <p>
                  634050, Томск, ул. Вершинина 74
                  <br/>
                  (корпус ФЭТ), ауд. 403
                  <br/>
                  <span>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={'https://2gis.ru/tomsk/firm/423196012851647/84.963892%2C56.451085'}>смотреть на карте</a>
                  </span>
                </p>
                <p>
                  Email: 
                  <i className="email"> kov@2i.tusur.ru</i>
                  <br/>
                  Тел.: (3822) 70-17-38
                </p>
                <p>
                  Часы приема студентов: с 09:00 до 12:00
                  <br/>
                  Выходные: суббота, воскресенье
                </p>
                <span className="cogs-info"><i><Icon icon={faCogs} size="md" type="button" /></i></span>
              </div>
            </div>
            <div className="other_info">
              <hr/>
              <div className="d-flex justify-content-between align-items-center">
                <a target="_blank" rel="noopener noreferrer" href={'http://tusur.ru'}>
                  <img src="/svg/TUSUR.svg" alt="ТУСУР"/>
                  </a>
                <p className="text-right pl-2">Система менеджмента качества сертифицирована по международному стандарту ISO 9001:2015</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}