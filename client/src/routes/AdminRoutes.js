import React, {lazy} from 'react'

const AdminLiteratureRoutes =lazy(()=>import('../pages/admin/Literature'))
const AdminStaffRoutes =lazy(()=>import('../pages/admin/Staff'))

export default function AdminRoutes(){

    return(
        <>
{/* Литература */}
        <AdminLiteratureRoutes/>
        <AdminStaffRoutes/>
        </>
    )
} 

