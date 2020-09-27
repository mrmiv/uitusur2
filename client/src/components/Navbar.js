import React, { Component, Fragment } from 'react'
import store from '../store'
import { logout } from '../redux/actions/authActions'
import { NavLink, Link } from 'react-router-dom'
import { closeNavbar } from '../redux/actions/navbarActions'
import './styles/Navbar.scss'
import { connect } from 'react-redux';

import { Icon } from '@iconify/react';
import newspaperSharp from '@iconify/icons-ion/newspaper-sharp';
import bxsHome from '@iconify/icons-bx/bxs-home';
import informationCircle from '@iconify/icons-ion/information-circle';
import bxsUserCircle from '@iconify/icons-bx/bxs-user-circle';
import addressBook from '@iconify/icons-fa-solid/address-book';
import bxsCheckCircle from '@iconify/icons-bx/bxs-check-circle';
import schoolIcon from '@iconify/icons-ion/school';
import universityIcon from '@iconify/icons-fa-solid/university';
import documentAttach from '@iconify/icons-ion/document-attach';
import booksIcon from '@iconify/icons-raphael/books';
import questionCircle from '@iconify/icons-fa-solid/question-circle';

export class Navbar extends Component {

    CloseNavbar = () => {
        this.props.closeNavbar()
    }

    getLinkList = () =>{
        
        const linkList = [
            {
                id: "main",
                to: "/",
                exact: true,
                name: "Главная",
                icon: bxsHome
                
            },
            {
                id: "news",
                to: "/news",
                exact: true,
                name: "Новости",
                icon: newspaperSharp,
                submenu: [
                    {
                        to: "/news/announcements",
                        name: "Объявления кафедры",
                        icon: newspaperSharp
                    },
                    {
                        to: "/news/grants",
                        name: "Стипендии и гранты",
                        icon: newspaperSharp
                    },
                    {
                        to: "/news/conference",
                        name: "Конференции",
                        icon: newspaperSharp
                    },
                ]
            },
            {
                id: "about",
                to: "/about",
                exact: true,
                name: "О кафедре",
                icon: informationCircle,
                submenu: [
                    {
                        to: {
                            pathname: "/about",
                            state: "staff"
                        },
                        name: "Сотрудники кафедры",
                        notActive: true,
                        icon: addressBook
                    },
                    {
                        to: {
                            pathname: "/about",
                            state: "Документы СМК"
                        },
                        name: "СМК",
                        notActive: true,
                        icon: bxsCheckCircle
                    },
                    
                ]
            },
            {
                id: "student",
                to: "/student",
                exact: true,
                name: "Обучающимся",
                icon: schoolIcon,
                submenu: [
                    {
                        to: "/student/bakalavriat",
                        name: "Бакалавриат",
                        icon: schoolIcon
                    },
                    {
                        to: "/student/magistratura",
                        name: "Магистратура",
                        icon: schoolIcon
                    }
                ]
            },
            {
                id: "abiturient",
                to: "/abiturient",
                exact: true,
                name: "Абитуриенту",
                icon: universityIcon
            },
            {
                id: "abiturient-mag",
                to: "/abiturient-mag",
                exact: true,
                name: "Магистратура ФИТ",
                icon: universityIcon
            },
            {
                id: "documents",
                to: "/documents",
                exact: true,
                name: "Регламентирующие документы",
                icon: documentAttach
            },
            {
                id: "literature",
                to: "/literature",
                exact: true,
                name: "Литература кафедры",
                icon: booksIcon
            },
            {
                id: "quiz",
                to: "/quiz",
                exact: true,
                name: "Опросы для студентов",
                icon: questionCircle
            }
        ]
        
        return linkList
    }

    getLinkComponent = (link, index) => {
        
        const {id, name, to, exact, submenu} = link

        const link_id = `submenu_${id}`
        const submenu_links = <div className="submenu collapse" id={link_id} data-parent="#accordion_navbar">
            {submenu && submenu.map((sub_item, index)=>{
                const isActive = sub_item.notActive ? 'sublink-not-active' : ''
                return <NavLink index={index} className={`link ${isActive}`} to={sub_item.to}>
                    {sub_item.icon && <Icon inline icon={sub_item.icon}/>} {sub_item.name}
                </NavLink>
            })}
        </div>

        const main_link = <NavLink className={`link ${submenu ? 'link-with-submenu' : ''}`} exact={exact} to={to}>
            {link.icon && <Icon icon={link.icon} inline/>} {name}</NavLink>

        const link_element = <Fragment>
            {submenu ?
                <Fragment>
                    {main_link}
                    <a
                        className={`open_submenu_button`}
                        data-toggle="collapse"
                        data-target={`#${link_id}`}
                        href={`#${link_id}`}
                        role="button"
                        aria-expanded="false"
                        aria-controls={link_id}>
                            <svg  className="arrow-more" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.66663 1.66666L6.99996 6.99999L12.3333 1.66666" stroke="#B21F66" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                    </a>
                    {submenu_links}
                </Fragment>
            : main_link}
        </Fragment>
        
        return link_element
    }

