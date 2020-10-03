import React, { lazy } from 'react'
import { Route } from 'react-router-dom'
import '../pages/admin/AdminIndex.scss'

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

export default function AdminRoutes() {

    return (
        <section id="content-admin">
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
    )
}

