import React from 'react'
import { useHistory } from 'react-router-dom'


export const Modal = ({children}) => {
  let history = useHistory()

  let back = e => {
    e.stopPropagation();
    history.goBack();
  }

  return (
    <>
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
      {children}
      </div>
      </>
    )
}