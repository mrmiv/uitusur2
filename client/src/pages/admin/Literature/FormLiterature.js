import React, { Component } from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { connect } from 'react-redux'
import { clearInfo } from '../../../redux/actions/infoActions'
import { postLiterature, GetCurrentBook, patchLiterature } from '../../../redux/actions/literatureActions'
import { Link, Prompt, withRouter } from 'react-router-dom'
import { transliterate as slugify } from 'transliteration';
import { MessageAlert } from '../components/MessageAlert'
import { FileField } from '../components/FileField'


export class LiteratureForm extends Component {

    state = {

        id: null,

        title: '',
        translit_title: '',
        description: '',
        annotation: '',
        category: '',
        author: '',
        image: null,
        path: '',
        doc: null,

        oldDoc: null,
        oldImage: null,

        blocked: false,

        msg: null,
        isLoading: false
    }

    componentWillUnmount() {
        this.props.closeNavbar()
    }

    componentDidMount() {
        document.title = this.props.title
        const id = this.props.match.params.id
        if (id) {
            this.props.GetCurrentBook('id', id)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const id = this.props.match.params.id
        const { msg } = this.props.info

        if (id !== prevState.id) {
            this.setState({ id })
        }

        const { Book } = this.props.Book

        if (id && (Book !== prevProps.Book.Book)) {
            this.setState({
                title: Book.title,
                translit_title: Book.translit_title,
                description: Book.description,
                annotation: Book.annotation,
                category: Book.category,
                oldImage: Book.image,
                oldDoc: Book.doc,
                author: Book.author,
                path: Book.path,
            });
        }
        if (msg !== prevProps.info.msg) {
            this.setState({ msg })
        }
    }

    changeInput = e => {
        const field = e.target.name
        const value = e.target.value

        this.setState({ [field]: value })
        if (field === 'title'){
            const translit_value = slugify(value, { replace: {' ' : '-', '<': '', '>' : ''}, allowedChars: 'a-zA-Z0-9-_'})

            this.setState({translit_title: translit_value })
        }
        if (!this.state.blocked) {
            this.setState({ blocked: true })
        }
    }

    changeTranslitTitle = e => {
        const translit_title = e.target.value
        const regex = /^[a-z0-9-]+$/
        if(regex.test(translit_title)) {
            this.setState({translit_title})
        }
    }
    
    deleteOldFile = oldDoc => {
		this.setState({oldDoc: null})
    }

    deleteOldImage = oldImage => {
		this.setState({oldImage: null})
    }

    handeFile = files => {
        this.setState({ doc: files[0] })
    }

    handleImage = images => {
        this.setState({image: images[0]})
    }

    submitForm = e => {
        e.preventDefault()
        this.props.clearInfo()
        window.scrollTo(0, 0)

        let { title,
            translit_title,
            description,
            annotation,
            category,
            author,
            image,
            path,
            doc,
            id } = this.state

        const Book = {
            title,
            translit_title,
            description,
            annotation,
            category,
            author,
            image,
            path,
            doc,
        }

        if (id) {
            this.props.patchLiterature(id, Book)
        } else {
            this.props.postLiterature(Book)
        }

        if (this.props.info.id === "REQ_SUCCESS") {
            this.setState({ blocked: false })
        }
    }

    render() {
        const { msg, id, title, oldImage, translit_title, image, author, category, annotation, description } = this.state
        const { isLoading } = this.props.Book

        const buttonDisabled = isLoading || !(title && translit_title &&
            (image || oldImage) && author && category &&
            annotation && description)

        return (
            <div className="container-md container-fluid">
                <Prompt
                    when={this.state.blocked}
                    message={() =>
                        `Вы действительно хотите покинуть эту страницу?`
                    }
                />

                <MessageAlert msg={msg} id={this.props.info.id}/>

                <div className="row no-gutters justify-content-between">
                    <Link to="/admin/literature">Назад</Link>
                    <form className="w-100 mt-3" onSubmit={this.submitForm}>
                        <div className="form-row">
                            <div className="col form-group">
                                <label HtmlFor="titleInput">Название *</label>
                                <input onChange={this.changeInput} required type="text" className="form-control"
                                    name="title" id="titleInput" placeholder="Основы управленческой деятельности" value={this.state.title} />
                            </div>
                            <div className="col form-group ">
                                <label HtmlFor="authorInput">Авторы *</label>
                                <input onChange={this.changeInput} required type="text" className="form-control"
                                    name="author" id="authorInput" placeholder="Пушкин А.С., Чехов А.П." value={this.state.author} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label HtmlFor="TranslitTitleInput">URL *</label>
                            <input onChange={this.changeTranslitTitle} required type="text" className="form-control"
                                name="translit_title" id="TranslitTitleInput" placeholder="osnovy-upravlencheskoi-deyatelnosti" 
                                value={this.state.translit_title} />
                        </div>
                        <div className="form-row mt-2">
                            <div className="col form-group">
                                <label HtmlFor="categoryInput">Категория *</label>
                                <input onChange={this.changeInput} required className="form-control"
                                    name="category" id="categoryInput" placeholder="Менеджмент" value={this.state.category} />
                            </div>
                            <div className="col form-group">
                                <label HtmlFor="pathInput">Ссылка на книгу</label>
                                <input onChange={this.changeInput} type="text" className="form-control"
                                    name="path" id="PathInput" placeholder="http://ui.tusur.ru" value={this.state.path} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label HtmlFor="descriptionInput">Библиографическое описание *</label>
                            <textarea onChange={this.changeInput} required type="text" className="form-control"
                                name="description" id="descriptionInput" placeholder="Иванов, И.И., Антонов, В.В. Название книги / И.И. Иванов, В.В. Антонов  — М.: ИЭПП, 2020. — 100 с." value={this.state.description} />
                        </div>
                        <div className="form-group">
                            <label HtmlFor="annotationInput">Аннотация *</label>
                            <textarea onChange={this.changeInput} required type="text" className="form-control"
                                name="annotation" id="annotationInput" placeholder="Семь принципов системы менеджмента качества: ..." value={this.state.annotation} />
                        </div>
                        
                        <div className="d-flex justify-content-between">
                            <div className="form-group w-50">
                                <label HtmlFor="docFileInput">Оглавление</label>
                                <FileField handleParentFiles={this.handeFile} deleteOldFile={this.deleteOldFile} width="100%" accept={["application/pdf"]}
                                id="docFileInput" files={this.state.oldDoc ? [this.state.oldDoc] : []} label="оглавление" undefinedFileName={`Оглавление книги ${this.state.title}`} name="doc-input" multiple={false}/>
                            </div>
                            <div className="form-group w-50 ml-2">
                                <label HtmlFor="imageFileInput">Обложка *</label>
                                <FileField handleParentFiles={this.handleImage} deleteOldFile={this.deleteOldImage} width="100%" accept={"image/jpeg, image/jpg, image/png"}
                                id="imageFileInput" files={this.state.oldImage ? [this.state.oldImage] : []} label="обложку" undefinedFileName={`Обложка книги ${this.state.title}`} name="image-input" multiple={false}/>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end align-items-center mt-2">
                            <button className="btn btn-success" type="submit" onClick={this.submitForm}
                                disabled={buttonDisabled}>{id ? "Обновить книгу" : "Добавить книгу"}</button>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    Book: state.api.literature.book,
    info: state.info
})

export default withRouter(connect(
    mapStateToProps,
    { postLiterature, closeNavbar, clearInfo, GetCurrentBook, patchLiterature }
)(LiteratureForm))