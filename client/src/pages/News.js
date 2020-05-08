import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux'

import './styles/News.scss'

import Fade from 'react-reveal/Fade'
// import {Modal} from '../components/Modal'
import { closeNavbar } from '../redux/actions/navbarActions'
import { GetNewsList } from '../redux/actions/newsActions'
import { NewsInList, LastNews } from './components/NewsList'

// import images
import marketing_img from './img/marketing_.svg';
// import curator_img from './img/PERSONAL_CURATOR.svg';
// import dashboard_img from './img/DASHBOARD.svg';
// import career_img from './img/CAREER.svg';

export class NewsList extends Component {

    componentWillUnmount() {
        this.props.closeNavbar()
    }

    componentDidMount() {
        document.title = this.props.title + " - Кафедра управления инновациями"
        this.props.GetNewsList(this.props.type)
    }

    render() {
        let newslist = this.props.news.NewsList
        console.log(newslist);

        return (
            <Fragment>
                {/* Заголовок */}
                <Fade>
                    <section id="title_main" className="news">
                        <div className="container-md container-fluid bg_th" style={{ height: "inherit" }}>
                            <div className="row no-gutters align-items-center" style={{ height: "inherit" }}>
                                <h1 className="title title-text w-100">{this.props.title}</h1>
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
                            </div>
                        </div>
                    </section>
                </Fade>
                {/* Список новостей */}
                <Fade>
                    <section id="news">
                        <div className="container-md container-fluid">
                            {newslist && newslist.map((news, index) => {
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
                        </div>
                    </section>
                </Fade>
            </Fragment>
        )
    }

}

const mapStateToProps = state => ({
    news: state.api.news.newslist
})

export default connect(
    mapStateToProps,
    { closeNavbar, GetNewsList }
)(NewsList)


