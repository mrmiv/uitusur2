import React, {lazy, Suspense} from 'react'
import {Route} from 'react-router-dom'
import { LoadingScreen } from '../../../components/LoadingScreen'

const AdminNews =lazy(()=>import('./AdminNews'))
const FormNews =lazy(()=>import('./FormNews'))

export default function AdminLiteratureRoutes(){

    return(
        <Suspense fallback={<LoadingScreen/>}>
            <Route path="/admin/news" exact component={(()=>(<>
                <AdminNews title="Новости - Кафедра управления инновациями"/>
                {/* <Home title="Кафедра управления инновациями"/> */}
            </>))}/>
            <Route path="/admin/news/edit/:id" exact component={(()=>(<>
                <FormNews title="Редактировать новость - Кафедра управления инновациями"/>
                {/* <Home title="Кафедра управления инновациями"/> */}
            </>))}/>
            <Route path="/admin/news/add" exact component={(()=>(<>
                <FormNews title="Добавить новость - Кафедра управления инновациями"/>
                {/* <Home title="Кафедра управления инновациями"/> */}
            </>))}/>
        </Suspense>
    )
} 