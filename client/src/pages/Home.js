import React, { Component, Fragment } from 'react'
import './styles/Home.scss'
import './styles/default.scss'
import Fade from 'react-reveal/Fade'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faQuoteRight, faIdBadge } from '@fortawesome/free-solid-svg-icons'
import store from '../store'
import { closeNavbar } from '../redux/actions/navbarActions'
import { HashLink } from 'react-router-hash-link'
// import images
import tripleHelix_img from './img/FIT_LOGO_TITLE.svg';
import GPO_img from './img/GPO_IDEA.svg';
import student_img from './img/STUDENT.svg';
import clubs_img from './img/DANCING.svg';
import { GetDataHome } from '../redux/actions/data_actions/HomeAction'
import { connect } from 'react-redux'

export class Home extends Component {

    state = {
        DegreeList: this.props.Degree.DegreeList,
        QuoteList: this.props.Quote.QuoteList,
    }

    componentWillUnmount() {
        store.dispatch(closeNavbar())
    }

    componentDidMount() {
        document.title = this.props.title
        this.props.GetDataHome()
    }

    componentDidUpdate(prevProps) {
        const { Degree, Quote } = this.props

        if (Degree !== prevProps.Degree) {
            this.setState({ DegreeList: Degree.DegreeList })
        } else if (Quote !== prevProps.Quote) {
            this.setState({ QuoteList: Quote.QuoteList })
        }
    }

    render() {

        const { DegreeList, QuoteList } = this.state

        // СТРАНИЦА
        return (
            <Fragment>
                {/* ЗАГОЛОВОК */}
                <Fade>
                    <section id="title_main">
                        <div className="container-md container-fluid bg_th" style={{ height: "inherit" }}>
                            <div className="row no-gutters align-items-center" style={{ height: "inherit" }}>
                                <div className="col-md-5 offset-md-1 text-center title_text">
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
                                        {/* <a className="carousel-control-prev" href="#carouselTitle" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Предыдущий</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselTitle" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Следующий</span>
                        </a> */}
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 offset-md-1 ">
                                    <div className="triple_helix">
                                        <img className="triple_helix_svg" src={tripleHelix_img} alt="Тройная спираль" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Fade>
                <img className="arrow_down" src="/svg/DOWN_ARROW.svg" />
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
                                        На факультете работают специальные лаборатории, оснащенные вычислительной техникой,
                                        современным  оборудованием и измерительными приборами.
                            <br />
                            В любой момент студент может получить консультацию или обратиться
                            за помощью к преподавателям факультета.
                            </p>
                                    <HashLink className="more-link" smooth to={{
                                        pathname: '/student',
                                        hash: 'clubs'
                                    }}>Клубы</HashLink>
                                </div>
                            </div>
                        </div>
                    </section>
                </Fade>
                {/* СОТРУДНИКИ КАФЕДРЫ */}
                <Fade>
                    <section id="staffs_home">
                        <div className="container-md container-fluid">
                            <div className="row no-gutters justify-content-center">
                                <div className="title_staffs text-center">
                                    <h2>Сотрудники кафедры</h2>
                                </div>
                                <div className="w-100" />
                                {QuoteList && QuoteList.map(staff => {
                                    return (
                                        <QuoteStaff
                                            key={staff.id}
                                            firstName={staff.firstName}
                                            lastName={staff.lastName}
                                            post={staff.post}
                                            photo={staff.photo}
                                            quote={staff.quote}
                                            color={staff.color}
                                        />)
                                })}
                                <HashLink smooth className="more-link" to={{
                                    pathname: '/about',
                                    hash: 'staff'
                                }}>Все сотрудники</HashLink>
                            </div>
                        </div>
                    </section>
                </Fade>
                {/* ТРУДОУСТРОЙСТВО */}
                <Fade>
                    <section id="work_home">
                        <div className="container">
                            <div className="row no-gutters justify-content-between">
                                <div className="title__workhome col-md-5">
                                    <h2>Трудоустройство</h2>
                                    <p>Поиск работы процесс многогранный. Здесь не так много жестко фиксированных требований, прописанных правил игры, универсальных решений. Скорее, это процесс полный творчества, позволяющий проявить свою креативность, острый ум и адаптивные навыки.
                                <pre />В Томском государственном университете систем управления и радиоэлектроники существует <a href="https://tusur.ru/ru/o-tusure/struktura-i-organy-upravleniya/departament-obrazovaniya/tsentr-sodeystviya-trudoustroystvu-vypusknikov" rel="noopener noreferrer" target="_blank"> центр содействия трудоустройству выпускников</a>.
                                <br />Поиск работы процесс многогранный в котором учитывается не только как Вы составили резюме, но и как Вы ведете себя на собеседовании.
                            </p>
                                    <HashLink smooth className="more-link" to={{
                                        pathname: '/student',
                                        hash: 'work'
                                    }}>Подробнее</HashLink>
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
    Quote: state.api.quotes
})

export default connect(
    mapStateToProps,
    { GetDataHome }
)(Home)

const GPO_Text_Collapse = () => {
    return (
        <>
            <p>
                На факультете успешно развивается технология группового проектного обучения (ГПО) студентов. Реализация проектов осуществляется преимущественно на базе предприятий-партнеров и научных лабораторий, что способствует формированию и динамичному развитию профессиональных компетенций у студентов.
    <pre />
    Проект, над которым работает команда из 5-7 человек, должен стать реализацией новой идеи и воплотиться в виде устройства, технологии или услуги. Обучающиеся имеют прекрасную возможность выводить свои инновационные проекты на рынок со студенческой скамьи.
    <div className="collapse" id="p_gpo_more">
                    <pre />
        Созданная на основе инновационной инфраструктуры университета и индустриальных партнеров факультета система подготовки мотивированных кадров, способных создавать собственный бизнес, позволяет студенчеству активно участвовать в престижных конкурсах технологических стартапов, получать финансирование по программам федерального института развития Фонд содействия инноваций (программа «УМНИК»).
        <pre />
        В перспективе успешные предприятия, созданные в студенческом бизнес-инкубаторе и достигшие достаточного роста в технологическом бизнес-инкубаторе  университета имеют возможность перейти в особую экономическую зону технико-внедренческого типа «Томск».
        </div>
            </p>
            <a data-toggle="collapse" data-target="#p_gpo_more" aria-expanded="false" aria-controls="p_gpo_more" />
            <br />
        </>
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
                <h6>{props.name} <br />
                    <span data-name={props.name}>{props.type}</span></h6>

                <p>
                    {props.time}
                    <br />
                    <span>срок освоения</span>
                </p>
                <p>
                    {props.profile}
                    <br />
                    <span>профиль</span>
                </p>
            </div>
        </a>
    )
}

// ЦИТАТЫ СОТРУДНИКОВ (ЭЛЕМЕНТ)
const QuoteStaff = (props) => {
    return (
        <div className="col-md-6">
            <div className="row no-gutters">
                <div className="quote-staff">
                    {/* img and name :after(quote) | quote */}
                    <div className="quote-staff__info d-flex">
                        <Icon className="quote-staff__info__img" style={{ color: props.color }} icon={faIdBadge} />
                        <p className="quote-staff__info__name">
                            <strong>{props.lastName} <br /> {props.firstName}</strong>
                            <br />
                            {props.post}
                        </p>
                        <Icon className="quote-staff__info__icon" style={{ color: props.color }} icon={faQuoteRight} />
                    </div>
                    <p className="quote-staff__quote">
                        {props.quote}
                    </p>
                </div>
            </div>
        </div>
    )
}