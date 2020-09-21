import React, { Component, useState, Fragment, memo } from 'react'
import { connect } from 'react-redux'
import { GetStaffList } from '../redux/actions/staffActions'
import { useLocation, useParams, Link, withRouter } from 'react-router-dom'
import ParamsList from './components/ParamsList'

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faIdBadge, faQuoteRight } from '@fortawesome/free-solid-svg-icons'

import './styles/About.scss'
import Fade from 'react-reveal/Fade'

import { Modal } from '../components/Modal'
import StaffPage from './components/Staff'
import { closeNavbar } from '../redux/actions/navbarActions'
import { GetDataAbout, getfeedback } from '../redux/actions/data_actions/AboutActions'

// import images
import interprice_img from './img/ENTERPRICES.svg';
import history_img from './img/HISTORY_PHOTO.jpg';

export class About extends Component {

    state = {
        params_list: null,
        FeedbackList: this.props.FeedbackList.FeedbackList,
        RPDList: this.props.RPDList.RPDList
    }

    componentDidMount() {
        document.title = this.props.title
        this.props.GetDataAbout()
        this.props.GetStaffList()
        this.props.getfeedback()

        const loc = this.props.location.state
        // console.log(loc);
        if (loc){
            setTimeout(() => {  
                const el = document.getElementById(loc)
                if(el){
                    window.scrollTo({
                        top: document.getElementById(loc).offsetTop - 80,
                        behavior: "smooth" 
                    })
                }
            }, 300);
        }
    }

    componentDidUpdate(prevProps) {
        const { RPDList } = this.props
        // console.log(this.props);
        if (RPDList !== prevProps.RPDList) {
            this.setState({ RPDList: RPDList.RPDList })
        }
    }

    componentWillUnmount() {
        this.props.closeNavbar()
    }

    //РЕНДЕР
    render() {
        const { RPDList } = this.state
        // console.log(this.state);
        const { StaffList, FeedbackList } = this.props

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
                <img className="arrow_down" onClick={()=>{
                    window.scrollTo({top: window.innerHeight-40, behavior: 'smooth'})
                }} src="/svg/DOWN_ARROW.svg" alt="Листать вниз"/>
                {/* ИСТОРИЯ КАФЕДРЫ */}
                <Fade>
                    <section id="history_about">
                        <div className="container">
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
                            {StaffList && <StaffListMap StaffList={StaffList}/>}
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
                {/* ОТЗЫВЫ ОТ ПРЕДПРИЯТИЙ */}
                <Fade>
                    <section id="feedback_inter">
                        <div className="container-md container-fluid">
                            <h2 className="text-center">Отзывы о кафедре</h2>
                            <div className="row no-gutters">
                                {/* {console.log(typeof(feedback))} */}
                                {FeedbackList && FeedbackList.map((res, index) => {
                                    return <FeedbackStaff
                                        key={index}
                                        name={res.name}
                                        post={res.post}
                                        degree={res.degree}
                                        text={res.text} />
                                })}
                            </div>
                        </div>
                    </section>
                </Fade>
                <ParamsList page="О кафедре"/>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    StaffList: state.api.staff.StaffList.StaffList,
    FeedbackList: state.api.feedback.FeedbackList,
    params_list: state.param.params_list,
    RPDList: state.api.rpd
})

export default withRouter(connect(
    mapStateToProps,
    { GetStaffList, GetDataAbout, closeNavbar, getfeedback }
)(About))



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
            <div>
                <p>
                Кафедра управления инновациями была создана в октябре 2009 года приказом ректора
                (Приказ № 11276 от 30.10.2009г.) в соответствии с концепцией развития учебно-научно-инновационного
                комплекса ТУСУР.
                </p>
                <div className="collapse" id="p_more">
                    <p>Основал  кафедру Уваров Александр Фавстович, будучи проректором по инновационному развитию и международной деятельности, 
                        директором Института инноватики.</p>
                    <p>Уваров А.Ф. в составе авторского коллектива удостоен премии Правительства Российской Федерации 
                        2010 года в области образования за создание нового направления высшего профессионального образования «Инноватика», 
                        его научное и учебно-методическое обеспечение, экспериментальную отработку и широкое внедрение в отечественных 
                        университетах.</p>
                </div>
                <p>Сегодня кафедра Управления инновациями в составе факультета инновационных технологий и Института инноватики 
                    является ключевым элементом инновационной инфраструктуры университета, обеспечивающим подготовку квалифицированных 
                    кадров для высокотехнологичных отраслей экономики по передовым направлениям – инноватике, 
                    мехатронике и робототехнике, управлению качеством.
                </p>
            </div>
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
    const length = 160
    const [Expand, setExpand] = useState(props.text.length < length);
    const text = Expand ? props.text : props.text.substr(0, length) + "..."
    return (
        <div className="col-md-6">
            <div className="row no-gutters">
                <div className="quote-staff">
                    {/* img and name :after(quote) | quote */}
                    <div className="quote-staff__info d-flex">
                        <Icon className="quote-staff__info__img" style={{ color: "#354ED1" }} icon={faIdBadge} />
                        <p className="quote-staff__info__name">
                            <strong>{props.name}</strong>
                            <br />
                            {props.post}
                            <br />
                            {props.degree}
                        </p>
                        <Icon className="quote-staff__info__icon" style={{ color: "#354ED1" }} icon={faQuoteRight} />
                    </div>
                    <div className="quote-staff__quote__block">
                        <div className="quote-staff__quote" dangerouslySetInnerHTML={{ __html: text }} />
                        {props.text.length > length && <strong className="open-feedback"><a onClick={() => setExpand(!Expand)}>{Expand ? "Свернуть" : "Показать полностью"}</a></strong>}
                    </div>
                </div>
            </div>
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
                        {`${firstname} ${secondname ? secondname : ''}`}
                    </p>
                </div>
            </Link>
        </div>
    )
}

export const StaffListMap = memo(({StaffList})=>{
    return  <div className="row no-gutters"> 
    {StaffList.map((staffuser, index) => <Staff
        key={staffuser._id}
        id={staffuser._id}
        index={index}
        firstname={staffuser.firstname}
        lastname={staffuser.lastname}
        secondname={staffuser.secondname}
    />)}</div> 
})