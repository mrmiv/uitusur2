import React, { Fragment, lazy, PureComponent } from 'react'
import { Link, NavLink, Route } from 'react-router-dom'
import '../pages/admin/AdminIndex.scss'

import { logout } from '../redux/actions/authActions'
import plusCircle from '@iconify/icons-fa-solid/plus-circle';
import store from '../store';
import Icon from '@iconify/react';

const AdminLiteratureRoutes = lazy(() => import('../pages/admin/Literature'))
const AdminNewsLinksRoutes = lazy(() => import('../pages/admin/NewsLinks'))
const AdminParamRoutes = lazy(() => import('../pages/admin/Param/'))
const AdminStaffRoutes = lazy(() => import('../pages/admin/Staff'))
const AdminNewsRoutes = lazy(() => import('../pages/admin/News'))
const AdminCuratorRoutes = lazy(() => import('../pages/admin/Curator'))
const AdminClubsRoutes = lazy(() => import('../pages/admin/Clubs'))
const AdminDocsRoutes = lazy(() => import('../pages/admin/Docs'))
const AdminSPRoutes = lazy(() => import('../pages/admin/StudyPlan'))
const AdminFeedbackRoutes = lazy(() => import('../pages/admin/Feedback'))
const AdminFilesRoutes = lazy(() => import('../pages/admin/Files'))
const AdminHome = lazy(() => import('../pages/admin'))

export default class AdminRoutes extends PureComponent {

    state = {
        navigation: [
            {
                path: '',
                name: 'Панель администратора',
                exact: true,
                noAddButton: true
            },
            {
                path: 'news',
                name: 'Новости'
            },
            {
                path: 'news-links',
                name: 'Полезные ссылки',

            },
            {
                path: 'param',
                name: 'Заголовки'
            },
            {
                path: 'studyplan',
                name: 'Учебный план'
            },
            {
                path: 'staff',
                name: 'Сотрудники'
            },
            {
                path: 'curator',
                name: 'Кураторы',
            },
            {
                path: 'feedback',
                name: 'Отзывы о кафедре',
            },
            {
                path: 'docs',
                name: 'Регл. документы'
            },
            {
                path: 'literature',
                name: 'Литература'
            },
            {
                path: 'clubs',
                name: 'Клубы'
            },
            {
                path: 'uploadfiles',
                name: 'Загрузка файлов',
                noAddButton: true
            }
        ]
    }

    returnNavCard = (item) => {

        const {path, name, exact, noAddButton} = item

        return <Fragment> 
            <div className="d-flex justify-content-between align-items-center mt-2">
                <NavLink exact={exact} className="admin-link" to={`/admin/${path}`}>{name}</NavLink>
                {!noAddButton && <NavLink className="add-admin-link" title={`Добавить ${name}`} to={`/admin/${path}/add`}><Icon icon={plusCircle}/></NavLink>}
            </div>
        </Fragment> 
    }

    render(){

        const {navigation} = this.state

        return (
            <section id="admin">
                <section id="admin-navigation">                    
                    {navigation.map(item => this.returnNavCard(item))}
                    <Link className="btn btn-danger" style={{margin: "8px 0 0 4px"}} to='/' 
                        onClick={() => {store.dispatch(logout())}}>Выйти</Link>
                </section>
                <section id="admin-panel">
                    <Route path="/admin" exact component={(() => (
                        <AdminHome title="Администратор - Кафедра управления инновациями" />
                    ))} />
                    <AdminLiteratureRoutes />
                    <AdminStaffRoutes />
                    <AdminNewsRoutes />
                    <AdminClubsRoutes />
                    <AdminSPRoutes />
                    <AdminParamRoutes />
                    <AdminCuratorRoutes />
                    <AdminDocsRoutes />
                    <AdminFeedbackRoutes />
                    <AdminFilesRoutes />
                    <AdminNewsLinksRoutes/>
                </section>
            </section>
        )
    }
}

