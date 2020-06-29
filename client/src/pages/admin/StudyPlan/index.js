import React, { lazy, Fragment } from 'react'
import { Route } from 'react-router-dom'

const AdminSP = lazy(() => import('./AdminSP'))
const FormSP = lazy(() => import('./FormSP'))

export default function AdminClubsRoutes() {

    return (
        <Fragment>
            <Route path="/admin/studyplan" exact component={(() => (<Fragment>
                <AdminSP title="Учебный план - Кафедра управления инновациями" />
                {/* <Home title="Кафедра управления инновациями"/> */}
            </Fragment>))} />
            <Route path="/admin/studyplan/edit/:id" exact component={(() => (<Fragment>
                <FormSP title="Редактировать учебный план - Кафедра управления инновациями" />
                {/* <Home title="Кафедра управления инновациями"/> */}
            </Fragment>))} />
            <Route path="/admin/studyplan/add" exact component={(() => (<Fragment>
                <FormSP title="Добавить учебный план - Кафедра управления инновациями" />
                {/* <Home title="Кафедра управления инновациями"/> */}
            </Fragment>))} />
        </Fragment>
    )
} 