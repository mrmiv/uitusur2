import React, { lazy, Fragment } from 'react'
import { Route } from 'react-router-dom'

const AdminFeedback = lazy(() => import('./AdminFeedback'))
const FormFeedback = lazy(() => import('./FormFeedback'))

export default function AdminParamRoutes() {

  return (
    <Fragment>
      <Route path="/admin/feedback" exact component={(() => (<Fragment>
        <AdminFeedback title="Отзывы о кафедре - Кафедра управления инновациями" />
      </Fragment>))} />
      <Route path="/admin/feedback/edit/:id" exact component={(() => (<Fragment>
        <FormFeedback title="Редактировать отзыв - Кафедра управления инновациями" />
      </Fragment>))} />
      <Route path="/admin/feedback/add" exact component={(() => (<Fragment>
        <FormFeedback title="Добавить отзыв - Кафедра управления инновациями" />
      </Fragment>))} />
    </Fragment>
  )
} 