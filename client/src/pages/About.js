import React, { PureComponent, useState, Fragment, memo } from 'react'
import { connect } from 'react-redux'
import { GetStaffList } from '../redux/actions/staffActions'
import { useLocation, useParams, Link, withRouter } from 'react-router-dom'
import ParamsList from './components/ParamsList'

import { Icon } from '@iconify/react'
import idBadge from '@iconify/icons-fa-solid/id-badge'
import quoteRigth from '@iconify/icons-fa-solid/quote-right'

import './styles/About.scss'

import { Modal } from '../components/Modal'
import StaffPage from './components/Staff'
import { closeNavbar } from '../redux/actions/navbarActions'
import { GetDataAbout, getfeedback } from '../redux/actions/data_actions/AboutActions'

// import images
import interprice_img from './img/ENTERPRICES.svg';
import history_img from './img/HISTORY_PHOTO.jpg';

export class About extends PureComponent{

    state = {
        params_list: null,
        RPDList: this.props.RPDList.RPDList
    }

    componentDidMount() {
        document.title = this.props.title
        
        const {RPDList, StaffList, FeedbackList, location} = this.props

        if(!RPDList || RPDList.length === 0){
            this.props.GetDataAbout()
        }

        if(!StaffList || StaffList.length === 0){
            this.props.GetStaffList()
        }

        if(!FeedbackList || FeedbackList.length === 0){
            this.props.getfeedback(true)
        }

        if (location.state){
            setTimeout(() => {  
                const el = document.getElementById(location.state)
                if(el){
                    window.scrollTo({
                        top: el.offsetTop - 80,
                        behavior: "smooth" 
                    })
                }
            }, 300)
            
        }
    }

    componentWillUnmount() {
        this.props.closeNavbar()
    }

    renderRPDList(){
        const {RPDList} = this.props

        if(!RPDList){
            return <Fragment/>
        }

        return RPDList.map(disp => {
            return <a
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
        })

    }

    renderFeedback(){

        const { FeedbackList } = this.props

        if (!FeedbackList || FeedbackList.length === 0){
            return <Fragment/>
        }

        const FeedbackListFilter = FeedbackList.filter(feedback => feedback.type === 1)

        return <section id="feedback_inter">
            <h2 className="text-center">Отзывы о кафедре</h2>
            <div className="row no-gutters">
            {FeedbackListFilter.map((feedback, index) => {
                return <FeedbackComponent
                    key={index}
                    index={index}
                    feedback={feedback} />
            })}
            </div>
        </section>
    }

    render() {
        const { StaffList } = this.props

        return (
            <Fragment>
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
            <img className="arrow_down" onClick={()=>{
                window.scrollTo({top: window.innerHeight-40, behavior: 'smooth'})
            }} src="/svg/DOWN_ARROW.svg" alt="Листать вниз"/>
                {/* ИСТОРИЯ КАФЕДРЫ */}
            <div className="container">
                <section id="history_about">
                    <div className="row no-gutters align-items-center">
                        <div className="col-lg-6 col-md-7 title_about_history ">
                            <h2>История кафедры</h2>
                            <HistoryText />
                        </div>
                        <div className="col-lg-6 col-md-5 img_about_history text-right">
                            <img src={history_img} alt="История кафедры" />
                        </div>
                    </div>
                </section>
                
                <section id="staff">
                    <h2>Сотрудники кафедры</h2>
                    {StaffList && <StaffListMap StaffList={StaffList}/>}
                </section>

                <section id="disciplines">
                    <h2 className="text-center">Рабочие программы дисциплин</h2>
                    <div className="row no-gutters align-items-center justify-content-around row-cols-md-2 row-cols-1">
                        {this.renderRPDList()}
                    </div>
                </section>

                {this.renderFeedback()}

            </div>
                <ParamsList page="О кафедре"/>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    StaffList: state.api.staff.StaffList.StaffList,
    FeedbackList: state.api.feedback.FeedbackList,
    FeedbackType: state.api.feedback.FeedbackType,
    params_list: state.param.params_list,
    RPDList: state.api.rpd.RPDList
})

export default withRouter(connect(
    mapStateToProps,
    { GetStaffList, GetDataAbout, closeNavbar, getfeedback }
)(About))



export function StaffView() {
    let { fullname } = useParams()

    return <div className="container-md container-fluid">
        <StaffPage fullname_url={fullname} />
    </div>
}

export function StaffModal() {
    let { fullname } = useParams()

    return (
        <Modal>
            <StaffPage fullname_url={fullname} />
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
export const FeedbackComponent = memo(({feedback}) => {

    const {text, name, post, degree, color} = feedback

    const length = 160
    const [Expand, setExpand] = useState(text.length < length);
    const textExpand = Expand ? text : text.substr(0, length) + "..."

    return (
        <div className="col-md-6">
            <div className="row no-gutters">
                <div className="quote-staff">
                    <div className="quote-staff__info d-flex">
                        <Icon className="quote-staff__info__img" style={{ color: color ? color : "#354ED1" }} icon={idBadge} />
                        <p className="quote-staff__info__name">
                            <strong>{name}</strong>
                            {post && <Fragment><br/>{post}</Fragment> }
                            {degree && <Fragment><br/>{degree}</Fragment> }
                        </p>
                        <Icon className="quote-staff__info__icon" style={{ color: color ? color : "#354ED1" }} icon={quoteRigth} />
                    </div>
                    <div className="quote-staff__quote__block">
                        <div className="quote-staff__quote html-adaptive" dangerouslySetInnerHTML={{ __html: textExpand }} />
                        {text.length > length && <strong className="open-feedback" style={{ color: color ? color : "#354ED1" }}>
                            <a onClick={() => setExpand(!Expand)}>{Expand ? "Свернуть" : "Показать полностью"}</a>
                        </strong>}
                    </div>
                </div>
            </div>
        </div>
    )
})

// СОТРУДНИК КАФЕДРЫ
function Staff({staff}) {

    const { fullname_url, firstname, lastname, secondname } = staff

    let location = useLocation()

    return (
        <div className="col_p col-md-4 col-lg-3 col-6">
            <Link className="StaffCard d-flex" to={{
                pathname: `/staff/${fullname_url}`,
                state: { background: location }
            }}>
                <div className="staff__photo"><Icon icon={idBadge} /></div>
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
        key={index}
        index={index}
        staff={staffuser}
    />)}</div> 
})