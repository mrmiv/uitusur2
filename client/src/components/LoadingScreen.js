import React, { Component } from 'react'

export class LoadingScreen extends Component {

  constructor(props){
    super(props);
    this.viewRef = React.createRef();
  }

  componentWillUnmount(){
    this.viewRef.current.style.opacity = 0;
  }

  render(){
    return (
      <div ref={this.viewRef} id="LoadingScreen">
          <div className="LoadingSpinner"/>
          {/* <p><strong>Кафедра<br/> УИ</strong></p> */}
          {/* <img src="/svg/FIT_LOGO_NAV.svg" alt="Загрузка..."/> */}
      </div>
    )
  }

  

}
