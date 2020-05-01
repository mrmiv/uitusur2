import React, {lazy, Fragment} from 'react'
import {Route} from 'react-router-dom'

const AdminClubs =lazy(()=>import('./AdminClubs'))
const FormClubs =lazy(()=>import('./FormClubs'))

export default function AdminClubsRoutes(){

    return(
        <Fragment>
        <Route path="/admin/clubs" exact component={(()=>(<Fragment>
            <AdminClubs title="Внеучебная деятельность - Кафедра управления инновациями"/>
            {/* <Home title="Кафедра управления инновациями"/> */}
        </Fragment>))}/>
        <Route path="/admin/clubs/edit/:id" exact component={(()=>(<Fragment>
            <FormClubs title="Редактировать внеучебную деятельность - Кафедра управления инновациями"/>
            {/* <Home title="Кафедра управления инновациями"/> */}
        </Fragment>))}/>
        <Route path="/admin/clubs/add" exact component={(()=>(<Fragment>
            <FormClubs title="Добавить внеучебную деятельность - Кафедра управления инновациями"/>
            {/* <Home title="Кафедра управления инновациями"/> */}
        </Fragment>))}/>
        </Fragment>
    )
} 