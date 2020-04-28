import React, { Fragment } from 'react'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { Icon } from '@iconify/react'
import pushpinIcon from '@iconify/icons-fxemoji/pushpin'
import alarmClock from '@iconify/icons-flat-color-icons/alarm-clock';
import {faUsers} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

export function toDate(datetime, time=false) {
    const date = new Date(datetime)

    let day = date.getDate()
    if (day<10){day = "0"+day}
    let month = date.getMonth()
    if (month<9){month = "0"+(month+1)}
    const year = date.getFullYear()
    if(time){
        let hour = date.getHours()
        if (hour<10){hour = "0"+hour}
        let minute = date.getMinutes()
        if (minute<10){minute = "0"+minute}
        return `${day}.${month}.${year} ${hour}:${minute}`
    }
    return `${day}.${month}.${year}`
}

export function LastNews({id, title, body, datetime}){

    return(
        <Link to={`/news/${id}`}>
        <div className="last-one-news">
            <h6>{title.length<40? title : title.substr(0, 37)+"..."}</h6>
            <small>{toDate(datetime)}</small>
            <div dangerouslySetInnerHTML={{ __html: body.length<50? body : body.substr(0, 50) + "..."  }}/>
        </div>
        </Link>
    )
}

export function NewsInList(props){

    const {body, title, datetime, pin} = props
    
    return(
        <Link to={`/news/${props.id}`}>
        <div className="one-news">
            <div className="d-flex justify-content-between">
                <h5>{pin && <span className="pin-icon"><Icon icon={pushpinIcon} style={{fontSize: "18px"}}/></span>} {title} </h5>
                <small className="text-right">{toDate(datetime)}</small>
            </div>
            <div className="row no-gutters props-news-list">
                {/* Для кого */}
                {props.users &&
                <div className="col-md-3 col-sm-4 col-6">
                    <p className="prop-news">
                    <FontAwesomeIcon icon={faUsers} style={{fontSize: "18px"}}/> <span>Для кого:</span> {props.users}
                </p>
                </div>
                }
                {/* Дедлайн */}
                {props.deadline &&
                <div className="col-md-3 col-sm-4 col-6">
                    <p className="prop-news">
                        <Icon icon={alarmClock} style={{fontSize: "18px"}}/> <span>Крайний срок:</span> {toDate(props.deadline)}
                    </p>
                </div>}
                {/* Размер гранта
                {props.grant &&
                <div className="col-md-3 col-sm-4 col-6">
                    <p className="prop-news">
                        <Icon icon={alarmClock} style={{fontSize: "18px"}}/> <span>Крайний срок:</span> {props.grant}
                    </p>
                </div>} */}
                {/* Сроки проведения */}
                {props.period &&
                <div className="col-md-3 col-sm-4 col-6">
                    <p className="prop-news">
                        <Icon icon={alarmClock} style={{fontSize: "18px"}}/> <span>Сроки проведения:</span> {props.period}
                    </p>
                </div>}
                {/* Город */}
                {props.city &&
                <div className="col-md-3 col-sm-4 col-6">
                    <p className="prop-news">
                        <Icon icon={alarmClock} style={{fontSize: "18px"}}/> <span>Место проведения:</span> {props.city}
                    </p>
                </div>}
            </div>
            <div className="news-text" dangerouslySetInnerHTML={{ __html: body.length<200? body : body.substr(0, 200) + "...",   }}/>
        </div>
        </Link>
    )
}