import React, {Component} from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { connect } from 'react-redux'
import {clearInfo} from '../../../redux/actions/infoActions'
import {postLiterature} from '../../../redux/actions/literatureActions'
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import { faPlusCircle, faArrowAltCircleLeft, faBell } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


export class LiteratureForm extends Component{

    state={
        title: '',
        description: '',
        annotation: '',
        category: '',
        author: '',
        image: null,
        path: '',
        doc: null,
        keywords:''

        // msg: null,
        // loading: false
    }

    componentWillUnmount(){
        this.props.closeNavbar()
    }

    componentDidMount(){
        document.title = this.props.title
    }

    // componentDidUpdate(prevProps){
    //     const {info, loading} = this.props
    //     // debugger;
    //     if(info !== prevProps.info || loading !==  prevProps.loading){

    //         // check for login error
    //         if(info.id === "REQ_FAIL" || "REQ_SUCCESS"){
    //             this.setState({
    //                 msg: info.msg,
    //                 loading: loading
    //             })
    //             } else {
    //             this.setState({
    //                 msg:null,
    //                 loading: loading
    //             })
    //         }
    //     }
    // }

    changeInput = e =>{

        const field = e.target.name

        this.setState({[field]: e.target.value})
    }

    handeFile = e =>{
        this.setState({[e.target.name]: e.target.files[0]})
    }

    submitForm=e=>{
        e.preventDefault()
        this.props.clearInfo()

        const {title,
            description,
            annotation,
            category,
            author,
            image,
            path,
            doc,
            keywords} = this.state
        
        //   login user
        const Book = {title,
            description,
            annotation,
            category,
            author,
            image,
            path,
            doc,
            keywords
        }

        // console.log(Book);

        this.props.postLiterature(Book)
    }

    render(){

        return(
            <div className="container-md container-fluid">
                <div className="row no-gutters justify-content-between">
                <Link to="/admin/literature"><Icon icon={faArrowAltCircleLeft} size="lg"/> Назад</Link>
                {/* {this.state.msg && 
                    <div aria-live="polite" aria-atomic="true" styles={{position: 'relative', minHeight: "200px"}}>
                    <div className="toast" styles={{position: 'fixed', top: 80, right: 20}}>
                    <div className="toast-header">
                        <Icon icon={faBell} size="lg" className="rounded mr-2"/>
                        <strong className="mr-auto">Уведомление</strong>
                        <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="toast-body">
                        {this.state.msg}
                    </div>
                </div>
              </div>
              } */}
                <form className="w-100 mt-3" onSubmit={this.submitForm}>
                    <div className="form-row">
                        <div className="col form-group">
                            <label HtmlFor="titleInput">Название</label>
                            <input onChange={this.changeInput} type="text" className="form-control" 
                            name="title" id="titleInput" placeholder="Основы управленческой деятельности" value={this.state.title}/>
                        </div>
                        <div className="col form-group">
                            <label HtmlFor="authorInput">Авторы</label>
                            <input onChange={this.changeInput} type="text" className="form-control" 
                            name="author" id="authorInput" placeholder="Пушкин А.С., Чехов А.П." value={this.state.author}/>
                        </div>
                    </div>
                    <div className="form-row mt-2">
                        <div className="col form-group">
                            <label HtmlFor="categoryInput">Категория</label>
                            <select onChange={this.changeInput} class="form-control" 
                            name="category" id="categoryInput" value={this.state.category}>
                                <option selected>Выберите категорию</option>
                                <option >Психология</option>
                                <option >Стихи</option>
                                <option >Менеджмент</option>
                            </select>
                        </div>
                        <div className="col form-group">
                            <label HtmlFor="imageFileInput">Обложка</label>
                            <input type="file" onChange={this.handeFile}
                            accept="image/jpeg, image/jpg, image/png" 
                            name="image" className="form-control-file" id="imageFileInput"/>
                        </div>
                    </div>
                    <div className="form-row mt-2">
                        <div className="col form-group">
                            <label HtmlFor="pathInput">Ссылка на книгу</label>
                            <input onChange={this.changeInput} type="text" className="form-control" 
                            name="path" id="PathInput" placeholder="http://uitusur.ru" value={this.state.path}/>
                        </div>
                        <div className="col form-group">
                            <label HtmlFor="docFileInput">Оглавление</label>
                            <input type="file" onChange={this.handeFile} accept="application/pdf" 
                            name="doc" className="form-control-file" id="docFileInput"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label HtmlFor="descriptionInput">Библиографическое описание</label>
                        <textarea onChange={this.changeInput} type="text" className="form-control" 
                        name="description" id="descriptionInput" placeholder="..." value={this.state.description}/>
                    </div>
                    <div className="form-group">
                        <label HtmlFor="annotationInput">Аннотация</label>
                        <textarea onChange={this.changeInput} type="text" className="form-control" 
                        name="annotation" id="annotationInput" placeholder="..." value={this.state.annotation}/>
                    </div>
                    <div className="col form-group">
                        <label HtmlFor="keywordsInput">Ссылка на книгу</label>
                        <input onChange={this.changeInput} type="text" className="form-control" 
                        name="keywords" id="keywordsInput" placeholder="Введите ключевые слова через пробел без запятых" value={this.state.keywords}/>
                    </div>
                    <button className="btn btn-success" type="submit"
                        disabled={this.state.loading}>Добавить книгу</button>                        
                </form>
                </div>
            </div>
        )
    }
} 

const mapStateToProps = state => ({
    Literature: state.api.literature.literature,
    info: state.info
})
  
export default connect(
    mapStateToProps,
    { postLiterature, closeNavbar, clearInfo }
)(LiteratureForm)