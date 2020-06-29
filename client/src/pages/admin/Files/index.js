import React, { lazy, Fragment } from 'react'
import { Route } from 'react-router-dom'

const FormFiles = lazy(() => import('./FormFiles'))
const AdminFiles = lazy(() => import('./AdminFiles'))

export default function AdminParamRoutes() {

  return (
    <Fragment>
      <Route path="/admin/uploadfiles" exact component={(() => (<Fragment>
        <div className="container-lg container-fluid">
          <FormFiles />
          <AdminFiles title="Файлы - Кафедра управления инновациями" />
        </div>
      </Fragment>))} />
    </Fragment>
  )
} 