import React, { PureComponent, Fragment, memo } from 'react'
import './styles/Home.scss'
import './styles/default.scss'
import Fade from 'react-reveal/Fade'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faQuoteRight, faIdBadge } from '@fortawesome/free-solid-svg-icons'
import store from '../store'
import { closeNavbar } from '../redux/actions/navbarActions'
// import images
import GPO_img from './img/GPO_IDEA.svg';
import student_img from './img/STUDENT.svg';
import clubs_img from './img/DANCING.svg';
import { GetDataHome } from '../redux/actions/data_actions/HomeAction'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FeedbackComponent } from './About'
import { getfeedback } from '../redux/actions/data_actions/AboutActions'

export class Home extends PureComponent {

    state = {
        DegreeList: this.props.Degree.DegreeList
    }

    componentWillUnmount() {
        store.dispatch(closeNavbar())
    }

    componentDidMount() {
        document.title = this.props.title
        this.props.GetDataHome()

        const {FeedbackList, FeedbackType} = this.props

        if(!FeedbackList || FeedbackList.length === 0 || FeedbackType !== 2){
            this.props.getfeedback(2, true)
        }
    }

    componentDidUpdate(prevProps) {
        const { Degree } = this.props

        if (Degree !== prevProps.Degree) {
            this.setState({ DegreeList: Degree.DegreeList })
        } 
    }

    renderQuotes(){

        const {FeedbackList} = this.props

        if(!FeedbackList){
            return <Fragment/>
        }

        return <Fade>
            <section id="staffs_home">
                <div className="container-md container-fluid">
                    <div className="title_staffs text-center">
                        <h2>Сотрудники кафедры</h2>
                    </div>
                    <div className="row no-gutters justify-content-center">
                        {FeedbackList.map((quote, index) => {
                            return <FeedbackComponent
                                    key={index}
                                    index={index}
                                    feedback={quote}
                                />
                        })}
                    </div>
                    <div className="d-block text-center">
                        <Link className="more-link" to={{
                                pathname: '/about',
                                state: 'staff'
                            }}>Все сотрудники</Link>
                    </div>
                </div>
            </section>
        </Fade>

    }

