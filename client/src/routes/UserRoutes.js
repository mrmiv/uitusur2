import React, { Component, useEffect, Suspense, lazy, useState, Fragment } from 'react'
import { Route, Switch, useLocation, Redirect } from 'react-router-dom'

import { LoadingScreen } from '../components/LoadingScreen'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons'

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

    return (
        <div id="content">
            <Switch location={background || location}>
                <Route path="/" exact component={(() => (<Fragment>
                    <ScrollToTop />
                    <Home title="Кафедра управления инновациями" />
                </Fragment>))} />
                {/* О Кафедре */}
                <Route path="/about" exact component={(() => (<Fragment>
                    {!background && <ScrollToTop />}
                    <About title="О кафедре - Кафедра управления инновациями" />
                </Fragment>))} />
                <Route path="/staff/:id" exact component={(() => (<Fragment>
                    <ScrollToTop />
                    <StaffView />
                </Fragment>))} />
                {/* Новости */}
                <Route path="/announcements" exact component={(() => (<Fragment>
                    <ScrollToTop />
                    <News type={1} title="Объявления кафедры" />
                </Fragment>))} />
                <Route path="/conferences" exact component={(() => (<Fragment>
                    <ScrollToTop />
                    <News type={3} title="Конференции" />
                </Fragment>))} />
                <Route path="/grants" exact component={(() => (<Fragment>
                    <ScrollToTop />
                    <News type={2} title="Стипендии и гранты" />
                </Fragment>))} />
                <Route path="/news/:id" exact component={((props) => (<Fragment>
                    <ScrollToTop />
                    <FullNews id={props.match.params.id} />
                </Fragment>))} />
                {/* Обучающемуся */}
                <Route path="/student" exact component={(() => (<Fragment>
                    <ScrollToTop />
                    <Student title="Обучающимся - Кафедра управления инновациями" />
                </Fragment>))} />
                <Route path="/student/bach" exact component={(() => (<Fragment>
                    <ScrollToTop />
                    <StudentBach title="Бакалавру - Кафедра управления инновациями" />
                </Fragment>))} />
                <Route path="/student/mag" exact component={(() => (<Fragment>
                    <ScrollToTop />
                    <StudentMag title="Магистранту - Кафедра управления инновациями" />
                </Fragment>))} />
                <Route path="/degree/bach" exact component={(() => (<Fragment>
                    <ScrollToTop />
                    <DegreeBach title="Абитуриенту - Кафедра управления инновациями" />
                </Fragment>))} />
                <Route path="/degree/mag" exact component={(() => (<Fragment>
                    <ScrollToTop />
                    <DegreeMag title="Магистратура ФИТ - Кафедра управления инновациями" />
                </Fragment>))} />
                <Route path="/docs" exact component={(() => (<Fragment>
                    <ScrollToTop />
                    <Docs title="Регламентирующие документы - Кафедра управления инновациями" />
                </Fragment>))} />
                {/* Литература кафедры */}
                <Route path="/literature" component={(() => (<Fragment>
                    {!background && <ScrollToTop />}
                    <Route exact path="/literature">
                        <Literature title="Литература кафедры - Кафедра управления инновациями" />
                    </Route>
                </Fragment>))} />
                <Route exact path="/book/:id" component={() => (<Fragment>
                    <ScrollToTop />
                    <BookPage />
                </Fragment>)} />
                <Route path="/quiz" exact component={(() => (<Fragment>
                    <ScrollToTop />
                    <Quiz title="Опросы студентов - Кафедра управления инновациями" />
                </Fragment>))} />

                {/* FOR ADMINISTRATION */}
                <Route path="/login" exact component={(() => (<Fragment>
                    <ScrollToTop />
                    {auth ? <Redirect to="/admin" />
                        : <Login title="Авторизация - Кафедра управления инновациями" />}
                </Fragment>))} />

                {auth && <Route path="/admin" component={(() => (<AdminRoutes />))} />}
                
                {/* NOT FOUND 404 */}
                <Route path="*" exact component={(() => (<Fragment>
                    <ScrollToTop />
                    <PageNotFound status={404} />
                </Fragment>))} />
            </Switch>
            {/* Модальные окна */}
            {background && <Route exact path="/staff/:id" component={StaffModal} />}
            {background && <Route exact path="/book/:id" component={() => (<BookModal />)} />}
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