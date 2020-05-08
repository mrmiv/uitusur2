import React, { Component } from 'react'
import { closeNavbar } from '../../redux/actions/navbarActions'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import './AdminIndex.scss'

import { Icon } from '@iconify/react'
import userTie from '@iconify/icons-fa-solid/user-tie'
import fanIcon from '@iconify/icons-fa-solid/fan';
import newspaperIcon from '@iconify/icons-emojione-v1/newspaper'
import booksIcon from '@iconify/icons-fxemoji/books'
import clipboardList from '@iconify/icons-fa-solid/clipboard-list';
import documentwithtextIcon from '@iconify/icons-fxemoji/documentwithtext';
export class AdminHome extends Component {

    state = {
        navigation: [
            {
                path: 'param',
                name: 'Заголовки',
                icon: <Icon icon={documentwithtextIcon} />
            },
            {
                path: 'news',
                name: 'Новости',
                icon: <Icon icon={newspaperIcon} />
            },
            {
                path: 'staff',
                name: 'Сотрудники',
                icon: <Icon icon={userTie} />
            },
            {
                path: 'literature',
                name: 'Литература',
                icon: <Icon icon={booksIcon} />
            },
            {
                path: 'clubs',
                name: 'Клубы',
                icon: <Icon color={"orange"} icon={fanIcon} />
            },
            {
                path: 'studyplan',
                name: 'Учебный план',
                icon: <Icon color={"green"} icon={clipboardList} />
            },
            {
                path: 'curator',
                name: 'Кураторы',
                icon: <Icon color={"yellow"} icon={userTie} />
            }
        ]
    }

    componentWillUnmount() {
        this.props.closeNavbar()
    }

    componentDidMount() {
        document.title = this.props.title
    }

    render() {
        const { navigation } = this.state

        return (
            <div className="container-md container-fluid">
                <h2>Панель администратора</h2>
                <a role="button" className="btn btn-info" href="https://metrika.yandex.ru/dashboard?id=62465179" target="blank" rel="norefferer noopener">Статистика</a>
                <div className="row no-gutters">
                    {navigation.map((item, index) => {
                        return (<NavCard key={index}
                            path={item.path}
                            icon={item.icon}
                            name={item.name} />)
                    })}
                </div>
            </div>
        )
    }
}

export default withRouter(connect(
    null,
    { closeNavbar }
)(AdminHome))

function NavCard({ path, icon, name }) {

    return (
        <div className="col-xl-2 col-md-3 col-sm-4 col-6 mt-2">
            <Link className="link-boxfor-navcard" to={`/admin/${path}`}>
                <div className="nav-admin-card">
                    <span className="icon-nav-card" >{icon}</span>
                    <br />
                    <u>{name}</u>
                </div>
            </Link>
        </div>
    )

}