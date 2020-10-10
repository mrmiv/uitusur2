import React, { Component, Fragment } from 'react'
import { CSSTransition } from 'react-transition-group';

export class LoadingScreen extends Component {

  state = {
    mounted: false
  }

  componentDidMount(){
    this.setState({mounted: true})
  }

  render(){
    return <CSSTransition
        in={this.state.mounted}
        timeout={300}
        unmountOnExit
        appear={true}
        classNames="loading-screen"
      >
        <div id="LoadingScreen" className="loading-screen">
          <div className="LoadingSpinner"/>
        </div>
      </CSSTransition>
  }
}
