import React, {Component} from 'react'
import {connect} from 'react-redux'
import {GetCurrentBook} from '../../redux/actions/literatureActions'
import { FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'

export class BookView extends Component{

    componentDidMount(){
        this.props.GetCurrentBook(this.props.id)
    }

    getdoc=docpath=>{
        Axios(`${docpath}`, {
            method: 'GET',
            responseType: 'blob' //Force to receive data in a Blob Format
        })
        .then(response => {
        //Create a Blob from the PDF Stream
            const file = new Blob(
              [response.data], 
              {type: 'application/pdf'});
        //Build a URL from the file
            const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
            window.open(fileURL);
        })
        .catch(error => {
            console.log(error);
        });
    }

    render(){
        const {Book, isLoading} = this.props.CurrentBook
        
        return(!isLoading?
            <div className="modal__book">
            {Book?
            <div className="row no-gutters align-content-center">
                <div className="book__img col-lg-5 com-md-6 col-sm-6">
                    <img src={`${Book.image}`} alt={Book.title}/>
                    <div className="w-100"/>
                    {Book.path && <a href={Book.path} target="_blank" rel="noopener noreferrer">Читать</a>}
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
                    {Book.doc && <>
                        <strong>Оглавление</strong><br/>
                        <a onClick={()=>this.getdoc(Book.doc)} style={{cursor:"pointer"}} target="_blank" rel="noopener noreferrer">
                            <Icon icon={faFileAlt}/> {Book.title}
                        </a>
                        <a href={Book.doc} style={{cursor:"pointer"}} target="_blank" rel="noopener noreferrer">
                            <Icon icon={faFileAlt}/> {Book.title}
                        </a>
                    </>}
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