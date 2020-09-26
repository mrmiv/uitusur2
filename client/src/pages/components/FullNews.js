import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { closeNavbar } from '../../redux/actions/navbarActions'
import { ReadNews } from '../../redux/actions/newsActions'
import { toDate } from './NewsList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Icon } from '@iconify/react'
import '../styles/News.scss'

import { faUsers } from '@fortawesome/free-solid-svg-icons'
import pushpinIcon from '@iconify/icons-fxemoji/pushpin'
import alarmClock from '@iconify/icons-flat-color-icons/alarm-clock';
import documentAttach from '@iconify/icons-ion/document-attach';
import cityscapeIcon from '@iconify/icons-twemoji/cityscape';
import trophyIcon from '@iconify/icons-twemoji/trophy';
import linksymbolIcon from '@iconify/icons-fxemoji/linksymbol';
import spiralCalendar from '@iconify/icons-twemoji/spiral-calendar';

export class FullNews extends Component {

    state = {
        News: null,
        title: this.props.match.params.title
    }

    // didmount and req for id
    componentDidMount() {
        const {title} = this.state
        this.props.ReadNews('translit_title', title)
    }

    componentWillUnmount() {
        this.props.closeNavbar()
    }

    componentDidUpdate(prevProps) {
        const { News } = this.props.news
        // console.log(this.props.news.isLoading + " props ");
        // console.log(this.state.isLoading + " state");

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
        <div className="d-flex justify-content-between align-items-center">
            <h1>{News.title}</h1>
            {News.pin && <Icon icon={pushpinIcon} style={{fontSize: "1.75em"}}/>}
        </div>
        <div className="row no-gutters">
            {/* для крнр */}
            {News.users && <NewsProps
                icon={<FontAwesomeIcon icon={faUsers} />} name={"Для кого"} text={News.users} />}
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
            <div className="text__news" dangerouslySetInnerHTML={{ __html: News.body }} />
            {News.docs.length !== 0 && <div className="docs__news"><strong>Вложения:</strong><br />
                {News.docs.map((doc, index) => {
                    return (<a href={doc} key={index} target="_blank" rel="norefferer noopener">
                        <Icon className="mr-3" size="lg" icon={documentAttach} /> {doc.substr(39)}
                    </a>)
                })}</div>}
        </Fragment>
    }

    render() {
        
        // console.log(this.props)
        return (
            <Fragment>
                <div 
                style={{
                    position: "fixed",
                    width: "100px",
                    height: "100%",
                    backgroundColor: "red",
                    zIndex: "1",
                    cursor: "pointer"
                }}
                onClick={() => this.props.history.goBack()}/> 
                <div id="fullnews">
                    <div className="container">
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
                <a href={text} target="_blank" rel="norefferer noopener">{name}</a>
                : <Fragment><strong>{name}</strong>: {text}</Fragment>}
        </div>
    )
}