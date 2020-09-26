import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Icon } from '@iconify/react'
import pushpinIcon from '@iconify/icons-fxemoji/pushpin'
import cityscapeIcon from '@iconify/icons-twemoji/cityscape';
import alarmClock from '@iconify/icons-flat-color-icons/alarm-clock';
import spiralCalendar from '@iconify/icons-twemoji/spiral-calendar';
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export function toDate(datetime, time = false, sym = ".") {
    const date = new Date(datetime)

    let day = date.getDate()
    if (day < 10) { day = `0${day}` }
    let month = date.getMonth() + 1
    if (month < 10) { month = `0${month}` }
    const year = date.getFullYear()
    if (time) {
        let hour = date.getHours()
        if (hour < 10) { hour = `0${hour}` }
        let minute = date.getMinutes()
        if (minute < 10) { minute = `0${minute}` }
        return `${hour}:${minute} ${day}.${month}.${year}`
    }
    return `${day}${sym}${month}${sym}${year}`
}

export function NewsInList(props) {

    const { url, title, datetime, pin, annotation, id } = props
    return (
        <Link to={`/news/read/${url}`}
        className={`one-news ${annotation ? 'news-with-annotation' : ''} ${pin ? 'pinned' : ''}`}>
            <div>
                {pin && 
                    <span className="pin-icon">
                        <Icon icon={pushpinIcon} style={{ fontSize: "18px" }} />
                    </span>
                } 
                <span className="created-date-news">
                    {toDate(datetime, true)}
                </span>
                <h2>{title}</h2>

                <div className="row no-gutters props-news-list">
                    {props.users &&
                        <div className="col-auto">
                            <p className="prop-news">
                                <FontAwesomeIcon icon={faUsers} style={{ fontSize: "18px" }} /> <span>Для кого:</span> {props.users}
                            </p>
                        </div>
                    }
                    {props.deadline &&
                        <div className="col-auto">
                            <p className="prop-news">
                                <Icon icon={alarmClock} style={{ fontSize: "18px" }} /> <span>Крайний срок:</span> {toDate(props.deadline)}
                            </p>
                        </div>}
                    {props.period &&
                        <div className="col-auto">
                            <p className="prop-news">
                                <Icon icon={spiralCalendar} style={{ fontSize: "18px" }} /> <span>Сроки проведения:</span> {props.period}
                            </p>
                        </div>}
                    {/* Город */}
                    {props.city &&
                        <div className="col-auto">
                            <p className="prop-news">
                                <Icon icon={cityscapeIcon} style={{ fontSize: "18px" }} /> <span>Место проведения:</span> {props.city}
                            </p>
                        </div>}
                </div>
                {annotation && 
                <div className="news-annotation">
                    <p>
                        {annotation}
                    </p>
                </div>}
            </div>
        </Link>
    )
}