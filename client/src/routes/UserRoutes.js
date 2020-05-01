import React, { Component, useEffect, Suspense, lazy, useState} from 'react'
import {Route, Switch, useLocation, Redirect} from 'react-router-dom'

import {LoadingScreen} from '../components/LoadingScreen'
import { FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import {faArrowCircleUp} from '@fortawesome/free-solid-svg-icons'

import Header from '../components/Header'
import Navbar from '../components/Navbar'
// import Literature from '../pages/Literature'

// modals
import {StaffView, StaffModal} from '../pages/About'
import {BookModal, BookPage} from '../pages/Literature'
import { connect } from 'react-redux'
import {loaduser} from '../redux/actions/authActions'

const Footer = lazy(()=> import('../components/Footer') )

const Home = lazy(()=> import('../pages/Home') )
const About = lazy(()=> import('../pages/About') )
const Student = lazy(()=> import('../pages/Student') )
const Quiz = lazy(()=> import('../pages/Quiz') )
const Literature = lazy(()=> import('../pages/Literature') )
const StudentBach = lazy(()=> import('../pages/Bach') )
const StudentMag = lazy(()=> import('../pages/Mag') )
const News = lazy(()=> import('../pages/News') )
const Docs = lazy(()=> import('../pages/Docs') )
const Login = lazy(()=> import('../pages/Login') )
const FullNews = lazy(()=> import('../pages/components/FullNews') )

const AdminRoutes = lazy(()=> import('../routes/AdminRoutes') )

const Developing = lazy(()=> import('../components/Dev') )
const PageNotFound = lazy(()=> import('../components/PageNotFound') )

export class Routes extends Component {

    render(){
        return(
            <>
            <Navbar/>
            <Header/>
            <Suspense fallback={<LoadingScreen/>}>
                <HomeRoutes auth={this.props.isAuthenticated}/>
                <Footer/>
            </Suspense>
            </>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps,
    {loaduser}
)(Routes)

function HomeRoutes({auth}){

    const location = useLocation()
    let background = location.state && location.state.background

    return(
        <div id="content">
            <Switch location={background || location}>
                <Route path="/" exact component={(()=>(<>
                    <ScrollToTop/>
                    <Home title="Кафедра управления инновациями"/>
                </>))}/>
{/* О Кафедре */}
                <Route path="/about" exact component={(()=>(<>
                    {!background && <ScrollToTop/>}
                    <About title="О кафедре - Кафедра управления инновациями"/>
                </>))}/>
                <Route path="/staff/:id" exact component={(()=>(<>
                    <ScrollToTop/>
                    <StaffView/>
                </>))}/>
{/* Новости */}
                <Route path="/announcements" exact component={(()=>(<>
                    <ScrollToTop/>
                    <News type={1} title="Объявления кафедры"/>
                </>))}/>
                <Route path="/conferences" exact component={(()=>(<>
                    <ScrollToTop/>
                    <News type={3} title="Конференции"/>
                </>))}/>
                <Route path="/grants" exact component={(()=>(<>
                    <ScrollToTop/>
                    <News type={2} title="Стипендии и гранты"/>
                </>))}/>
                <Route path="/news/:id" exact component={((props)=>(<>
                    <ScrollToTop/>
                    <FullNews id={props.match.params.id}/>
                </>))}/>
{/* Обучающемуся */}
                <Route path="/student" exact component={(()=>(<>
                    <ScrollToTop/>
                    <Student title="Обучающимся - Кафедра управления инновациями"/>
                </>))}/>
                <Route path="/student/bach" exact component={(()=>(<>
                   <ScrollToTop/>
                    <StudentBach title="Бакалавру - Кафедра управления инновациями"/>
                </>))}/>
                <Route path="/student/mag" exact component={(()=>(<>
                    <ScrollToTop/>
                    <StudentMag title="Магистранту - Кафедра управления инновациями"/>
                </>))}/>
                <Route path="/degree" exact component={(()=>(<>
                    <ScrollToTop/>
                    <Developing/>
                </>))}/>
                <Route path="/docs" exact component={(()=>(<>
                    <ScrollToTop/>
                    <Docs title="Регламентирующие документы - Кафедра управления инновациями"/>
                </>))}/>
{/* Литература кафедры */}
                <Route path="/literature" component={(()=>(<>
                    {!background && <ScrollToTop/>}
                    <Route exact path="/literature">
                        <Redirect to="/literature/1"/>
                    </Route>
                    <Route exact path="/literature/:page">
                        <Literature title="Литература кафедры - Кафедра управления инновациями"/>
                    </Route>
                </>))}/>
                <Route exact path="/book/:id" component={()=>(<>
                    <ScrollToTop/>
                    <BookPage/>
                </>)}/>
                <Route path="/quiz" exact component={(()=>(<>
                    <ScrollToTop/>
                    <Quiz title="Опросы студентов - Кафедра управления инновациями"/>
                </>))}/>

{/* FOR ADMINISTRATION */}
                <Route path="/login" exact component={(()=>(<>
                    <ScrollToTop/>
                    {auth? <Redirect to="/admin"/>
                    :<Login title="Авторизация - Кафедра управления инновациями"/>}
                </>))}/>
                {auth && <Route path="/admin" component={( ()=>(<AdminRoutes/>) )}/>}
{/* NOT FOUND 404 */}
                <Route path="*" exact component={(()=>(<>
                    <ScrollToTop/>
                    <PageNotFound status={404}/>
                </>))}/>
            </Switch>
            <PageUpButton/>
{/* Модальные окна */}
            {background && <Route exact path="/staff/:id" component={StaffModal}/>}
            {background && <Route exact path="/book/:id" component={()=>(<BookModal/>)}/>}
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

    window.onscroll = function(scrolled){
        var scrolled = 0
        scrolled = window.scrollY
        scrolled>window.innerHeight ? setvisible(true) : setvisible(false)
    }

    return( 
        <button type="button" 
        id="PageUpButton"
        className={`btn ${visible? 'visible' : ''}`}
        onClick={()=>{window.scrollTo({top:0, behavior:'smooth'})}}>&#129045;</button>
    )
}