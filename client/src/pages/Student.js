import React, { Component, Fragment } from 'react'
import store from '../store'

import { connect } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'

import './styles/Student.scss'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'
import { toDate } from './components/NewsList'
import Fade from 'react-reveal/Fade'
// import {Modal} from '../components/Modal'
import { closeNavbar } from '../redux/actions/navbarActions'
import { GetAllCurators } from '../redux/actions/data_actions/curatorActions'
import { getClubs } from '../redux/actions/data_actions/clubsAction'
import { getCourseSP, getSP } from '../redux/actions/data_actions/spActionns'

// import images
import student_img from './img/student2.svg';
import curator_img from './img/PERSONAL_CURATOR.svg';
import dashboard_img from './img/DASHBOARD.svg';
import career_img from './img/CAREER.svg';

export class Student extends Component {

    state = {
        StudyPlan: null
    }

    componentWillUnmount() {
        store.dispatch(closeNavbar())
    }

    componentDidMount() {
        document.title = this.props.title
        this.props.getSP()
        this.props.GetAllCurators()
        this.props.getClubs()
    }

    componentDidUpdate(prevProps) {
        const { StudyPlan } = this.props

        if (StudyPlan !== prevProps.StudyPlan) {
            this.setState({ StudyPlan: StudyPlan })
        }
    }

    onChooseYear = course => {
        this.props.getCourseSP(course)
    }

    onBack = () => {
        this.setState({ StudyPlan: null })
    }

    scrollTo = (id) => {
        let el = document.getElementById(id)
        let offsetTop = el.offsetTop
        window.scrollTo({
            top: offsetTop - 100,
            behavior: 'smooth'
        })
    }

