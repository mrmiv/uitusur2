import React, {lazy, Suspense} from 'react'
import {Route} from 'react-router-dom'
import { LoadingScreen } from '../../../components/LoadingScreen'

const AdminKnowledge =lazy(()=>import('./AdminKnowledge'))
const FormKnowledge =lazy(()=>import('./FormKnowledge'))

export default function AdminLiteratureRoutes(){

  return(
    <Suspense fallback={<LoadingScreen/>}>
      <Route path="/admin/knowledge" exact component={(()=>(<>
        <AdminKnowledge title="База знаний - Кафедра управления инновациями"/>
      </>))}/>
      <Route path="/admin/knowledge/edit/:id" exact component={(()=>(<>
        <FormKnowledge title="Редактировать знания - Кафедра управления инновациями"/>
      </>))}/>
      <Route path="/admin/knowledge/add" exact component={(()=>(<>
        <FormKnowledge title="Добавить знания - Кафедра управления инновациями"/>
      </>))}/>
    </Suspense>
  )
} 