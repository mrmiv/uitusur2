import React, { Fragment, PureComponent } from 'react'
import { withRouter } from 'react-router-dom'

export const Modal = withRouter(class ModalComponent extends PureComponent{
  
  componentDidMount(){
    try{
      document.getElementsByTagName('body')[0].style.overflow = "hidden"
    } catch {}
  }

  componentWillUnmount(){
    try{
      document.getElementsByTagName('body')[0].style.overflow = "auto"
    } catch {}
  }
  

  back = e => {
    const {history} = this.props
    e.stopPropagation();
    history.goBack();
  }

  render(){

    const {children} = this.props

    return (
      <Fragment>
        <div
          id="modal"
          onClick={this.back}
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
        <div id="close-modal-btn" role='button' onClick={this.back}><span >&times;</span></div>
          {children}
        </div>
        </Fragment>
      )
  }
})