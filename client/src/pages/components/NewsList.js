import React from 'react'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { Icon } from '@iconify/react'
import pushpinIcon from '@iconify/icons-fxemoji/pushpin'
import alarmClock from '@iconify/icons-flat-color-icons/alarm-clock';
import {faUsers} from '@fortawesome/free-solid-svg-icons'

export function LastNews({title, body, datetime}){

    const date = new Date(datetime)

    const day = date.getDate()
    let month = date.getMonth()
    if (month<10){month = "0"+month}
    const year = date.getFullYear()
    const hour = date.getHours()
    const minute = date.getMinutes()

    return(
        <div className="last-one-news">
            <h6>{title.length<30? title : title.substr(0, 27)+"..."}</h6>
            <small>{day+'.'+month+'.'+year+' '+hour+':'+minute}</small>
            <p>{body.length<50? body : body.substr(0, 47)+"..."}</p>
        </div>
    )
}

export function NewsInList(props){

    const {body, title, datetime, pin } = props

    const date = new Date(datetime)

    const day = date.getDate()
    let month = date.getMonth()
    if (month<10){month = "0"+month}
    const year = date.getFullYear()
    const hour = date.getHours()
    const minute = date.getMinutes()

    return(
        <div className="one-news">
            <div className="d-flex justify-content-between">
                <h5>{pin && <span className="pin-icon"><Icon icon={pushpinIcon} style={{fontSize: "18px"}}/></span>} {title} </h5>
                <small className="text-right">{day+'.'+month+'.'+year+' '+hour+':'+minute}</small>
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
                        <Icon icon={alarmClock} style={{fontSize: "18px"}}/> <span>Крайний срок:</span> {props.deadline}
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
            <p className="news-text">{body.length<220? body : body.substr(0, 215)+"..."}</p>
        </div>
    )
}