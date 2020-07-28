import React, { Component, useEffect, Suspense, lazy, useState, Fragment } from 'react'
import { Route, Switch, useLocation, Redirect } from 'react-router-dom'

import { LoadingScreen } from '../components/LoadingScreen'

import Header from '../components/Header'
import Navbar from '../components/Navbar'
// import Literature from '../pages/Literature'

// modals
import { StaffView, StaffModal } from '../pages/About'
import { BookModal, BookPage } from '../pages/Literature'
import { connect } from 'react-redux'
import { loaduser } from '../redux/actions/authActions'

const Footer = lazy(() => import('../components/Footer'))

const Home = lazy(() => import('../pages/Home'))
const About = lazy(() => import('../pages/About'))
const Student = lazy(() => import('../pages/Student'))
const Quiz = lazy(() => import('../pages/Quiz'))

const Literature = lazy(() => import('../pages/Literature'))

const StudentBach = lazy(() => import('../pages/Bach'))
const StudentMag = lazy(() => import('../pages/Mag'))

const DegreeBach = lazy(() => import('../pages/DegreeBach'))
const DegreeMag = lazy(() => import('../pages/DegreeMag'))

const News = lazy(() => import('../pages/News'))
const FullNews = lazy(() => import('../pages/components/FullNews'))

const Docs = lazy(() => import('../pages/Docs'))
const Login = lazy(() => import('../pages/Login'))

const AdminRoutes = lazy(() => import('../routes/AdminRoutes'))

const Developing = lazy(() => import('../components/Dev'))
const SearchPage = lazy(() => import('../pages/Search'))
const PageNotFound = lazy(() => import('../components/PageNotFound'))

export class Routes extends Component {

    render() {
        return (
            <Fragment>
                <PageUpButton />
                <Navbar />
                <Header />
                <Suspense fallback={<LoadingScreen />}>
                    <HomeRoutes auth={this.props.isAuthenticated} />
                    <Footer />
                </Suspense>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps,
    { loaduser }
)(Routes)

function HomeRoutes({ auth }) {

    const location = useLocation()
    let background = location.state && location.state.background

    const getRoute = ({path, exact, component, noScroll}) => {
        

        const route = <Route path={path} exact={exact} component={(()=><Fragment>
                {!noScroll && <ScrollToTop/>}
                {component}
            </Fragment>)}/>

        return route
    }

    const getAllRoutes = () => {
        
        const allRoutes = [
            {
                exact: true,
                path: "/",
                component: <Home title="Кафедра управления инновациями" />
            },
            {
                exact: true,
                path: "/about",
                component: <About title="О кафедре - Кафедра управления инновациями" />,
                noScroll: background
            },
            {
                exact: true,
                path: "/news",
                component: <News title="Новости" />
            },
            {
                exact: true,
                path: "/about/staff/:id",
                component: <StaffView />
            },
            {
                exact: true,
                path: "/news/announcements",
                component: <News type={1} title="Объявления кафедры" />
            },
            {
                exact: true,
                path: "/news/conference",
                component: <News type={3} title="Конференции" />
            },
            {
                exact: true,
                path: "/news/grants",
                component: <News type={2} title="Стипендии и гранты" />
            },
            {
                exact: true,
                path: "/news/read/:title",
                component: <FullNews />
            },
            {
                exact: true,
                path: "/student",
                component: <Student title="Обучающимся - Кафедра управления инновациями" />
            },
            {
                exact: true,
                path: "/student/bakalavriat",
                component: <StudentBach title="Бакалавриат - Обучающимся - Кафедра управления инновациями" />
            },
            {
                exact: true,
                path: "/student/magistratura",
                component: <StudentMag title="Магистратура - Обучающимся - Кафедра управления инновациями" />
            },
            {
                exact: true,
                path: "/abiturient",
                component: <DegreeBach title="Абитуриенту - Кафедра управления инновациями" />
            },
            {
                exact: true,
                path: "/abiturient-mag",
                component: <DegreeMag title="Магистратура ФИТ - Кафедра управления инновациями" />
            },
            {
                exact: true,
                path: "/documents",
                component:<Docs title="Регламентирующие документы - Кафедра управления инновациями" />
            },
            {
                exact: true,
                path: "/literature",
                component:<Literature title="Литература кафедры - Кафедра управления инновациями" />,
                noScroll: background
            },
            {
                exact: true,
                path: "/literature/page/:page",
                component:<Literature title="Литература кафедры - Кафедра управления инновациями" />,
                noScroll: background
            },
            {
                exact: true,
                path: "/literature/book/:id",
                component:<BookPage />
            },
            {
                exact: true,
                path: "/quiz",
                component:<Quiz title="Опросы студентов - Кафедра управления инновациями" />
            },
            {
                exact: true,
                path: "/search",
                component: <SearchPage title="Поиск - Кафедры управления инновациями"/>
            },
            // admin
            {
                exact: true,
                path: "/login",
                component: auth ? <Redirect to="/admin" /> : <Login title="Авторизация - Кафедра управления инновациями" />
            },
        ]
        
        return allRoutes
    }

    return (
        <div id="content">
            <Switch location={background || location}>
                {getAllRoutes().map((route, index)=>{
                    return getRoute(route)
                })}
                {auth && <Route path="/admin" component={(() => (<AdminRoutes />))} />}
                {getRoute({
                    path: "*",
                    component: <PageNotFound status={404} />
                })}
            </Switch>
            {/* Модальные окна */}
            {background && <Route exact path="/about/staff/:id" component={StaffModal} />}
            {background && <Route exact path="/literature/book/:id" component={BookModal}/>}
        </div>
    )
}

export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export const PageUpButton = () => {

    const [visible, setvisible] = useState(false)

    window.onscroll = function (scrolled) {
        var scrolled = 0
        scrolled = window.scrollY
        scrolled > window.innerHeight / 2 ? setvisible(true) : setvisible(false)
    }

    return (
        <button type="button"
            id="PageUpButton"
            className={`btn ${visible ? 'visible' : ''}`}
            onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            <img src="/svg/up.svg" alt="Наверх" />
        </button>
    )
}