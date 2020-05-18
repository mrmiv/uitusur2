import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux'

import './styles/News.scss'

import Fade from 'react-reveal/Fade'
// import {Modal} from '../components/Modal'
import { closeNavbar } from '../redux/actions/navbarActions'
import { GetNewsList } from '../redux/actions/newsActions'
import { NewsInList, LastNews } from './components/NewsList'
import Pagination from "react-js-pagination";

// import images
import marketing_img from './img/marketing_.svg';

const grants = [
    {
        name: "РФФИ — активные конкурсы Российского фонда фундаментальных исследований",
        path: "http://www.rfbr.ru/rffi/ru/contest"
    },
    {
        name: "4science — актуальные гранты и конкурсы для ученых и предпринимателей",
        path: "https://4science.ru/"
    },
    {
        name: "Grantist — гранты, доступные для студентов, молодых ученых и преподавателей из стран СНГ",
        path: "http://grantist.com/scholarships/vse-stipendii/"
    },
    {
        name: "RSCI.RU (INTELICA) — актуальная деловая информация",
        path: "http://www.rsci.ru/grants/"
    },
    {
        name: "Инновационный центр \"Сколково\"",
        path: "https://sk.ru"
    },
    {
        name: "РНФ — конкурсы Российского научного фонда",
        path: "http://rscf.ru/ru/contests/"
    },
    {
        name: "РВК — Российская венчурная компания",
        path: "https://www.rvc.ru/"
    },
    {
        name: "Росмолодежь — Федеральное агенство по делам молодежи",
        path: "https://fadm.gov.ru/"
    },
]

export class NewsList extends Component {

    state = {
        page: 1,
        perPage: 15,

        msg: null
    }

    componentWillUnmount() {
        this.props.closeNavbar()
    }

    componentDidMount() {
        document.title = this.props.title + " - Кафедра управления инновациями"
        this.props.GetNewsList(this.props.type, this.state.page, this.state.perPage)
    }

    Paginate(page) {
        window.scrollTo(0, window.innerHeight);
        // console.log(page);
        const { type } = this.props
        this.setState({ page })
        this.props.GetNewsList(type, page, this.state.perPage)
    }

    render() {
        let newslist = this.props.news.NewsList
        // console.log(newslist);
        const { page, perPage } = this.state
        const { total } = this.props.news
        const { isLoading } = this.props
        return (
            <Fragment>
                {/* Заголовок */}
                <Fade>
                    <section id="title_main" className="news">
                        <div className="container-md container-fluid" style={{ height: "inherit" }}>
                            <div className="row no-gutters" style={{ height: "inherit" }}>
                                <h1 className="title title-text w-100">{this.props.title}</h1>
                                {/* Для грантов отобразить последние гранты, иначе последние новости */}
                                {this.props.type !== 2 ? <Fragment>
                                    <div className="col-md-6 col-12">
                                        <h4 className="title w-100">Последние новости</h4>
                                        <div className="lastnews">
                                            {newslist && newslist.slice(0, 3).map((news, index) => {
                                                return (<div key={index}>
                                                    <LastNews
                                                        id={news._id}
                                                        title={news.title}
                                                        body={news.body}
                                                        datetime={news.created_at} />
                                                </div>)
                                            })}
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="triple_helix">
                                            <img className="triple_helix_svg" src={marketing_img} alt={this.props.title}
                                                style={{ maxWidth: "100%", padding: "10px" }} />
                                        </div>
                                    </div>
                                </Fragment> : <Fragment>
                                        {grants.map((g, index) => {
                                            return <div className="col-md-6" key={index}>
                                                <a href={g.path} target="_blank" rel="norefferer noopener" >
                                                    <div className="grant-link">{g.name}</div>
                                                </a>
                                            </div>
                                        })}

                                    </Fragment>}
                            </div>
                        </div>
                    </section>
                </Fade>
                {/* Список новостей */}
                <section id="news">
                    <div className="container-md container-fluid">
                        {newslist && !isLoading ? <Fragment>
                            {newslist.map((news, index) => {
                                return (<div key={index} className="w-100">
                                    <NewsInList
                                        pin={news.pin}
                                        id={news._id}
                                        title={news.title}
                                        body={news.body}
                                        city={news.city}
                                        deadline={news.deadline}
                                        users={news.users}
                                        datetime={news.created_at} />
                                </div>)
                            })}
                            <Pagination
                                activePage={page}
                                itemsCountPerPage={perPage}
                                totalItemsCount={total}
                                pageRangeDisplayed={5}
                                itemClass="more-link"
                                hideFirstLastPages
                                hideDisabled
                                onChange={this.Paginate.bind(this)} />
                        </Fragment> : <h4>Новостей нет</h4>}

                    </div>
                </section>
            </Fragment>
        )
    }

}

const mapStateToProps = state => ({
    news: state.api.news.newslist,
    isLoading: state.api.news.isLoading
})

export default connect(
    mapStateToProps,
    { closeNavbar, GetNewsList }
)(NewsList)


