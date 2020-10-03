import React, { lazy, Fragment } from 'react'
import { Route } from 'react-router-dom'

const AdminNewsLinks = lazy(() => import('./AdminNewsLinks'))
const FormNewsLinks = lazy(() => import('./FormNewsLinks'))

export default function AdminParamRoutes() {

  return (
    <Fragment>
      <Route path="/admin/news-links" exact component={(() => (<Fragment>
        <AdminNewsLinks title="Полезные ссылки - Новости - Кафедра управления инновациями" />
      </Fragment>))} />
      <Route path="/admin/news-links/edit/:id" exact component={(() => (<Fragment>
        <FormNewsLinks title="Редактировать полезную ссылку - Новости - Кафедра управления инновациями" />
      </Fragment>))} />
      <Route path="/admin/news-links/add" exact component={(() => (<Fragment>
        <FormNewsLinks title="Добавить полезную ссылку - Новости - Кафедра управления инновациями" />
      </Fragment>))} />
    </Fragment>
  )
} 