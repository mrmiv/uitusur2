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
        News: null
    }

    // didmount and req for id
    componentDidMount() {
        // const id = this.props.match.params.id
        this.props.ReadNews(this.props.id)
    }

    componentWillUnmount() {
        this.props.closeNavbar()
    }

    componentDidUpdate(prevProps) {
        const { News } = this.props.news
        console.log(this.props.news.isLoading + " props ");
        console.log(this.state.isLoading + " state");

        if (News !== prevProps.news.News) {
            this.setState({ News })
        }
    }

    render() {
        const { News } = this.state
        const { isLoading } = this.props.news
        return (
            <Fragment>
                <div className="container-md container-fluid">
                    <div id="fullnews">
                        {!isLoading ?
                            News && <Fragment>
                                <h3>{News.pin && <Icon icon={pushpinIcon} className="mr-2" />} {News.title}</h3>
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
                            </Fragment> : "Загрузка"}
                    </div>
                </div>
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    news: state.api.news.news
})

export default connect(
    mapStateToProps,
    { closeNavbar, ReadNews }
)(FullNews)

function NewsProps({ icon, text, link, name }) {
    return (
        <div className="pt-2 pb-2 mr-5">
            <span>{icon}</span> {link ?
                <a href={text} target="_blank" rel="norefferer noopener">{name}</a>
                : <Fragment><strong>{name}</strong>: {text}</Fragment>}
        </div>
    )
}