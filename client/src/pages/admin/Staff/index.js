import React, {lazy, Suspense} from 'react'
import {Route} from 'react-router-dom'
import { LoadingScreen } from '../../../components/LoadingScreen'

const AdminStaff =lazy(()=>import('./AdminStaff'))
const FormStaff =lazy(()=>import('./FormStaff'))

export default function AdminLiteratureRoutes(){

    return(
        <Suspense fallback={<LoadingScreen/>}>
            <Route path="/admin/staff" exact component={(()=>(<>
                <AdminStaff title="Сотрудники кафедры - Кафедра управления инновациями"/>
                {/* <Home title="Кафедра управления инновациями"/> */}
            </>))}/>
            <Route path="/admin/staff/form/:id" exact component={(()=>(<>
                <FormStaff title="Редактировать сотрудника - Кафедра управления инновациями"/>
                {/* <Home title="Кафедра управления инновациями"/> */}
            </>))}/>
            <Route path="/admin/staff/form" exact component={(()=>(<>
                <FormStaff title="Добавить сотрудника - Кафедра управления инновациями"/>
                {/* <Home title="Кафедра управления инновациями"/> */}
            </>))}/>
        </Suspense>
    )
} 