    render() {
        const { StudyPlan } = this.state
        const { ClubsList, Curators } = this.props

        const sp_btns = [
            { name: "Бак. - 1", course: 1 },
            { name: "Бак. - 2", course: 2 },
            { name: "Бак. - 3", course: 3 },
            { name: "Бак. - 4", course: 4 },
            { name: "Маг. - 1", course: 5 },
            { name: "Маг. - 2", course: 6 },
        ]

        return (
            <Fragment>
                {/* ЗАГОЛОВОК */}
                <Fade>
                    <section id="title_main" className="student">
                        <div className="container-md container-fluid bg_th" style={{ height: "inherit" }}>
                            <div className="row no-gutters align-items-center" style={{ height: "inherit" }}>
                                <div className="col-md-5 offset-md-1 text-center title_text">
                                    <h1 className="title">Обучающимся</h1>
                                    <div className="hash_list">
                                        <a onClick={() => this.scrollTo('studyplan')} className="link"><Icon icon={faHashtag} />  Учебный график</a>
                                        <a onClick={() => this.scrollTo('work')} className="link"> <Icon icon={faHashtag} />  Трудоустройство</a>
                                        <a onClick={() => this.scrollTo('curator')} className="link"> <Icon icon={faHashtag} />  Кураторы студентов</a>
                                        <a onClick={() => this.scrollTo('clubs')} className="link"> <Icon icon={faHashtag} />  Внеучебная деятельность</a>
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 offset-md-1 ">
                                    <div className="triple_helix">
                                        <img className="triple_helix_svg" src={student_img} alt="Обучающимся" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Fade>
                {/* УЧЕБНЫЙ ГРАФИК */}
                <Fade>
                    <section id="studyplan">
                        <div className="container-md container-fluid">
                            <div className="text-center">
                                <h2>Учебный график на 2019 - 2020 учебный год</h2>
                                <div className="choose_field mt-2">
                                    {sp_btns.map(btn => {
                                        return (<button type="button" className="more-link" onClick={() => this.onChooseYear(btn.course)}>{btn.name}</button>)
                                    })}
                                </div>
                            </div>
                            <div className="year_choose w-75 text-center">
                                {!StudyPlan ?
                                    <img src={dashboard_img} alt="Учебный план" />
                                    :
                                    <div className="table_plan table-responsive mt-3">
                                        {/* <button type="button" className="btn btn-danger" onClick={()=>this.onBack()}>&times;</button> */}
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Группа</th>
                                                    {StudyPlan.slice(0, 1).map(sp => {
                                                        return (<Fragment>
                                                            {sp.exam ? <th scope="col">Экзамены</th> : null}
                                                            {sp.practic ? <th scope="col">Практика</th> : null}
                                                            {sp.gia ? <th scope="col">ГИА</th> : null}
                                                            {sp.weekend ? <th scope="col">Каникулы</th> : null}
                                                        </Fragment>)
                                                    })}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {StudyPlan.map((sp, index) => {
                                                    return (<tr key={index}>
                                                        <td>{sp.group}</td>
                                                        {sp.exam ?
                                                            <td>
                                                                {sp.exam.from && <Fragment><strong>c</strong> {toDate(sp.exam.from)}</Fragment>}<br />
                                                                {sp.exam.to && <Fragment><strong>по</strong> {toDate(sp.exam.to)}</Fragment>}
                                                            </td> : null}
                                                        {sp.practic ?
                                                            <td>
                                                                {sp.practic.type && sp.practic.type}<br />
                                                                {sp.practic.from && <Fragment><strong>c</strong> {toDate(sp.practic.from)}</Fragment>}<br />
                                                                {sp.practic.to && <Fragment><strong>по</strong> {toDate(sp.practic.to)}</Fragment>}
                                                            </td> : null}
                                                        {sp.gia ?
                                                            <td>
                                                                {sp.gia.from && <Fragment><strong>c</strong> {toDate(sp.gia.from)}</Fragment>}
                                                                <br />
                                                                {sp.gia.to && <Fragment><strong>по</strong> {toDate(sp.gia.to)}</Fragment>}
                                                            </td> : null}
                                                        {sp.weekend ?
                                                            <td>
                                                                {sp.weekend.from && <Fragment> <strong>c</strong> {toDate(sp.weekend.from)}</Fragment>}
                                                                <br />
                                                                {sp.weekend.to && <Fragment><strong>по</strong> {toDate(sp.weekend.to)}</Fragment>}
                                                            </td> : null}
                                                    </tr>)
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                }
                            </div>
                        </div>
                    </section>
                </Fade>
                {/* ТРУДОУСТРОЙСТВО */}
                <Fade>
                    <section id="work">
                        <div className="container-md container-fluid">
                            <div className="row no-gutters justify-content-between align-items-center">
                                <div className="work__title col-md-6 col-sm-6">
                                    <h2>Трудоустройство</h2>
                                    <p> <a href="https://tusur.ru/ru/o-tusure/struktura-i-organy-upravleniya/departament-obrazovaniya/tsentr-sodeystviya-trudoustroystvu-vypusknikov"
                                        rel="noopener noreferrer"
                                        target="_blank">Центр содействия трудоустройству выпускников</a> создан с целью содействия реализации прав студентов
                                         и молодых специалистов в трудоустройстве, отвечающих их личным интересам и общественным потребностям.
                                    <pre />
                                        Задачи Центра содействия трудоустройству выпускников заключаются в содействии трудоустройству выпускников
                                        университета, организации и мониторинге первичного трудоустройства выпускников университета,
                                        сопровождении автоматизированных средств управления процессом содействия трудоустройству
                                        выпускников «АИСТ» и «Выпускник», организации и участии
                                        в проектах «Лучшие выпускники вузов Томска», «Бал выпускников-отличников вузов Томска».
                                    </p>
                                    <a className="more-link" href="https://tomsk.hh.ru/article/311410"
                                        target="_blank" rel="noopener noreferrer">Как составить резюме</a>
                                    <br />
                                    <a className="more-link" href="https://hr-portal.ru/article/10-sekretov-uspeshnogo-sobesedovaniya"
                                        target="_blank" rel="noopener noreferrer" style={{ top: "35px" }}>Секреты успешного собеседования</a>
                                </div>
                                <div className="work__img col-sm-6 col-md-5">
                                    <img src={career_img} alt="Трудоустройство" />
                                </div>
                            </div>
                        </div>
                    </section>
                </Fade>
                {/* КУРАТОРЫ */}
                <Fade>
                    <section id="curator">
                        <div className="container-md container-fluid">
                            <div className="row no-gutters justify-content-center align-items-center">
                                <h2> Кураторы студентов</h2>
                                <div className="w-100" />
                                <div className="col-md-4 curator_img">
                                    <img src={curator_img} alt="Кураторы групп" />
                                </div>
                                <table className="table table-bordered col-md-8">
                                    <thead>
                                        <tr>
                                            <th scope="col">Группа</th>
                                            <th scope="col">Куратор</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Curators && Curators.map(curator => { return (<Curator curator={curator} />) })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </Fade>
                {/* ВНЕУЧЕБНАЯ ДЕЯТЕЛЬНОСТЬ */}
                <Fade>
                    <section id="clubs">
                        <div className="container-md container-fluid">
                            <div className="row no-gutters">
                                <h2> Внеучебная деятельность</h2>
                                <div className="w-100" />
                                {ClubsList && ClubsList.map(club => {
                                    return (<div className="col-lg-2 col-md-3 col-6">
                                        <a href={club.path}
                                            target={"_blank"}
                                            rel="noopener noreferrer">
                                            <Club
                                                key={club.id}
                                                name={club.name}
                                                image={club.image} />
                                        </a>
                                    </div>)
                                })}
                            </div>
                        </div>
                    </section>
                </Fade>
            </Fragment>
        )
    }

}

const mapStateToProps = state => ({
    Curators: state.api.curators.CuratorList,
    ClubsList: state.api.clubs.ClubsList,
    StudyPlan: state.api.studyplan.courseSP
})

export default connect(
    mapStateToProps,
    { GetAllCurators, getCourseSP, getClubs, getSP }
)(Student)

const Club = ({ name, image }) => {
    return (
        <div className="card_club">
            <img src={image} class="card_club__img" alt={name} />
            <p className="card_club__body"><strong>{name}</strong></p>
        </div>
    )
}

function Curator({ curator }) {

    let location = useLocation()

    return (
        <tr>
            <td>{curator.group}</td>
            <td><Link to={{
                pathname: `/staff/${curator.staff_id}`,
                state: { background: location }
            }}> <Icon style={{ color: "#354ED1", marginRight: "5px" }} icon={faHashtag} />
                {curator.lastname + " " + curator.firstname[0] + ". " + curator.secondname[0] + "."}</Link></td>
        </tr>
    )
}