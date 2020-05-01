import React, {lazy} from 'react'
import { Route } from 'react-router-dom'

const AdminLiteratureRoutes =lazy(()=>import('../pages/admin/Literature'))
const AdminStaffRoutes =lazy(()=>import('../pages/admin/Staff'))
const AdminNewsRoutes =lazy(()=>import('../pages/admin/News'))
const AdminClubsRoutes =lazy(()=>import('../pages/admin/Clubs'))
const AdminHome =lazy(()=>import('../pages/admin'))

export default function AdminRoutes(){

    return(
        <>
        <Route path="/admin" exact component={(()=>(
            <AdminHome title="Администратор - Кафедра управления инновациями"/>
        ))}/>
        <AdminLiteratureRoutes/>
        <AdminStaffRoutes/> 
        <AdminNewsRoutes/>
        <AdminClubsRoutes/>
        </>
    )
} 

