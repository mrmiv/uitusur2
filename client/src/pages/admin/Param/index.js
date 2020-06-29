import React, { lazy, Fragment } from 'react'
import { Route } from 'react-router-dom'

const AdminParam = lazy(() => import('./AdminParam'))
const FormParam = lazy(() => import('./FormParam'))

export default function AdminParamRoutes() {

  return (
    <Fragment>
      <Route path="/admin/param" exact component={(() => (<Fragment>
        <AdminParam title="Заголовки - Кафедра управления инновациями" />
      </Fragment>))} />
      <Route path="/admin/param/edit/:id" exact component={(() => (<Fragment>
        <FormParam title="Редактировать заголовок - Кафедра управления инновациями" />
      </Fragment>))} />
      <Route path="/admin/param/add" exact component={(() => (<Fragment>
        <FormParam title="Добавить заголовок - Кафедра управления инновациями" />
      </Fragment>))} />
    </Fragment>
  )
} 