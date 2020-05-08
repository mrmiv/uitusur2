import React, { Component, useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { GetStaffList } from '../redux/actions/staffActions'
import { useLocation, useParams, Link } from 'react-router-dom'

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faIdBadge } from '@fortawesome/free-solid-svg-icons'

import './styles/About.scss'
import Fade from 'react-reveal/Fade'

import { Modal } from '../components/Modal'
import StaffPage from './components/Staff'
import { closeNavbar } from '../redux/actions/navbarActions'
import { GetDataAbout } from '../redux/actions/data_actions/AboutActions'

// import images
import interprice_img from './img/ENTERPRICES.svg';
import knowledge_img from './img/knowledge_.svg';
import history_img from './img/HISTORY_PHOTO.jpg';
import CMK_img from './img/QUALITY_CHECK.svg';

export class About extends Component {

    state = {
        param_CMK: null,
        param_trophy: null,
        FeedbackList: this.props.FeedbackList.FeedbackList,
        RPDList: this.props.RPDList.RPDList
    }

    componentDidMount() {
        document.title = this.props.title
        this.props.GetDataAbout()
        this.props.GetStaffList()

    }

    componentDidUpdate(prevProps) {
        const { FeedbackList, RPDList, params_list } = this.props
        // console.log(this.props);
        if (FeedbackList !== prevProps.FeedbackList) {
            this.setState({ FeedbackList: FeedbackList.FeedbackList })
        } else if (RPDList !== prevProps.RPDList) {
            this.setState({ RPDList: RPDList.RPDList })
        }

        const param_CMK = params_list.find(item => {
            return item.page === "О кафедре" && item.title === "Документы СМК"
        })

        const param_trophy = params_list.find(item => {
            return item.page === "О кафедре" && item.title === "Достижения кафедры"
        })

        if (params_list.length !== 0) {
            if (param_CMK && !this.state.param_CMK) {
                this.setState({ param_CMK })
            } else if (param_trophy && !this.state.param_trophy) {
                this.setState({ param_trophy })
            }
        }
    }

    componentWillUnmount() {
        this.props.closeNavbar()
    }

