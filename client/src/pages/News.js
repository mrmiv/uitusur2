import React, { Fragment, memo, PureComponent } from 'react'

import { connect } from 'react-redux'
import {NavLink} from 'react-router-dom'
import './styles/News.scss'

import { Icon } from '@iconify/react';
import linkIcon from '@iconify/icons-flat-color-icons/link';

import { closeNavbar } from '../redux/actions/navbarActions'
import { GetNewsList, GetMoreNews } from '../redux/actions/newsActions'
import { NewsInList } from './components/NewsList'
import {NewsLinksList} from './components/NewsLinks'
// import Pagination from "react-js-pagination";

export class NewsList extends PureComponent {

    state = {
        toggleMenuIsVisible: false,
        page: 1,
        perPage: 10,

        type: this.props.type || null,

        msg: null,
        toggleNewsLinks: false
    }

    componentWillUnmount() {
        this.props.closeNavbar()
    }

    componentDidMount() {
        document.title = this.props.title + " - Кафедра управления инновациями"

        const {type, page, perPage} = this.state

        this.props.GetNewsList(type, page, perPage)
    }

    getMoreNews(page){
        const { type, perPage } = this.state
        this.setState({ page })
        this.props.GetMoreNews(type, page, perPage)
    }

    renderNewsList(){
        
        const { NewsList, isLoading } = this.props.news

        const LoadingElement = <p>Загрузка</p>

        if (isLoading || !NewsList){
            return LoadingElement
        }

        const NewsNotFound = <p>Новостей нет</p>
        if (NewsList.length===0){
            return NewsNotFound
        }

        const NewsListElement = <NewsListMap NewsList={NewsList}/>

        return <Fragment>
            {NewsListElement}
        </Fragment>

    }

    renderShowingMoreNewsButton(){

        const { page, perPage } = this.state
        const { NewsList, isLoading, total } = this.props.news

        if (isLoading || !NewsList){
            return <Fragment/>
        }

        if (NewsList.length===0){
            return <Fragment/>
        }

        const ShowMoreNewsButton = page < Math.ceil(total/perPage) ? 
            <a className="more-link link-center" onClick={()=>this.getMoreNews(Number(page+1))}>
            Показать больше новостей</a> 
            : <p className="link-center">На этом всё :)</p>

        return ShowMoreNewsButton 
    }

    setVisibleNewsLinks = () => {
        const {toggleNewsLinks} = this.state
        this.setState({toggleNewsLinks: !toggleNewsLinks})
    }

    render() {

        const { toggleMenuIsVisible, type, toggleNewsLinks } = this.state
        const { title } = this.props
        const class_for_news_links = toggleNewsLinks ? 'with-news-links' : ''

        return (
            <Fragment>
                <section id="news">
                    <div className="container">
                       <div className="d-flex justify-content-between">
                            <div className="title-block-news">
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
                            </div>
                            <div className="news-links-block">
                                <button style={{
                                    fontSize: "1.6em",
                                    borderRadius: "24px",
                                    backgroundColor: toggleNewsLinks ? "#c8d6e5" : "white"
                                }} 
                                onClick={this.setVisibleNewsLinks}
                                className="more-link" 
                                title="Полезные ссылки"><Icon icon={linkIcon}/></button>
                            </div>
                       </div>
                        <div id="news-grid" className={class_for_news_links}>
                            <NewsLinksList isVisible={toggleNewsLinks} type={type}/>
                            <div className="news-list-element">{this.renderNewsList()}</div>
                        </div>
                        {this.renderShowingMoreNewsButton()}
                       
                    </div>
                </section>
            </Fragment>
        )
    }
}

export const NewsListMap = memo(({NewsList}) => {
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
})

const mapStateToProps = state => ({
    news: state.api.news.newslist,
})

export default connect(
    mapStateToProps,
    { closeNavbar, GetNewsList, GetMoreNews }
)(NewsList)


