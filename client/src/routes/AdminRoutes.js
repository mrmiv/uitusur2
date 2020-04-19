import React, {lazy} from 'react'

const AdminLiteratureRoutes =lazy(()=>import('../pages/admin/Literature'))

export default function AdminRoutes(){

    return(
        <>
{/* Литература */}
        <AdminLiteratureRoutes/>
        </>
    )
} 