    //РЕНДЕР
    render() {
        const { RPDList, param_CMK, param_trophy, FeedbackList } = this.state
        // console.log(this.state);
        const { StaffList } = this.props

        return (
            <Fragment>
                {/* ЗАГОЛОВОК */}
                <Fade>
                    <section id="title_main" className="about">
                        <div className="container-md container-fluid bg_th" style={{ height: "inherit" }}>
                            <div className="row no-gutters align-items-center" style={{ height: "inherit" }}>
                                <div className="col-md-5 offset-md-1 text-center title_text">
                                    <h1 className="title">О кафедре</h1>
                                    <p>Кафедра является структурным подразделением Факультета инновационных технологий.
                            Заведующий кафедрой — доцент, кандидат физико-математических наук <span style={{ color: "#DE7128" }}>Нариманова Гуфана Нурлабековна</span>.</p>
                                </div>
                                <div className="col-md-4 col-12 offset-md-1 ">
                                    <div className="triple_helix">
                                        <img className="triple_helix_svg" src={interprice_img} alt="О кафедре" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Fade>
                {/* <Icon icon={faArrowCircleDown}/> */}
                <img className="arrow_down blue" src="/svg/DOWN_ARROW.svg" alt="Листайте страницу дальше" />
                {/* ИСТОРИЯ КАФЕДРЫ */}
                <Fade>
                    <section id="history_about">
                        <div className="container-md container-fluid">
                            <div className="row no-gutters align-items-center">
                                <div className="col-lg-6 col-md-7 title_about_history ">
                                    <h2>История кафедры</h2>
                                    <HistoryText />
                                </div>
                                <div className="col-lg-6 col-md-5 img_about_history text-right">
                                    <img src={history_img} alt="История кафедры" />
                                </div>
                            </div>
                        </div>
                    </section>
                </Fade>
                {/* СОТРУДНИКИ КАФЕДРЫ */}
                <Fade>
                    <section id="staff">
                        <div className="container-md container-fluid">
                            <h2>Сотрудники кафедры</h2>
                            <div className="row no-gutters">
                                {StaffList && StaffList.map((staffuser, index) => <Staff
                                    key={staffuser._id}
                                    id={staffuser._id}
                                    index={staffuser.index}
                                    firstname={staffuser.firstname}
                                    lastname={staffuser.lastname}
                                    secondname={staffuser.secondname}
                                />)}
                            </div>
                        </div>
                    </section>
                </Fade>
                {/* РАБОЧИЕ ПРОГРАММЫ ДИСЦИПЛИН */}
                <Fade>
                    <section id="disciplines">
                        <div className="container-md container-fluid">
                            <h2 className="text-center">Рабочие программы дисциплин</h2>
                            <div className="row no-gutters align-items-center justify-content-around row-cols-md-2 row-cols-1">
                                {RPDList && RPDList.map(disp => {
                                    return (
                                        <a
                                            href={disp.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`order-${disp.id} order-md-${disp.ord} col-md-5`}
                                            key={disp.id}>
                                            <DispCard
                                                num={disp.num}
                                                name={disp.name}
                                                profile={disp.profile}
                                                color={disp.color}
                                                type={disp.type}
                                                link={disp.link} />
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    </section>
                </Fade>
                {/* Достижения кафедры */}
                {param_trophy && <Fade>
                    <section id="trophy_about">
                        <div className="container-fluid container-md">
                            <div className="row no-gutters justify-content-between align-items-center">
                                <div className="col-md-6 col-lg-5 col-12">
                                    <div className="text_trophy" dangerouslySetInnerHTML={{ __html: param_trophy.text }} />
                                </div>
                                <div className="col-md-6 col-lg-5 col-12">
                                    <div className="image_trophy">
                                        <img src={knowledge_img} alt="Достижения кафедры" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Fade>}
                {/* ОТЗЫВЫ ОТ ПРЕДПРИЯТИЙ */}
                <Fade>
                    <section id="feedback_inter">
                        <div className="container-md container-fluid">
                            <h2 className="text-center">Отзывы выпускников</h2>
                            <div className="row no-gutters">
                                {/* {console.log(typeof(feedback))} */}
                                {FeedbackList && FeedbackList.map(res => {
                                    return <div className="col-12" key={res.id}>
                                        <FeedbackStaff
                                            firstName={res.firstName}
                                            lastName={res.lastName}
                                            post={res.post}
                                            degree={res.degree}
                                            text={res.text} />
                                    </div>
                                })}
                            </div>
                        </div>
                    </section>
                </Fade>
                {/* СМК */}
                {param_CMK && <Fade><section id="CMK">
                    <div className="container-md container-fluid">
                        <h2>Система менеджмента качества</h2>
                        <div className="row no-gutters align-items-center">
                            <div className="col-md-6">
                                <div className="CMK-docs" dangerouslySetInnerHTML={{ __html: param_CMK.text }} />
                            </div>
                            <div className="col-md-6 order-md-first img_CMK">
                                <img src={CMK_img} alt="Система менеджмента качества" />
                            </div>
                        </div>
                    </div>
                </section></Fade>}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    StaffList: state.api.staff.StaffList.StaffList,
    FeedbackList: state.api.feedback,
    params_list: state.param.params_list,
    RPDList: state.api.rpd
})

export default connect(
    mapStateToProps,
    { GetStaffList, GetDataAbout, closeNavbar }
)(About)



export function StaffView() {
    let { id } = useParams()

    return <div className="container-md container-fluid">
        <StaffPage id={id} />
    </div>
}

export function StaffModal() {
    let { id } = useParams()

    return (
        <Modal>
            <StaffPage id={id} />
        </Modal>
    )
}

const HistoryText = () => {
    return (
        <Fragment>
            <p>
                Кафедра управления инновациями была создана в октябре 2009 года приказом ректора
                (Приказ № 11276 от 30.10.2009г.) в соответствии с концепцией развития учебно-научно-инновационного
                комплекса ТУСУР.
        <div className="collapse" id="p_more">
                    <pre />
            Основал  кафедру Уваров Александр Фавстович, будучи проректором по инновационному развитию и международной деятельности, директором Института инноватики.
            <pre />
            Уваров А.Ф. в составе авторского коллектива удостоен премии Правительства Российской Федерации 2010 года в области образования за создание нового направления высшего профессионального образования «Инноватика», его научное и учебно-методическое обеспечение, экспериментальную отработку и широкое внедрение в отечественных университетах.
        </div>
                <pre />
        Сегодня кафедра Управления инновациями в составе факультета инновационных технологий и Института инноватики является ключевым элементом инновационной инфраструктуры университета, обеспечивающим подготовку квалифицированных кадров для высокотехнологичных отраслей экономики по передовым направлениям – инноватике, мехатронике и робототехнике, управлению качеством.
    </p>
            <a data-toggle="collapse" data-target="#p_more" aria-expanded="false" aria-controls="p_more" />
        </Fragment>
    )
}

// РАБОЧИЕ ПРОГРАММЫ ДИСЦИПЛИН
const DispCard = (props) => {
    return (
        <a href={props.link} target="_blank" rel="noopener noreferrer">
            <div className="DispCard">
                <h5 style={{ color: props.color }}>{props.num} <span>{props.type}</span></h5>
                <p style={{ color: props.color }}><span>{props.name}</span><br />{props.profile}</p>
            </div>
        </a>

    )
}

// ОТЗЫВ
const FeedbackStaff = (props) => {
    const [Expand, setExpand] = useState(props.text.length < 180);
    return (
        <div className="row no-gutters feedback__staff align-items-center">
            <div className="col-md-3">
                <div className="feedback__staff__info d-flex">
                    <Icon className="info__icon" icon={faIdBadge} />
                    <p className="info__name">
                        <strong>
                            {props.lastName}<br />{props.firstName}
                        </strong>
                        <br />
                        {props.post}
                        <br />
                        {props.degree}
                    </p>
                </div>
            </div>
            {/* добавить атрибут open из state,  и переключать динамически */}
            <p className="feedback__staff__text col-md-9">
                {Expand ? props.text : props.text.substr(0, 180) + "..."}
                <br />
                <strong><a onClick={() => setExpand(!Expand)}>{Expand ? "Свернуть" : "Показать полностью"}</a></strong>
            </p>
        </div>
    )
}

// CMK ДОКУМЕНТЫ
const CMK = () => {
    return (
        <div className="doc_CMK">
            <p>
                <Icon icon={faFileAlt} size={"lg"} />
                <span>ГОСТ 1234.55</span>
            </p>
        </div>
    )
}

// СОТРУДНИК КАФЕДРЫ
function Staff({ id, firstname, lastname, secondname }) {

    let location = useLocation()

    return (
        <div className="col_p col-md-4 col-lg-3 col-6">
            <Link className="StaffCard d-flex" to={{
                pathname: `/staff/${id}`,
                state: { background: location }
            }}>
                <div className="staff__photo"><Icon icon={faIdBadge} /></div>
                <div className="staff__name align-self-center">
                    <p>
                        <span>{lastname}</span> <br />
                        {firstname + " " + secondname}
                    </p>
                </div>
            </Link>
        </div>
    )
}