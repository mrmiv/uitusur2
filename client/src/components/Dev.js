import React from 'react'
import {Link, useLocation} from 'react-router-dom'

export default function Developing(){

  const location = useLocation()

  return(
    <div className="text-center" style={{marginTop: "100px"}}>
        <h3>
        Страница <code>{location.pathname}</code> находится в разработке, пожалуйста вернитесь позже. 
      </h3>
      <hr/>
      <Link to="/">Вернуться на главную</Link>
        
      
    </div>
  )
}