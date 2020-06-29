import React, { Component, Fragment } from 'react'
import store from '../store'
import { logout } from '../redux/actions/authActions'
import { NavLink, Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { closeNavbar } from '../redux/actions/navbarActions'
import './styles/Navbar.scss'
import { connect } from 'react-redux';

export class Navbar extends Component {

    CloseNavbar = () => {
        this.props.closeNavbar()
    }

    render() {
        return (
            <Fragment>
                {this.props.open && <section id="bg-menu-open" onClick={this.CloseNavbar}/>}
                <div id="sider" className={this.props.open ? "open" : null}>
                    <div className="d-flex justify-content-between top-navbar-btns">
                    <span className="login_span">
                        <NavLink  to="/login">
                            <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.14998 7.94444C9.99093 7.94444 11.4833 6.45205 11.4833 4.6111C11.4833 2.77016 9.99093 1.27777 8.14998 1.27777C6.30903 1.27777 4.81665 2.77016 4.81665 4.6111C4.81665 6.45205 6.30903 7.94444 8.14998 7.94444Z" fill="white"/>
                                <path d="M9.13331 17.6778C8.94971 17.4962 8.82991 17.26 8.79185 17.0046C8.75379 16.7492 8.79952 16.4883 8.9222 16.2611L9.21664 15.7056L8.61108 15.5222C8.36415 15.4449 8.14917 15.2892 7.99877 15.0786C7.84837 14.8681 7.77077 14.6142 7.77775 14.3556V13.2167C7.77728 12.9591 7.85967 12.7083 8.01274 12.5012C8.1658 12.2941 8.38143 12.1418 8.62775 12.0667L9.23331 11.8833L8.94442 11.3278C8.82534 11.1037 8.78003 10.8477 8.81494 10.5963C8.84986 10.3449 8.96321 10.111 9.13886 9.92777C8.71146 9.87174 8.28102 9.84206 7.84997 9.83888C6.57682 9.80891 5.31274 10.0603 4.14788 10.575C2.98303 11.0897 1.94611 11.8551 1.11108 12.8167V17.1222C1.11108 17.2696 1.16962 17.4109 1.2738 17.5151C1.37799 17.6192 1.5193 17.6778 1.66664 17.6778H9.13331V17.6778Z" fill="white"/>
                                <path d="M18.7222 13.0333L17.6111 12.7C17.5341 12.4256 17.426 12.1609 17.2888 11.9111L17.8444 10.8778C17.8659 10.8394 17.8737 10.7949 17.8667 10.7515C17.8596 10.7082 17.838 10.6685 17.8055 10.6389L17 9.82778C16.9689 9.79759 16.9294 9.77766 16.8866 9.7707C16.8439 9.76375 16.8001 9.7701 16.7611 9.78889L15.7333 10.3444C15.4803 10.207 15.2141 10.0953 14.9388 10.0111L14.6 8.9C14.585 8.85903 14.5578 8.82369 14.522 8.79882C14.4862 8.77395 14.4436 8.76078 14.4 8.76111H13.2444C13.2011 8.76232 13.1592 8.77683 13.1244 8.80268C13.0896 8.82852 13.0636 8.86444 13.05 8.90556L12.7166 10.0167C12.436 10.0983 12.1657 10.212 11.9111 10.3556L10.9055 9.8C10.8664 9.77923 10.8218 9.77127 10.7779 9.77725C10.734 9.78323 10.6932 9.80285 10.6611 9.83334L9.8444 10.6333C9.81224 10.6643 9.79105 10.7049 9.78404 10.749C9.77702 10.7932 9.78456 10.8383 9.80551 10.8778L10.3611 11.8889C10.2122 12.1398 10.0912 12.4062 9.99995 12.6833L8.88884 13.0222C8.84681 13.0344 8.80993 13.06 8.78384 13.0951C8.75775 13.1302 8.74389 13.1729 8.7444 13.2167V14.3556C8.74389 14.3993 8.75775 14.442 8.78384 14.4771C8.80993 14.5123 8.84681 14.5379 8.88884 14.55L9.99995 14.8889C10.0832 15.161 10.195 15.4235 10.3333 15.6722L9.77773 16.7278C9.75678 16.7672 9.74924 16.8124 9.75626 16.8565C9.76328 16.9006 9.78446 16.9412 9.81662 16.9722L10.6444 17.7778C10.6765 17.8083 10.7174 17.8279 10.7612 17.8339C10.8051 17.8399 10.8497 17.8319 10.8888 17.8111L11.9277 17.2556C12.175 17.3885 12.4357 17.4947 12.7055 17.5722L13.0388 18.7111C13.0528 18.7531 13.0797 18.7897 13.1155 18.8156C13.1514 18.8415 13.1946 18.8555 13.2388 18.8556H14.3777C14.421 18.8543 14.4629 18.8398 14.4977 18.814C14.5325 18.7882 14.5585 18.7522 14.5722 18.7111L14.9055 17.5722C15.1721 17.4957 15.4293 17.3894 15.6722 17.2556L16.7222 17.8111C16.7613 17.8319 16.8059 17.8399 16.8498 17.8339C16.8936 17.8279 16.9345 17.8083 16.9666 17.7778L17.7777 16.9722C17.8082 16.9401 17.8278 16.8992 17.8338 16.8554C17.8398 16.8115 17.8318 16.7669 17.8111 16.7278L17.2555 15.6833C17.3884 15.44 17.4946 15.1829 17.5722 14.9167L18.6833 14.5778C18.725 14.5644 18.7617 14.5386 18.7885 14.5039C18.8153 14.4691 18.8309 14.4271 18.8333 14.3833V13.2333C18.8346 13.1931 18.825 13.1532 18.8054 13.1179C18.7859 13.0827 18.7571 13.0535 18.7222 13.0333V13.0333ZM13.8166 15.6556C13.4494 15.6567 13.0901 15.5488 12.7842 15.3455C12.4783 15.1423 12.2396 14.8529 12.0984 14.514C11.9571 14.175 11.9195 13.8017 11.9905 13.4414C12.0615 13.0811 12.2377 12.75 12.497 12.4899C12.7563 12.2298 13.0869 12.0526 13.447 11.9805C13.8071 11.9085 14.1805 11.9449 14.5199 12.0852C14.8592 12.2254 15.1494 12.4633 15.3535 12.7685C15.5576 13.0738 15.6666 13.4328 15.6666 13.8C15.6666 14.2912 15.4719 14.7623 15.1251 15.1101C14.7783 15.4579 14.3078 15.6541 13.8166 15.6556Z" fill="white"/>
                            </svg>
                        </NavLink>
                    </span>
                    <span className="close_nav" onClick={this.CloseNavbar} style={{ cursor: "pointer"}}>
                        <svg id="closenavbar_svgicon" width="30" height="22" viewBox="0 0 21 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 11H12C12.55 11 13 10.5875 13 10.0833C13 9.57917 12.55 9.16667 12 9.16667H1C0.45 9.16667 0 9.57917 0 10.0833C0 10.5875 0.45 11 1 11ZM1 6.41667H9C9.55 6.41667 10 6.00417 10 5.5C10 4.99583 9.55 4.58333 9 4.58333H1C0.45 4.58333 0 4.99583 0 5.5C0 6.00417 0.45 6.41667 1 6.41667ZM0 0.916667C0 1.42083 0.45 1.83333 1 1.83333H12C12.55 1.83333 13 1.42083 13 0.916667C13 0.4125 12.55 0 12 0H1C0.45 0 0 0.4125 0 0.916667Z" fill="white"/>
                            <path d="M17.4124 5.58202L20.2924 8.46202C20.6824 8.85202 20.6724 9.49202 20.2924 9.88202C19.9024 10.272 19.2724 10.272 18.8824 9.88202L15.2924 6.29202C15.1997 6.19951 15.1262 6.08962 15.076 5.96865C15.0258 5.84767 15 5.71799 15 5.58702C15 5.45605 15.0258 5.32637 15.076 5.2054C15.1262 5.08442 15.1997 4.97453 15.2924 4.88202L18.8824 1.29202C18.975 1.19944 19.0849 1.126 19.2059 1.07589C19.3269 1.02579 19.4565 1 19.5874 1C19.7184 1 19.848 1.02579 19.969 1.07589C20.09 1.126 20.1999 1.19944 20.2924 1.29202C20.385 1.3846 20.4585 1.49451 20.5086 1.61548C20.5587 1.73644 20.5845 1.86609 20.5845 1.99702C20.5845 2.12795 20.5587 2.2576 20.5086 2.37856C20.4585 2.49953 20.385 2.60944 20.2924 2.70202L17.4124 5.58202Z" fill="white">
                                <animate attributeName="d" dur="0.2s" begin="closenavbar_svgicon.mouseenter" repeatCount="1" fill="freeze" 
                                values="M17.4124 5.58202L20.2924 8.46202C20.6824 8.85202 20.6724 9.49202 20.2924 9.88202C19.9024 10.272 19.2724 10.272 18.8824 9.88202L15.2924 6.29202C15.1997 6.19951 15.1262 6.08962 15.076 5.96865C15.0258 5.84767 15 5.71799 15 5.58702C15 5.45605 15.0258 5.32637 15.076 5.2054C15.1262 5.08442 15.1997 4.97453 15.2924 4.88202L18.8824 1.29202C18.975 1.19944 19.0849 1.126 19.2059 1.07589C19.3269 1.02579 19.4565 1 19.5874 1C19.7184 1 19.848 1.02579 19.969 1.07589C20.09 1.126 20.1999 1.19944 20.2924 1.29202C20.385 1.3846 20.4585 1.49451 20.5086 1.61548C20.5587 1.73644 20.5845 1.86609 20.5845 1.99702C20.5845 2.12795 20.5587 2.2576 20.5086 2.37856C20.4585 2.49953 20.385 2.60944 20.2924 2.70202L17.4124 5.58202Z;
                                M15.4124 5.58202L18.2924 8.46202C18.6824 8.85202 18.6724 9.49202 18.2924 9.88202C17.9024 10.272 17.2724 10.272 16.8824 9.88202L13.2924 6.29202C13.1997 6.19951 13.1262 6.08962 13.076 5.96865C13.0258 5.84767 13 5.71799 13 5.58702C13 5.45605 13.0258 5.32637 13.076 5.2054C13.1262 5.08442 13.1997 4.97453 13.2924 4.88202L16.8824 1.29202C16.975 1.19944 17.0849 1.126 17.2059 1.07589C17.3269 1.02579 17.4565 1 17.5874 1C17.7184 1 17.848 1.02579 17.969 1.07589C18.09 1.126 18.1999 1.19944 18.2924 1.29202C18.385 1.3846 18.4585 1.49451 18.5086 1.61548C18.5587 1.73644 18.5845 1.86609 18.5845 1.99702C18.5845 2.12795 18.5587 2.2576 18.5086 2.37856C18.4585 2.49953 18.385 2.60944 18.2924 2.70202L15.4124 5.58202Z"/>
                            <animate attributeName="d" dur="0.2s" begin="closenavbar_svgicon.mouseleave" repeatCount="1" fill="freeze"
                                values="M15.4124 5.58202L18.2924 8.46202C18.6824 8.85202 18.6724 9.49202 18.2924 9.88202C17.9024 10.272 17.2724 10.272 16.8824 9.88202L13.2924 6.29202C13.1997 6.19951 13.1262 6.08962 13.076 5.96865C13.0258 5.84767 13 5.71799 13 5.58702C13 5.45605 13.0258 5.32637 13.076 5.2054C13.1262 5.08442 13.1997 4.97453 13.2924 4.88202L16.8824 1.29202C16.975 1.19944 17.0849 1.126 17.2059 1.07589C17.3269 1.02579 17.4565 1 17.5874 1C17.7184 1 17.848 1.02579 17.969 1.07589C18.09 1.126 18.1999 1.19944 18.2924 1.29202C18.385 1.3846 18.4585 1.49451 18.5086 1.61548C18.5587 1.73644 18.5845 1.86609 18.5845 1.99702C18.5845 2.12795 18.5587 2.2576 18.5086 2.37856C18.4585 2.49953 18.385 2.60944 18.2924 2.70202L15.4124 5.58202Z;
                                M17.4124 5.58202L20.2924 8.46202C20.6824 8.85202 20.6724 9.49202 20.2924 9.88202C19.9024 10.272 19.2724 10.272 18.8824 9.88202L15.2924 6.29202C15.1997 6.19951 15.1262 6.08962 15.076 5.96865C15.0258 5.84767 15 5.71799 15 5.58702C15 5.45605 15.0258 5.32637 15.076 5.2054C15.1262 5.08442 15.1997 4.97453 15.2924 4.88202L18.8824 1.29202C18.975 1.19944 19.0849 1.126 19.2059 1.07589C19.3269 1.02579 19.4565 1 19.5874 1C19.7184 1 19.848 1.02579 19.969 1.07589C20.09 1.126 20.1999 1.19944 20.2924 1.29202C20.385 1.3846 20.4585 1.49451 20.5086 1.61548C20.5587 1.73644 20.5845 1.86609 20.5845 1.99702C20.5845 2.12795 20.5587 2.2576 20.5086 2.37856C20.4585 2.49953 20.385 2.60944 20.2924 2.70202L17.4124 5.58202Z"/>
                            </path>
                        </svg>
                    </span>
                    </div>
                    {/* <Switch>
                        {this.props.isAuthenticated && <Route path="/admin" component={(() => (<AdminMenu />))} />}
                        <Route path="/" component={(() => (<NavMenu />))} />
                    </Switch> */}
                    <NavMenu />
                    {this.props.isAuthenticated ? <Link className="ml-3 mt-3 btn btn-danger" role="button"
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

function NavMenu() {
    return (
        <div className="menu" id="accordion_navbar">
            <NavLink to="/" className="link" exact>Главная</NavLink>
            {/* НОВОСТИ */}
            <a className="link d-flex"
                data-toggle="collapse"
                data-target="#submenu_news"
                href="#submenu_news"
                role="button"
                aria-expanded="false"
                aria-controls="submenu_news">
                Новости <span> <Arrowdown_svg index={0}/> </span>
            </a>
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
                    <Arrowdown_svg index={1} />
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
                    <Arrowdown_svg index={2} />
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
                Поступающему <span> <Arrowdown_svg index={3} /> </span>
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
            {/* ВХОД В СИСТЕМУ */}
            {/* <NavLink  to="/login" className="link login">
                Войти в систему
            </NavLink>   */}
        </div>
    )
}

// function AdminMenu() {
//     return (
//         <div className="menu">
//             <Link to='/' onClick={() => { store.dispatch(logout()) }}>Выйти</Link>
//             <div className="d-flex">
//                 <NavLink className="link" to="/admin/news">Новости</NavLink>
//                 <NavLink to="/admin/news/form" exact>
//                     <Icon icon={faPlusCircle} size="lg" />
//                 </NavLink>
//             </div>
//             <div className="d-flex">
//                 <NavLink className="link" to="/admin/literature">Литература</NavLink>
//                 <NavLink to="/admin/literature/add" exact>
//                     <Icon icon={faPlusCircle} size="lg" />
//                 </NavLink>
//             </div>
//             <div className="d-flex">
//                 <NavLink className="link" to="/admin/staff">Сотрудники</NavLink>
//                 <NavLink to="/admin/staff/form" exact>
//                     <Icon icon={faPlusCircle} size="lg" />
//                 </NavLink>
//             </div>
//         </div>
//     )
// }

const Arrowdown_svg = ({index}) => {
    return (<svg id={`menu_arrow_down_svg_${index}`} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15Z" fill="white" fill-opacity="0.3">
        <animate attributeName="fill-opacity" begin={`menu_arrow_down_svg_${index}.mouseenter`} values="0.75" dur="0.3s" repeatCount="1" fill="freeze"/>
        <animate attributeName="fill-opacity" begin={`menu_arrow_down_svg_${index}.mouseleave`} values="0.3" dur="0.3s" repeatCount="1" fill="freeze"/>
    </path>
    <path d="M14.5757 18.0012C14.81 18.2355 15.1899 18.2355 15.4243 18.0012L19.2426 14.1828C19.477 13.9485 19.477 13.5686 19.2426 13.3343C19.0083 13.1 18.6284 13.1 18.3941 13.3343L15 16.7284L11.6059 13.3343C11.3716 13.1 10.9917 13.1 10.7574 13.3343C10.523 13.5686 10.523 13.9485 10.7574 14.1828L14.5757 18.0012ZM14.4 17L14.4 17.5769L15.6 17.5769L15.6 17L14.4 17Z" fill="white" fill-opacity="0.85">
        <animate attributeName="fill" begin={`menu_arrow_down_svg_${index}.mouseenter`} values="blue" dur="0.3s" repeatCount="1" fill="freeze"/>
        <animate attributeName="fill" begin={`menu_arrow_down_svg_${index}.mouseleave`} values="white" dur="0.3s" repeatCount="1" fill="freeze"/>
    </path>
    </svg>
    )
}