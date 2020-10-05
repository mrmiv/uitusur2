import React, { lazy, Suspense, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { LoadingScreen } from '../../../components/LoadingScreen'

const AdminDocs = lazy(() => import('./AdminDocs'))
const FormDocs = lazy(() => import('./FormDocs'))

export default function AdminLiteratureRoutes() {

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Route path="/admin/docs" exact component={(() => (<Fragment>
        <AdminDocs title="Регламентирующие документы - Кафедра управления инновациями" />
      </Fragment>))} />
      <Route path="/admin/docs/edit/:id" exact component={(() => (<Fragment>
        <FormDocs title="Редактировать документ - Кафедра управления инновациями" />
      </Fragment>))} />
      <Route path="/admin/docs/add" exact component={(() => (<Fragment>
        <FormDocs title="Добавить документ - Кафедра управления инновациями" />
      </Fragment>))} />
    </Suspense>
  )
} 