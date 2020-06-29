import React, { lazy, Fragment } from 'react'
import { Route } from 'react-router-dom'

const AdminCurator = lazy(() => import('./AdminCurator'))
const FormCurator = lazy(() => import('./FormCurator'))

export default function AdminClubsRoutes() {

  return (
    <Fragment>
      <Route path="/admin/curator" exact component={(() => (<Fragment>
        <AdminCurator title="Кураторы - Кафедра управления инновациями" />
      </Fragment>))} />
      <Route path="/admin/curator/edit/:id" exact component={(() => (<Fragment>
        <FormCurator title="Редактировать куратора - Кафедра управления инновациями" />
      </Fragment>))} />
      <Route path="/admin/curator/add" exact component={(() => (<Fragment>
        <FormCurator title="Добавить куратора - Кафедра управления инновациями" />
      </Fragment>))} />
    </Fragment>
  )
} 