    render() {

        const isOpen = this.props.open ? 'open' : ''
        const {isAuthenticated} = this.props

        return (
            <Fragment>
                {this.props.open && <section id="bg-menu-open" onClick={this.CloseNavbar}/>}
                <div id="sider" className={isOpen}>
                    <div className="d-flex align-items-center" style={{marginLeft: "4px"}}>
                        <span className="login_span">
                            <NavLink  to="/login">
                                <Icon inline icon={bxsUserCircle} style={{fontSize: "1.5em"}}/> 
                                {isAuthenticated ? 'Админ' : 'Войти'}
                            </NavLink>
                        </span>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                        <span className="close_nav" onClick={this.CloseNavbar} style={{ cursor: "pointer"}}>
                            <svg id="closenavbar_svgicon" width="30" height="22" viewBox="0 0 21 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 11H12C12.55 11 13 10.5875 13 10.0833C13 9.57917 12.55 9.16667 12 9.16667H1C0.45 9.16667 0 9.57917 0 
                                10.0833C0 10.5875 0.45 11 1 11ZM1 6.41667H9C9.55 6.41667 10 6.00417 10 5.5C10 4.99583 9.55 4.58333 9 4.58333H1C0.45 
                                4.58333 0 4.99583 0 5.5C0 6.00417 0.45 6.41667 1 6.41667ZM0 0.916667C0 1.42083 0.45 1.83333 1 1.83333H12C12.55 1.83333 
                                13 1.42083 13 0.916667C13 0.4125 12.55 0 12 0H1C0.45 0 0 0.4125 0 0.916667Z" fill="#354ED1"/>
                                <path d="M17.4124 5.58202L20.2924 8.46202C20.6824 8.85202 20.6724 9.49202 20.2924 9.88202C19.9024 10.272 19.2724 
                                10.272 18.8824 9.88202L15.2924 6.29202C15.1997 6.19951 15.1262 6.08962 15.076 5.96865C15.0258 5.84767 15 5.71799 15 
                                5.58702C15 5.45605 15.0258 5.32637 15.076 5.2054C15.1262 5.08442 15.1997 4.97453 15.2924 4.88202L18.8824 1.29202C18.975 
                                1.19944 19.0849 1.126 19.2059 1.07589C19.3269 1.02579 19.4565 1 19.5874 1C19.7184 1 19.848 1.02579 19.969 1.07589C20.09 1.126 
                                20.1999 1.19944 20.2924 1.29202C20.385 1.3846 20.4585 1.49451 20.5086 1.61548C20.5587 1.73644 20.5845 1.86609 20.5845 1.99702C20.5845 
                                2.12795 20.5587 2.2576 20.5086 2.37856C20.4585 2.49953 20.385 2.60944 20.2924 2.70202L17.4124 5.58202Z" fill="#354ED1">
                                    <animate attributeName="d" dur="0.2s" begin="closenavbar_svgicon.mouseenter" repeatCount="1" fill="freeze" 
                                    values="M17.4124 5.58202L20.2924 8.46202C20.6824 8.85202 20.6724 9.49202 20.2924 9.88202C19.9024 10.272 19.2724 
                                    10.272 18.8824 9.88202L15.2924 6.29202C15.1997 6.19951 15.1262 6.08962 15.076 5.96865C15.0258 5.84767 15 5.71799 
                                    15 5.58702C15 5.45605 15.0258 5.32637 15.076 5.2054C15.1262 5.08442 15.1997 4.97453 15.2924 4.88202L18.8824 
                                    1.29202C18.975 1.19944 19.0849 1.126 19.2059 1.07589C19.3269 1.02579 19.4565 1 19.5874 1C19.7184 1 19.848 1.02579 19.969 
                                    1.07589C20.09 1.126 20.1999 1.19944 20.2924 1.29202C20.385 1.3846 20.4585 1.49451 20.5086 1.61548C20.5587 1.73644 20.5845 
                                    1.86609 20.5845 1.99702C20.5845 2.12795 20.5587 2.2576 20.5086 2.37856C20.4585 2.49953 20.385 2.60944 20.2924 2.70202L17.4124 5.58202Z;
                                    M15.4124 5.58202L18.2924 8.46202C18.6824 8.85202 18.6724 9.49202 18.2924 9.88202C17.9024 10.272 17.2724 10.272 
                                    16.8824 9.88202L13.2924 6.29202C13.1997 6.19951 13.1262 6.08962 13.076 5.96865C13.0258 5.84767 13 5.71799 13 
                                    5.58702C13 5.45605 13.0258 5.32637 13.076 5.2054C13.1262 5.08442 13.1997 4.97453 13.2924 4.88202L16.8824 
                                    1.29202C16.975 1.19944 17.0849 1.126 17.2059 1.07589C17.3269 1.02579 17.4565 1 17.5874 1C17.7184 1 17.848 1.02579 17.969 
                                    1.07589C18.09 1.126 18.1999 1.19944 18.2924 1.29202C18.385 1.3846 18.4585 1.49451 18.5086 1.61548C18.5587 1.73644 18.5845 
                                    1.86609 18.5845 1.99702C18.5845 2.12795 18.5587 2.2576 18.5086 2.37856C18.4585 2.49953 18.385 2.60944 18.2924 2.70202L15.4124 5.58202Z"/>
                                <animate attributeName="d" dur="0.2s" begin="closenavbar_svgicon.mouseleave" repeatCount="1" fill="freeze"
                                    values="M15.4124 5.58202L18.2924 8.46202C18.6824 8.85202 18.6724 9.49202 18.2924 9.88202C17.9024 10.272 17.2724 
                                    10.272 16.8824 9.88202L13.2924 6.29202C13.1997 6.19951 13.1262 6.08962 13.076 5.96865C13.0258 5.84767 13 5.71799 
                                    13 5.58702C13 5.45605 13.0258 5.32637 13.076 5.2054C13.1262 5.08442 13.1997 4.97453 13.2924 4.88202L16.8824 
                                    1.29202C16.975 1.19944 17.0849 1.126 17.2059 1.07589C17.3269 1.02579 17.4565 1 17.5874 1C17.7184 1 17.848 1.02579 17.969 
                                    1.07589C18.09 1.126 18.1999 1.19944 18.2924 1.29202C18.385 1.3846 18.4585 1.49451 18.5086 1.61548C18.5587 1.73644 18.5845 
                                    1.86609 18.5845 1.99702C18.5845 2.12795 18.5587 2.2576 18.5086 2.37856C18.4585 2.49953 18.385 2.60944 18.2924 2.70202L15.4124 5.58202Z;
                                    M17.4124 5.58202L20.2924 8.46202C20.6824 8.85202 20.6724 9.49202 20.2924 9.88202C19.9024 10.272 19.2724 10.272 
                                    18.8824 9.88202L15.2924 6.29202C15.1997 6.19951 15.1262 6.08962 15.076 5.96865C15.0258 5.84767 15 5.71799 15 
                                    5.58702C15 5.45605 15.0258 5.32637 15.076 5.2054C15.1262 5.08442 15.1997 4.97453 15.2924 4.88202L18.8824 
                                    1.29202C18.975 1.19944 19.0849 1.126 19.2059 1.07589C19.3269 1.02579 19.4565 1 19.5874 1C19.7184 1 19.848 1.02579 19.969 
                                    1.07589C20.09 1.126 20.1999 1.19944 20.2924 1.29202C20.385 1.3846 20.4585 1.49451 20.5086 1.61548C20.5587 1.73644 20.5845 
                                    1.86609 20.5845 1.99702C20.5845 2.12795 20.5587 2.2576 20.5086 2.37856C20.4585 2.49953 20.385 2.60944 20.2924 2.70202L17.4124 5.58202Z"/>
                                </path>
                            </svg>
                        </span>
                    </div>
                    <div className="menu" id="accordion_navbar">
                        {this.getLinkList().map((link, index)=>{
                            return this.getLinkComponent(link,index)
                        })}
                    </div>
                    {isAuthenticated ? <Link className="btn btn-danger" role="button"
                        to='/' onClick={() => { store.dispatch(logout()) }}>Выйти</Link> : null}
                </div>
            </Fragment>
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