import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux'
import {NavLink} from 'react-router-dom'
import './styles/News.scss'
// import {Modal} from '../components/Modal'
import { closeNavbar } from '../redux/actions/navbarActions'
import { GetNewsList, GetMoreNews } from '../redux/actions/newsActions'
import { NewsInList } from './components/NewsList'
// import Pagination from "react-js-pagination";

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
        toggleMenuIsVisible: false,
        page: 1,
        perPage: 10,

        type: this.props.type || null,

        msg: null
    }

    componentWillUnmount() {
        this.props.closeNavbar()
    }

    componentDidMount() {
        document.title = this.props.title + " - Кафедра управления инновациями"

        const {type, page, perPage} = this.state

        this.props.GetNewsList(type, page, perPage)
    }

    // Paginate(page) {
    //     window.scrollTo(0, window.innerHeight);
    //     // console.log(page);
    //     const { type, perPage } = this.state
    //     this.setState({ page })
    //     if (type){
    //         this.props.GetNewsList(type, page, perPage)
    //     } else {
    //         this.props.GetAllNews(page, perPage)
    //     }
    // }

    getMoreNews(page){
        const { type, perPage } = this.state
        this.setState({ page })
        this.props.GetMoreNews(type, page, perPage)
    }

    render() {
        // let newslist = this.props.news.NewsList
        // console.log(newslist);
        const { page, perPage, toggleMenuIsVisible, type } = this.state
        const { total, NewsList, isLoading } = this.props.news
        const { title } = this.props
        return (
            <Fragment>
                {/* Список новостей */}
                <section id="news">
                    <div className="container-md container-fluid">
                        <h1 data-menu-visible={toggleMenuIsVisible}
                            onClick={()=>this.setState({toggleMenuIsVisible: !this.state.toggleMenuIsVisible})}>
                                {title}
                        </h1>
                        <div id="toggle-news" data-visible={toggleMenuIsVisible}>
                            <ul className="d-sm-flex">
                                {type && <li><NavLink to='/news'>Все новости</NavLink></li>}
                                {type !== 1 && <li><NavLink to='/news/announcements'>Объявления кафедры</NavLink></li>}
                                {type !== 2 && <li><NavLink to='/news/grants'>Стипендии и гранты</NavLink></li>}
                                {type !== 3 && <li><NavLink to='/news/conference'>Конференции</NavLink></li>}
                            </ul>
                        </div>
                            {!isLoading 

                            ? <Fragment>
                                {(NewsList && NewsList.length !== 0)
                                    ? <Fragment>
                                        <NewsListMap NewsList={NewsList}/>
                                        { page < Math.ceil(total/perPage) ? 
                                            <a className="more-link link-center" onClick={()=>this.getMoreNews(Number(page+1))}>
                                            ЕЩЕ НОВОСТИ</a> 
                                            : <p className="link-center">На этом все :)</p>
                                        }
                                    </Fragment>
                                
                                    : <p>Новостей нет</p>}
                                
                            </Fragment> 

                            : <p>Загрузка</p>}
                    </div>
                </section>
            </Fragment>
        )
    }

}

export const NewsListMap = ({NewsList}) => {
    return <div className="news-list-grid">
    {NewsList.map((news, index) => {
    return (<Fragment key={index}>
        <NewsInList
            pin={news.pin}
            id={news._id}
            title={news.title}
            url={news.translit_title}
            city={news.city}
            deadline={news.deadline}
            users={news.users}
            annotation={news.annotation}
            datetime={news.created_at} />
        </Fragment>)
    })}
</div>
}

const mapStateToProps = state => ({
    news: state.api.news.newslist,
})

export default connect(
    mapStateToProps,
    { closeNavbar, GetNewsList, GetMoreNews }
)(NewsList)


