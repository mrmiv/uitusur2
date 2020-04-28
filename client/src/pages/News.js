import React, {Component} from 'react'

import {connect} from 'react-redux'

import './styles/News.scss'

import Fade from 'react-reveal/Fade'
// import {Modal} from '../components/Modal'
import { closeNavbar } from '../redux/actions/navbarActions'
import { GetNewsList } from '../redux/actions/newsActions'
import { NewsInList, LastNews } from './components/NewsList'

// import images
// import student_img from './img/student2.svg';
// import curator_img from './img/PERSONAL_CURATOR.svg';
// import dashboard_img from './img/DASHBOARD.svg';
// import career_img from './img/CAREER.svg';

export class NewsList extends Component{

    componentWillUnmount(){
        this.props.closeNavbar()
    }

    componentDidMount(){
        document.title = this.props.title + " - Кафедра управления инновациями"
        this.props.GetNewsList(this.props.type)
    }

    render(){
        let newslist = this.props.news.NewsList
        console.log(newslist);
        
        return(
        <>
        <Fade>
            <section id="title_main" className="news">
                <div className="container-md container-fluid bg_th" style={{height:"inherit"}}>
                <div className="row no-gutters align-items-center" style={{height:"inherit"}}>
                    <div className="title-text w-100 text-center">
                        <h1 className="title">{this.props.title}</h1>
                    </div> 
                    <div className="row no-gutters w-100 lastnews">
                        <h4 className="title w-100">Последние новости</h4>

                        {newslist && newslist.slice(0,4).map((news, index)=>{
                            return (<div key={index} className="col-md-3 col-sm-6 col-6">
                            <LastNews 
                            id={news._id}
                            title={news.title}
                            body={news.body}
                            datetime={news.created_at}/>
                        </div>)
                        })}
                    </div>
                </div>
                </div>
            </section>
        </Fade>
        <Fade>
            <section id="news">
                <div className="container-md container-fluid">
                    {newslist && newslist.map((news, index)=>{
                            return (<div key={index} className="w-100">
                            <NewsInList 
                            pin={news.pin}
                            id={news._id}
                            title={news.title}
                            body={news.body}
                            city={news.city}
                            deadline={news.deadline}
                            users={news.users}
                            datetime={news.created_at}/>
                        </div>)
                        })}
                </div>
            </section>
        </Fade>
        </>
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


