import React, {Fragment} from 'react'
import store from '../../../store'
import { clearInfo } from '../../../redux/actions/infoActions'

export function MessageAlert({msg, id}){

  if(!msg || !id){
    return <Fragment/>
  }

  return <div className={`alert ${id === "REQ_FAIL" ? 'alert-danger' : ''}${id === "REQ_SUCCESS" ? 'alert-success' : ''} alert-dismissible fade show`} role="alert">
      {id === "REQ_FAIL" && <strong>Ошибка! </strong>}
      {id === "REQ_SUCCESS" && <strong>Успех! </strong>}
      {msg.message}
      <button type="button" className="close" data-dismiss="alert" onClick={() => store.dispatch(clearInfo())} aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
}