    render() {

        const { DegreeList } = this.state

        // СТРАНИЦА
        return (
            <Fragment>
                {/* ЗАГОЛОВОК */}
                <Fade>
                    <section id="title_main">
                        <div className="container-md container-fluid bg_th" style={{ height: "inherit" }}>
                            <div className="row no-gutters justify-content-around align-items-center" style={{ height: "inherit" }}>
                                <div className="col-md-5 text-center title_text">
                                    <h1 className="title">Кафедра управления инновациями</h1>
                                    <div id="carouselTitle" className="carousel slide" data-ride="carousel">
                                        <div className="carousel-inner">
                                            <div className="carousel-item active" data-interval="7000">
                                                <p>Теория «Тройной спирали» (TripleHelix) создана в Англии и Голландии в начале XXI века профессором университета Ньюкастла Генри Ицковицем и профессором амстердамского университета Лойетом Лейдесдорфом.</p>
                                            </div>
                                            <div className="carousel-item" data-interval="7000">
                                                <p>Основу концепции «Тройной спирали» составляет взаимодействие между ключевыми элементами инновационной системы любой страны – властью, бизнесом и университетом.</p>
                                            </div>
                                            <div className="carousel-item" data-interval="10000">
                                                <p>Модель «Тройной спирали» показывает включение во взаимодействие определенных институтов на каждом этапе создания инновационного продукта. На начальном этапе генерации знаний взаимодействуют власть и университет, затем в ходе трансфера технологий университет сотрудничает с бизнесом, а на рынок результат выводится совместно властью и бизнесом.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-12">
                                    <div className="triple_helix">
                                        <TripleHelix/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Fade>
                <img className="arrow_down" onClick={()=>{
                    window.scrollTo({top: window.innerHeight-40, behavior: 'smooth'})
                }} src="/svg/DOWN_ARROW.svg" alt="Листать вниз"/>
                {/* НАПРАВЛЕНИЯ ПОДГОТОВКИ */}
                <Fade>
                    <section id="degree">
                        <div className="container-lg container-fluid">
                            <div className="row justify-content-center no-gutters">
                                <div className="col-12 col-md-8 align-content-center text-center title_degree">
                                    <h2>Направления подготовки</h2>
                                    <p>Кафедра управления инновациями – входит в состав факультета инновационных технологий ТУСУРа. Здесь готовят квалифицированных специалистов нового типа, способных разрабатывать инновационные проекты и программы коммерциализации нововведений и управлять ими для эффективного получения прибыли. Каждое направление подготовки является востребованным на рынке труда.</p>
                                </div>
                                <div className="w-100" />
                                <div className="degree_cards col-12">
                                    <div className="row no-gutters">
                                        {DegreeList && DegreeList.map(card => {
                                            return <div className="col-md-6 col-lg-4 col-sm-12">
                                                <Fade><CardDegree
                                                    num={card.num}
                                                    name={card.name}
                                                    type={card.type}
                                                    time={card.time}
                                                    profile={card.profile}
                                                    link={card.link}
                                                    bg={card.bg}
                                                    index={card.id}
                                                    key={card.id}
                                                /></Fade>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Fade>
                {/* ГПО */}
                <section id="GPO_home">
                    <div className="container">
                        <div className="row no-gutters align-items-center">
                            <Fade>
                                <div className="title_GPO col-md-5">
                                    <h2>Групповое проектное обучение</h2>
                                    <GPO_Text_Collapse />
                                    <a href='https://gpo.tusur.ru/chairs/26/projects' target="_blank" rel="noopener noreferrer" className=" more-link">Проекты кафедры</a >
                                </div>
                            </Fade>
                            <Fade>
                                <div className=" col-md-6 offset-md-1 align-self-center">
                                    <img className="img_GPO" src={GPO_img} alt="Групповое проектное обучение" />
                                </div>
                            </Fade>
                        </div>
                    </div>
                </section>
                {/* ВНЕУЧЕБНАЯ ДЕЯТЕЛЬНОСТЬ */}
                <Fade>
                    <section id="clubs_home">
                        <div className="container">
                            <div className="row no-gutters justify-content-between align-items-center">
                                <div className="col-md-5">
                                    <img className="img_clubs" src={clubs_img} alt="Внеучебная деятельность" />
                                </div>
                                <div className="title_clubs col-md-5 order-first order-md-5 align-self-center text-right">
                                    <h2>Внеучебная деятельность</h2>
                                    <p>
                                    Внеучебная деятельность способствует реализации обучающихся своих потребностей, интересов, 
                                    способностей в тех областях познавательной, социальной, культурной жизнедеятельности, 
                                    которые не могут быть реализованы в процессе учебных занятий и в рамках основных образовательных дисциплин.
                                    </p>
                                    <Link className="more-link" to={{
                                        pathname: '/student',
                                        state: 'clubs'
                                    }}>Клубы</Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </Fade>
                {this.renderQuotes()}
                {/* ТРУДОУСТРОЙСТВО */}
                <Fade>
                    <section id="work_home">
                        <div className="container">
                            <div className="row no-gutters justify-content-between">
                                <div className="title__workhome col-md-5">
                                    <h2>Трудоустройство</h2>
                                    <p>Поиск работы процесс многогранный. Здесь не так много жестко фиксированных требований, прописанных правил игры, универсальных решений. Скорее, это процесс полный творчества, позволяющий проявить свою креативность, острый ум и адаптивные навыки.</p>
                                    <p>
                                    В Томском государственном университете систем управления и радиоэлектроники существует <a href="https://tusur.ru/ru/o-tusure/struktura-i-organy-upravleniya/departament-obrazovaniya/tsentr-sodeystviya-trudoustroystvu-vypusknikov" rel="noopener noreferrer" target="_blank"> центр содействия трудоустройству выпускников</a>.
                                <br />Поиск работы процесс многогранный в котором учитывается не только как Вы составили резюме, но и как Вы ведете себя на собеседовании.
                                    </p>
                                    <Link className="more-link" to={{
                                        pathname: '/student',
                                        state: 'work'
                                    }}>Подробнее</Link>
                                </div>
                                <div className="img__workhome col-md-5 text-center">
                                    <img src={student_img} alt="Трудоустройство" />
                                </div>
                            </div>
                        </div>
                    </section>
                </Fade>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    Degree: state.api.degree,
    FeedbackList: state.api.feedback.FeedbackList,
    FeedbackType: state.api.feedback.type
})

export default connect(
    mapStateToProps,
    { GetDataHome, getfeedback }
)(Home)

const GPO_Text_Collapse = () => {
    return (
        <Fragment>
            <p>
                На факультете успешно развивается технология группового проектного обучения (ГПО) студентов. 
                Реализация проектов осуществляется преимущественно на базе предприятий-партнеров и научных лабораторий, 
                что способствует формированию и динамичному развитию профессиональных компетенций у студентов.
            </p>
            <p>
                Проект, над которым работает команда из 5-7 человек, должен стать реализацией новой идеи и воплотиться 
                в виде устройства, технологии или услуги. Обучающиеся имеют прекрасную возможность выводить 
                свои инновационные проекты на рынок со студенческой скамьи.
            </p>
            <div className="collapse" id="p_gpo_more">
                <p>
                Созданная на основе инновационной инфраструктуры университета и индустриальных партнеров факультета 
                система подготовки мотивированных кадров, способных создавать собственный бизнес, позволяет 
                студенчеству активно участвовать в престижных конкурсах технологических стартапов, 
                получать финансирование по программам федерального института развития Фонд содействия инноваций (программа «УМНИК»).
                </p>
                <p>
                В перспективе успешные предприятия, созданные в студенческом бизнес-инкубаторе и достигшие достаточного роста 
                в технологическом бизнес-инкубаторе  университета имеют возможность перейти в особую экономическую зону 
                технико-внедренческого типа «Томск».
                </p>
            </div>
            <a data-toggle="collapse" data-target="#p_gpo_more" aria-expanded="false" aria-controls="p_gpo_more" />
            <br/>
        </Fragment>
    )
}

// НАПРАВЛЕНИЯ ПОДГОТОВКИ
export const CardDegree = (props) => {
    return (
        <a href={props.link} target="_blank" rel="noopener noreferrer">
            <div
                className="card_deg card_bac"
                style={props.type === "Магистратура" ?
                    { backgroundPosition: "left", backgroundImage: `url(${props.bg})`, paddingLeft: "45px" }
                    : { backgroundImage: `url(${props.bg})` }}
            >
                <h5 data-name={props.name}>{props.num}</h5>
                <h6>{props.name} 
                    <span className="d-block" data-name={props.name}>{props.type}</span></h6>

                <p>
                    {props.time}
                    <span className="d-block">срок освоения</span>
                </p>
                <p>
                    {props.profile}
                    <span className="d-block">профиль</span>
                </p>
            </div>
        </a>
    )
}

// ЦИТАТЫ СОТРУДНИКОВ (ЭЛЕМЕНТ)
const QuoteStaff = memo(({quote}) => {

    const {color, name, post, degree, text} = quote

    return (
        <div className="col-md-6">
            <div className="row no-gutters">
                <div className="quote-staff">
                    <div className="quote-staff__info d-flex">
                        <Icon className="quote-staff__info__img" style={{ color }} icon={faIdBadge} />
                        <p className="quote-staff__info__name">
                            <strong>{name}</strong>
                            <br />
                            {post}
                        </p>
                        <Icon className="quote-staff__info__icon" style={{ color }} icon={faQuoteRight} />
                    </div>
                    <p className="quote-staff__quote">
                        {text}
                    </p>
                </div>
            </div>
        </div>
    )
})

const TripleHelix = memo(() => {
    return(
        <svg width="345" height="370" viewBox="0 0 345 370" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d)">
            {/* первая линия */}
            <path id="path1" d="M305 30.5C267 97.5 107.86 152.076 62.064 195.601C7.23501 247.707 48.5 297 48.5 297" stroke="white" strokeWidth="30" strokeLinecap="round" strokeDasharray="409.3562927246094" strokeDashoffset="-409.3562927246094">
                <animate id="path1" attributeName="stroke-dashoffset" values="-409.3562927246094; 0 "
                begin="200ms" dur="0.75s" repeatCount="1"  fill="freeze"  calcMode="ease"/>
            </path>
            <path d="M52.923 351.757C70.3603 351.757 84.496 337.621 84.496 320.184C84.496 302.747 70.3603 288.611 52.923 288.611C35.4857 288.611 21.35 302.747 21.35 320.184C21.35 337.621 35.4857 351.757 52.923 351.757Z" fill="white"/>
        </g>
        <g filter="url(#filter1_d)">
            {/* центральная линия */}
            <path id="path2" d="M206.677 27.676C146.598 75.776 43.976 95.053 35.479 164.204C26.999 233.216 167.5 275.5 167.5 305" 
            stroke="white" strokeWidth="30" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="428.020751953125" strokeDashoffset="-428.020751953125">
                <animate id="path2" attributeName="stroke-dashoffset" values="-428.020751953125; 0 "
                begin="350ms" dur="0.75s" repeatCount="1"  fill="freeze"  calcMode="ease"/>
            </path>
            <path d="M165.568 351.757C183.005 351.757 197.141 337.621 197.141 320.184C197.141 302.747 183.005 288.611 165.568 288.611C148.131 288.611 133.995 302.747 133.995 320.184C133.995 337.621 148.131 351.757 165.568 351.757Z" fill="white"/>
        </g>
        <g filter="url(#filter2_d)">
            {/* третья линия */}
            <path id="path3" d="M60.529 31.7321C-5.121 93.5871 45.817 138.39 119.108 176.418C148.397 193.19 262.525 250.854 290.19 295.295" stroke="white" strokeWidth="30" strokeLinecap="round" strokeDasharray="406.46551513671875" strokeDashoffset="-406.46551513671875">
                <animate id="path3" attributeName="stroke-dashoffset" values="-406.46551513671875; 0 "
                begin="500ms" dur="0.75s" repeatCount="1"  fill="freeze"  calcMode="ease"/>
            </path>
            <path d="M297.488 350.743C314.925 350.743 329.061 336.607 329.061 319.17C329.061 301.733 314.925 287.597 297.488 287.597C280.051 287.597 265.915 301.733 265.915 319.17C265.915 336.607 280.051 350.743 297.488 350.743Z" fill="white"/>
        </g>
        <defs>
        <filter id="filter0_d" x="3.60559" y="3.49738" width="331.397" height="366.26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
        <feOffset dy="3"/>
        <feGaussianBlur stdDeviation="7.5"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
        <filter id="filter1_d" x="5.10627" y="0.675476" width="231.571" height="369.082" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
        <feOffset dy="3"/>
        <feGaussianBlur stdDeviation="7.5"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
        <filter id="filter2_d" x="0.226768" y="4.73199" width="343.834" height="364.011" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
        <feOffset dy="3"/>
        <feGaussianBlur stdDeviation="7.5"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
        </defs>
        </svg>

    )
})