import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'


export const Modal = ({children}) => {
  let history = useHistory()

  let back = e => {
    e.stopPropagation();
    history.goBack();
  }

  return (
    <Fragment>
      <div
        id="modal"
        onClick={back}
        style={{
          zIndex: 1290,
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          background: "rgba(0, 0, 0, 0.5)"
        }}
      >
      </div>
      <div className="modal_window">
      <div id="close-modal-btn" role='button' onClick={back}><span >&times;</span></div>

      {children}
      </div>
      </Fragment>
    )
}