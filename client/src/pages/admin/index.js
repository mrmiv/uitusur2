import React, { Fragment, PureComponent } from 'react'
import { closeNavbar } from '../../redux/actions/navbarActions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import QuizForm from './QuizForm'

import { Icon } from '@iconify/react'

import googleanalyticsIcon from '@iconify/icons-simple-icons/googleanalytics'
import uploadIcon from '@iconify/icons-fa-solid/upload';

export class AdminHome extends PureComponent {

    componentWillUnmount() {
        this.props.closeNavbar()
    }

    componentDidMount() {
        document.title = this.props.title
    }

    render() {

        return ( <Fragment>
            <div className="container-md container-fluid">
                <h1>Панель администратора</h1>
                
                {/* <a role="button" className="btn btn-info" href="https://metrika.yandex.ru/dashboard?id=62465179" target="blank" rel="norefferer noopener">Статистика</a> */}
                <div className="row no-gutters">
                    <div className="col-xl-2 col-md-3 col-sm-4 col-6 mt-2">
                        <a className="link-boxfor-navcard" 
                        target="_blank" rel="noopener norefferer"
                        href="https://metrika.yandex.ru/dashboard?id=62465179">
                            <div className="nav-admin-card">
                                <span className="icon-nav-card" ><Icon icon={googleanalyticsIcon} /></span>
                                <br />
                                <u>Статистика</u>
                            </div>
                        </a>
                    </div>
                    <QuizForm />
                </div>
            </div>
        </Fragment>
        )
    }
}

export default withRouter(connect(
    null,
    { closeNavbar }
)(AdminHome))