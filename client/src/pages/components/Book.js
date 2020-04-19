import React, {Component} from 'react'
import {connect} from 'react-redux'
import {GetCurrentBook} from '../../redux/actions/literatureActions'
import { FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'

export class BookView extends Component{

    componentDidMount(){
        this.props.GetCurrentBook(this.props.id)
    }

    render(){
        const {Book, isLoading} = this.props.CurrentBook
        
        return(!isLoading?
            <div className="modal__book">
            {Book?
            <div className="row no-gutters align-content-center">
                <div className="book__img col-lg-5 com-md-6 col-sm-6">
                    <img src={`/${Book.image}`} alt={Book.title}/>
                    <div className="w-100"/>
                    <a href="#">Читать</a>
                </div>
                <div className="book__info col-lg-7 col-md-6 col-sm-6">
                <h4>{Book.title}</h4>
                <p>
                    <strong>{Book.author}</strong>
                    <br/>
                    <span>{Book.category}</span>
                    <pre/>
                    <strong>Библиографическое описание</strong><br/>
                    {Book.description}
                    <pre/>
                    <strong>Аннотация</strong><br/>
                    {Book.annotation}
                    <pre/>
                    <strong>Оглавление</strong><br/>
                    <a href={`http://localhost:5000/${Book.doc}`} target="_blank" rel="noopener noreferrer"><><Icon icon={faFileAlt}/> {Book.title}</></a>
                </p>
                </div>
            </div>
            :null}
            </div>
            :
            <div className="text-center">
                <div className="spinner-border" style={{width:"3rem", height: "3rem"}} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    CurrentBook: state.api.literature.book,
})
  
export default connect(
    mapStateToProps,
    { GetCurrentBook }
)(BookView)