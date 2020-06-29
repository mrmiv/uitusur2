import React, {lazy} from 'react'
import {Route} from 'react-router-dom'

const AdminLiterature =lazy(()=>import('./AdminLiterature'))
const LiteratureForm =lazy(()=>import('./FormLiterature'))

export default function AdminLiteratureRoutes(){

    return(
        <>
        <Route path="/admin/literature" exact component={(()=>(<>
            <AdminLiterature title="Литература кафедры - Кафедра управления инновациями"/>
            {/* <Home title="Кафедра управления инновациями"/> */}
        </>))}/>
        <Route path="/admin/literature/edit/:id" exact component={(()=>(<>
            <LiteratureForm title="Редактировать литературу - Кафедра управления инновациями"/>
            {/* <Home title="Кафедра управления инновациями"/> */}
        </>))}/>
        <Route path="/admin/literature/add" exact component={(()=>(<>
            <LiteratureForm title="Добавить литературу - Кафедра управления инновациями"/>
            {/* <Home title="Кафедра управления инновациями"/> */}
        </>))}/>
        </>
    )
} 