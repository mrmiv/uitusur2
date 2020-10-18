import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {GetCurrentBook} from '../../redux/actions/literatureActions'
// import { FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
// import { faFileAlt } from '@fortawesome/free-solid-svg-icons'

import {Icon} from '@iconify/react'
import {fileAlt} from '@iconify/icons-fa-solid/file-alt'

export class BookView extends PureComponent{

    componentDidMount(){
        this.props.GetCurrentBook('translit_title', this.props.translit_title)
    }

    // getdoc=docpath=>{
    //     Axios(`${docpath}`, {
    //         method: 'GET',
    //         responseType: 'blob' //Force to receive data in a Blob Format
    //     })
    //     .then(response => {
    //     //Create a Blob from the PDF Stream
    //         const file = new Blob(
    //           [response.data], 
    //           {type: 'application/pdf'});
    //     //Build a URL from the file
    //         const fileURL = URL.createObjectURL(file);
    //     //Open the URL on new Window
    //         window.open(fileURL);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
    // }

    renderBook = () => {
        const {Book, isLoading} = this.props.CurrentBook

        if(isLoading){
            return <div className="text-center">
                <div className="spinner-border" style={{width:"3rem", height: "3rem"}} role="status">
                    <span className="sr-only">Загрузка</span>
                </div>
            </div>
        }

        if(!Book){
            return <p>Книга не найдена</p>
        }

        return <div className="row no-gutters align-content-center">
            <div className="book__img col-lg-5 com-md-6 col-sm-6">
                <img src={Book.image} alt={Book.title}/>
                {Book.path && <a className="d-block more-link" style={{color: "black"}} href={Book.path} target="_blank" rel="noopener noreferrer">Читать</a>}
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6">
                <div className="book__info">
                    <h4>{Book.title}</h4>
                    <p className="__category">{Book.category && `${Book.category[0].toUpperCase()}${Book.category.substr(1)}`}</p>
                    <p className="__authors"><span>{Book.author}</span></p>
                    <p>
                        <span>Библиографическое описание</span><br/>
                        {Book.description}
                    </p>
                    <p>
                        <span>Аннотация</span><br/>
                        {Book.annotation}
                    </p>
                    {Book.doc && <p>
                        <strong>Оглавление</strong><br/>
                        <a href={Book.doc} target="_blank" rel="noopener noreferrer">
                            <Icon icon={fileAlt}/> {Book.title}
                        </a>
                    </p>}
                </div>
            </div>
        </div>

    }

    render(){
        return <section id="BookPage">
            {this.renderBook()}
        </section>
    }
}

const mapStateToProps = state => ({
    CurrentBook: state.api.literature.book,
})
  
export default connect(
    mapStateToProps,
    { GetCurrentBook }
)(BookView)