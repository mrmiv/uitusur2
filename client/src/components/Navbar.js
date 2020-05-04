import React, { Component } from 'react'
import store from '../store'
import { logout } from '../redux/actions/authActions'
import { NavLink, Switch, Route, Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { closeNavbar } from '../redux/actions/navbarActions'
import './styles/Navbar.scss'
import { connect } from 'react-redux';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faOutdent, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

export class Navbar extends Component {

    CloseNavbar = () => {
        this.props.closeNavbar()
    }

    render() {
        return (
            <div id="sider" className={this.props.open ? "open" : null}>
                <Icon className="close_nav" icon={faOutdent} onClick={this.CloseNavbar} style={{ cursor: "pointer", fontSize: "24px", color: "white" }} />
                <Switch>
                    {this.props.isAuthenticated && <Route path="/admin" component={(() => (<AdminMenu />))} />}
                    <Route path="/" component={(() => (<NavMenu />))} />
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    open: state.nav.open,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps,
    { closeNavbar }
)(Navbar)

function NavMenu() {
    return (
        <div className="menu" id="accordion_navbar">
            <NavLink to="/" className="link" exact>Главная</NavLink>
            {/* НОВОСТИ */}
            <div className="collapse_links d-flex justify-content-between">
                <span className="link d-flex disabled" disabled>Новости</span>
                <a className="open_sub"
                    data-toggle="collapse"
                    data-target="#submenu_news"
                    href="#submenu_news"
                    role="button"
                    aria-expanded="false"
                    aria-controls="submenu_news"> <img src="/svg/arrowDown.svg" alt="Открыть подменю" /> </a>
            </div>
            <div className="submenu collapse" id="submenu_news" data-parent="#accordion_navbar">
                <NavLink className="link" to="/announcements">Объявления кафедры</NavLink>
                <NavLink className="link" to="/grants">Стипендии и гранты</NavLink>
                <NavLink className="link" to="/conferences">Конференции</NavLink>
            </div>
            {/* О КАФЕДРЕ */}
            <div className="collapse_links d-flex justify-content-between">
                <NavLink className="link d-flex"
                    to="/about"
                >   О кафедре
            </NavLink>
                <a
                    className="open_sub"
                    data-toggle="collapse"
                    data-target="#submenu_about"
                    href="#submenu_about"
                    role="button"
                    aria-expanded="false"
                    aria-controls="submenu_about">
                    <img src="/svg/arrowDown.svg" alt="Открыть подменю" />
                </a>
            </div>
            <div className="submenu collapse" id="submenu_about" data-parent="#accordion_navbar">
                <HashLink className="link" smooth to={{
                    pathname: "/about",
                    hash: "staff",
                }}>Сотрудники кафедры</HashLink>
                <HashLink className="link" smooth to={{
                    pathname: "/about",
                    hash: "CMK",
                }} >СМК</HashLink>
                {/*                         
                <HashLink className="link" to="/about#staff">Сотрудники кафедры</HashLink>
                <HashLink className="link" to="/about#CMK">СМК</HashLink> */}
            </div>
            {/* ОБУЧАЮЩИМСЯ */}
            <div className="collapse_links d-flex justify-content-between">
                <NavLink className="link d-flex"
                    exact to="/student"
                >   Обучающимся
            </NavLink>
                <a
                    className="open_sub"
                    data-toggle="collapse"
                    data-target="#submenu_student"
                    href="#submenu_student"
                    role="button"
                    aria-expanded="false"
                    aria-controls="submenu_student">
                    <img src="/svg/arrowDown.svg" alt="Открыть подменю" />
                </a>
            </div>
            <div className="submenu collapse" id="submenu_student" data-parent="#accordion_navbar">
                <NavLink className="link" to="/student/bach">Бакалавриат</NavLink>
                <NavLink className="link" to="/student/mag">Магистратура</NavLink>
            </div>
            {/* ПОСТУПАЮЩЕМУ */}
            <a className="link d-flex"
                data-toggle="collapse"
                data-target="#submenu_degree"
                href="#submenu_degree"
                role="button"
                aria-expanded="false"
                aria-controls="submenu_degree">
                Поступающему <span> <img src="/svg/arrowDown.svg" alt="Открыть подменю" /> </span>
            </a>
            <div className="submenu collapse" id="submenu_degree" data-parent="#accordion_navbar">
                <NavLink className="link" to="/degree/bach">Абитуриенту</NavLink>
                <NavLink className="link" to="/degree/mag">Магистратура ФИТ</NavLink>
            </div>
            {/* РЕГЛАМЕНТИРУЮЩИЕ ДОКУМЕНТЫ */}
            <NavLink to="/docs" className="link">
                Регламентирующие документы
            </NavLink>
            {/* ЛИТЕРАТУРА КАФЕДРЫ */}
            <NavLink to="/literature" className="link">
                Литература кафедры
            </NavLink>
            <NavLink to="/quiz" className="link">
                Опросы для студентов
            </NavLink>
            {/* <NavLink  to="/login" className="link">
                Войти в систему
            </NavLink> */}
            {/* ВХОД В СИСТЕМУ */}
            {/* <NavLink  to="/login" className="link login">
                Войти в систему
            </NavLink>   */}
        </div>
    )
}

function AdminMenu() {
    return (
        <div className="menu">
            <Link to='/' onClick={() => { store.dispatch(logout()) }}>Выйти</Link>
            <div className="d-flex">
                <NavLink className="link" to="/admin/news">Новости</NavLink>
                <NavLink to="/admin/news/form" exact>
                    <Icon icon={faPlusCircle} size="lg" />
                </NavLink>
            </div>
            <div className="d-flex">
                <NavLink className="link" to="/admin/literature">Литература</NavLink>
                <NavLink to="/admin/literature/add" exact>
                    <Icon icon={faPlusCircle} size="lg" />
                </NavLink>
            </div>
            <div className="d-flex">
                <NavLink className="link" to="/admin/staff">Сотрудники</NavLink>
                <NavLink to="/admin/staff/form" exact>
                    <Icon icon={faPlusCircle} size="lg" />
                </NavLink>
            </div>
        </div>
    )
}