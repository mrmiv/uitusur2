import React, { Component } from 'react'
import { FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import {faHashtag, faMapPin, faThumbtack, faUsers, faClock} from '@fortawesome/free-solid-svg-icons'

export class News extends Component{

    // didmount and req for id

    render(){
        const {body, title, datetime, pin } = this.props

        return(
            <div className="one-news">
                <div className="d-flex justify-content-between">
                    <h5>{pin && <span className="pin-icon"><Icon icon={faThumbtack}/></span>} {title} </h5>
                    <small className="text-right">{datetime}</small>
                </div>
                <div className="row no-gutters props-news-list">
                    {props.users &&
                    <div className="col-md-3 col-sm-4 col-6">
                        <p className="prop-news">
                        <Icon icon={faUsers}/> <span>Для кого:</span> {props.users}
                    </p>
                    </div>
                    }
                    {props.deadline &&
                    <div className="col-md-3 col-sm-4 col-6">
                        <p className="prop-news">
                            <Icon icon={faClock}/> <span>Крайний срок:</span> {props.deadline}
                        </p>
                    </div>}
                </div>
                <p className="news-text">{body.length<220? body : body.substr(0, 215)+"..."}</p>
            </div>
        )
    }
}

// connect