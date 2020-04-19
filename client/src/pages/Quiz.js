import React, {Component} from 'react'
import store from '../store'
import { closeNavbar } from '../redux/actions/navbarActions'

export default class Quiz extends Component{

    componentDidMount() {
        document.title = this.props.title
    }

    componentWillUnmount(){
        store.dispatch(closeNavbar())
    }

    render(){
        return( 
            <div className="container-md container-fluid">
            <iframe 
            src="https://docs.google.com/forms/d/1WuJRl4yDM3UrgX1hdF1vqWTRO7RBChTZw2Zilu2WUMg/viewform?embedded=true" 
            width="100%" height={window.innerHeight-100} frameBorder="0" marginHeight="0" marginWidth="0">Загрузка...</iframe>
            </div>
        )
    }
}
