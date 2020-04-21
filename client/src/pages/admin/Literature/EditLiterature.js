import React, {Component} from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { connect } from 'react-redux'
import {clearInfo} from '../../../redux/actions/infoActions'
import {postLiterature} from '../../../redux/actions/literatureActions'
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import { faPlusCircle, faArrowAltCircleLeft, faBell } from '@fortawesome/free-solid-svg-icons'
import { Link, Prompt } from 'react-router-dom'


export class EditLiterature extends Component{

    state={
        title: '',
        description: '',
        annotation: '',
        category: '',
        author: '',
        image: null,
        path: '',
        doc: null,
        keywords:'',

        blocked: false,
        // msg: null,
        // loading: false
    }

    componentWillUnmount(){
        this.props.closeNavbar()
    }

    componentDidMount(){
        document.title = this.props.title
    }

    componentDidUpdate(prevProps) {

        const {LiteratureList} = this.props.Literature
        // console.log(CurrentStaff.firstname, prevProps.Staff.CurrentStaff.firstname);
        
        if (LiteratureList !== prevProps.Literature.LiteratureList) {
            this.setState({ 
                title: LiteratureList.title,
                description: LiteratureList.description,
                annotation: LiteratureList.annotation,
                category: LiteratureList.category,
                author: LiteratureList.author,
                image: LiteratureList.image,
                path: LiteratureList.path,
                doc: LiteratureList.doc,
                keywords: LiteratureList.keywords
            });
        }
    }

    changeInput = e =>{
        const field = e.target.name
        this.setState({[field]: e.target.value})
        if (!this.state.blocked){
            this.setState({blocked:true})
        }
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

        // this.props.postLiterature(Book)
    }

    render(){

        return(
            <div className="container-md container-fluid">
                <Prompt
                    when={this.state.blocked}
                    message={() =>
                    `Вы действительно хотите покинуть эту страницу?`
                    }
                />
                <div className="row no-gutters justify-content-between">
                <Link to="/admin/literature"><Icon icon={faArrowAltCircleLeft} size="lg"/> Назад</Link>
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
                    <div className="form-group">
                        <label HtmlFor="keywordsInput">Ключевые слова</label>
                        <input onChange={this.changeInput} type="text" className="form-control" 
                        name="keywords" id="keywordsInput" placeholder="Введите ключевые слова через пробел без запятых" value={this.state.keywords}/>
                    </div>                    
                </form>
                <div className="w-100 mt-2 text-right">
                    <button className="btn btn-success mr-0" type="submit" onClink={this.submitForm}
                    disabled={this.state.loading}>Добавить книгу</button>
                </div>
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
    { 
        // postLiterature, 
        closeNavbar, 
        clearInfo }
)(EditLiterature)