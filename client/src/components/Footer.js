import React, { Component } from 'react'
import './styles/Footer.scss'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faCogs } from '@fortawesome/free-solid-svg-icons'

export default class Footer extends Component {

  componentDidMount(){

    const fullHeight = window.outerHeight

    const footerElement = document.getElementById("footer")

    const footerHeight = footerElement.offsetHeight
    const footerOffsetTop = footerElement.offsetTop

    const freeSpace = fullHeight - footerHeight

    if(footerOffsetTop < freeSpace - 60){
      footerElement.style.marginTop=`${freeSpace-footerOffsetTop}px`
    }

  }
  
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
                  <li className="list-item main">
                    <Link to="/news">Новости</Link>
                  </li>
                  <li className="list-item">
                    <Link to="/news/announcements">Объявления кафедры</Link>
                  </li>
                  <li className="list-item">
                    <Link to="/news/conference">Конференции</Link>
                  </li>
                  <li className="list-item">
                    <Link to="/news/grants">Стипендии и гранты</Link>
                  </li>
                  <li className="list-item main">
                    <Link to="/about">О кафедре</Link>
                  </li>
                  <li className="list-item">
                    <Link to={{
                      pathname: "/about",
                      state: "staff"
                    }} >Сотрудники кафедры</Link>
                  </li>
                  <li className="list-item">
                    <Link to={{
                      pathname: "/about",
                      state: "#CMK"
                    }} >СМК</Link>
                  </li>
                </ul>
                <ul className="list_footer_nav">
                  <li className="list-item">
                    <Link to="/abiturient">Абитуриенту</Link>
                  </li>
                  <li className="list-item">
                    <Link to="/abiturient-mag">Магистратура ФИТ</Link>
                  </li>
                  <li className="list-item main">
                    <Link to="/student">Обучающимся</Link>
                  </li>
                  <li className="list-item">
                    <Link to="/student/bakalavriat">Бакалавриат</Link>
                  </li>
                  <li className="list-item">
                    <Link to="/student/magistratura">Магистратура</Link>
                  </li>
                  <li className="list-item main">
                    <Link to="/documents">Регламентирующие документы</Link>
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
                  <br />
                  (корпус ФЭТ), ауд. 403
                  <br />
                  <span>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={'https://2gis.ru/tomsk/firm/423196012851647/84.963892%2C56.451085'}>смотреть на карте</a>
                  </span>
                </p>
                <p>
                  Email:
                  <i className="email"><a href="mailto:kov@2i.tusur.ru">kov@2i.tusur.ru</a></i>
                  <br />
                  Тел.: <a href="tel:+73822701738">(3822) 70-17-38</a>
                </p>
                <p>
                  Часы приема студентов: с 09:00 до 12:00
                  <br />
                  Выходные: суббота, воскресенье
                </p>
                <span className="cogs-info"><i><Icon icon={faCogs} size="md" /></i></span>
              </div>
            </div>
            <div className="other_info">
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <a target="_blank" rel="noopener noreferrer" href={'http://tusur.ru'}>
                  <img src="/svg/TUSUR.svg" alt="ТУСУР" />
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