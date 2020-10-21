import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { closeNavbar } from '../../redux/actions/navbarActions'
import { ReadNews } from '../../redux/actions/newsActions'
import { toDate } from './NewsList'
import { Icon, InlineIcon } from '@iconify/react'
import '../styles/News.scss'

import users from '@iconify/icons-fa-solid/users'
import pushpinIcon from '@iconify/icons-fxemoji/pushpin'
import alarmClock from '@iconify/icons-flat-color-icons/alarm-clock';
import documentAttach from '@iconify/icons-ion/document-attach';
import cityscapeIcon from '@iconify/icons-twemoji/cityscape';
import trophyIcon from '@iconify/icons-twemoji/trophy';
import linksymbolIcon from '@iconify/icons-fxemoji/linksymbol';
import spiralCalendar from '@iconify/icons-twemoji/spiral-calendar';
import arrowBackCircle from '@iconify/icons-ion/arrow-back-circle';

export class FullNews extends Component {

    state = {
        News: null,
        title: this.props.match.params.title
    }

    componentDidMount() {
        const {title} = this.state
        this.props.ReadNews('translit_title', title)
    }

    componentWillUnmount() {
        this.props.closeNavbar()
    }

    componentDidUpdate(prevProps) {
        const { News } = this.props.news

        if (News !== prevProps.news.News) {
            this.setState({ News })
        }
    }

    renderFullNews(){
        const { News } = this.state
        const { isLoading } = this.props.news

        const LoadingElement = <p>Загрузка</p>

        if (isLoading){
            return LoadingElement
        }

        const NewsNotFound = <p>Такая новость не найдена</p>
        if (!News){
            return NewsNotFound
        }

        return <Fragment>
        <div className="d-flex justify-content-between align-items-center mt-1">
            <h1 style={{
                fontFamily: "Roboto, sans-serif"
            }}>{News.title}</h1>
            {News.pin && <Icon icon={pushpinIcon} style={{fontSize: "1.75em"}}/>}
        </div>
        <div className="row no-gutters">
            {/* для крнр */}
            {News.users && <NewsProps
                icon={<Icon icon={users} />} name={"Для кого"} text={News.users} />}
            {/* крайний срок */}
            {News.deadline && <NewsProps
                icon={<Icon icon={alarmClock} />} name={News.type === 1 ? "Крайний срок" : "Крайний срок подачи документов"} text={toDate(News.deadline)} />}
            {/* место проведения */}
            {News.city && <NewsProps
                icon={<Icon icon={cityscapeIcon} />} name={"Место проведения"} text={News.city} />}
            {/* период действия или сроки результатов */}
            {News.period && <NewsProps
                icon={<Icon icon={spiralCalendar} />} name={"Период действия"} text={News.period} />}
            {/* размер гранта */}
            {News.grant && <NewsProps
                icon={<Icon icon={trophyIcon} />} name={"Размер стипендии/гранта"} text={News.grant} />}
            {/* сайт */}
            {News.site && <NewsProps
                icon={<Icon icon={linksymbolIcon} />} text={News.site} name={"Сайт"} link />}
            </div>
            <div className="text__news html-adaptive" dangerouslySetInnerHTML={{ __html: News.body }} />
            {News.docs.length !== 0 && <div className="docs__news"><strong>Вложения:</strong><br />
                {News.docs.map((doc, index) => {
                    return (<a href={doc.path ? doc.path : doc || "#"} key={index} target="_blank" rel="noopener noreferrer">
                        <Icon className="mr-3" size="lg" icon={documentAttach} /> {doc.name? doc.name : `Вложение ${index}`}
                    </a>)
                })}</div>}
        </Fragment>
    }
 
    render() {
        return (
            <Fragment>
                <div id="fullnews">
                    <div className="container">
                        <button className="more-link" title="Назад" 
                            style={{
                                backgroundColor: "#354ED1",
                                fontSize: "1.25em",
                                padding: "4px",
                                width: "40px",
                                height: "40px"
                            }}
                            onClick={()=>this.props.history.goBack()}>
                            <InlineIcon icon={arrowBackCircle}/>
                        </button>
                        {this.renderFullNews()}
                    </div>
                </div>
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    news: state.api.news.news
})

export default withRouter(connect(
    mapStateToProps,
    { closeNavbar, ReadNews }
)(FullNews))

function NewsProps({ icon, text, link, name }) {
    return (
        <div className="pt-2 pb-2 mr-5">
            <span>{icon}</span> {link ?
                <a href={text} target="_blank" rel="noopener noreferrer">{name}</a>
                : <Fragment><strong>{name}</strong>: {text}</Fragment>}
        </div>
    )
}