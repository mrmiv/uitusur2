import React, { Component } from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { connect } from 'react-redux'
import { clearInfo } from '../../../redux/actions/infoActions'
import { postLiterature, GetCurrentBook, patchLiterature } from '../../../redux/actions/literatureActions'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faArrowAltCircleLeft, faBell } from '@fortawesome/free-solid-svg-icons'
import { Link, Prompt, withRouter } from 'react-router-dom'
import cyrillicToTranslit from 'cyrillic-to-translit-js'

export class LiteratureForm extends Component {

    state = {

        id: null,

        title: '',
        description: '',
        annotation: '',
        category: '',
        author: '',
        image: null,
        path: '',
        doc: null,
        keywords: '',

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
            this.props.GetCurrentBook(id)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const id = this.props.match.params.id
        const { msg } = this.props.info
        if (id) {

            if (id !== prevState.id) {
                this.setState({ id })
            }
            const { Book } = this.props.Book

            if (Book !== prevProps.Book.Book) {
                this.setState({
                    title: Book.title,
                    description: Book.description,
                    annotation: Book.annotation,
                    category: Book.category,
                    image: Book.image,
                    doc: Book.doc,
                    author: Book.author,
                    path: Book.path,
                    keywords: Book.keywords.join(' '),
                });
            }
        }
        if (msg !== prevProps.info.msg) {
            console.log(msg);
            this.setState({ msg })
        }
    }

    changeInput = e => {
        const field = e.target.name
        this.setState({ [field]: e.target.value })
        if (!this.state.blocked) {
            this.setState({ blocked: true })
        }
    }

    handeFile = e => {
        let file = e.target.files[0]
        Object.defineProperty(file, 'name', {
            writable: true,
            value: cyrillicToTranslit().transform(file["name"], "-")
        });
        this.setState({ [e.target.name]: file })
    }

    submitForm = e => {
        e.preventDefault()
        this.props.clearInfo()
        window.scrollTo(0, 0)

        let { title,
            description,
            annotation,
            category,
            author,
            image,
            path,
            doc,
            keywords,
            id } = this.state

        const Book = {
            title: title,
            description: description,
            annotation: annotation,
            category: category,
            author: author,
            image,
            path: path,
            doc,
            keywords: keywords
        }

        // console.log(id);
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
        const { msg, id } = this.state
        const { isLoading } = this.props.Book
        return (
            <div className="container-md container-fluid">
                <Prompt
                    when={this.state.blocked}
                    message={() =>
                        `Вы действительно хотите покинуть эту страницу?`
                    }
                />
                {msg ?
                    <div className={`alert 
                ${this.props.info.id === "REQ_FAIL" ? 'alert-danger' : null}
                ${this.props.info.id === "REQ_SUCCESS" ? 'alert-success' : null} alert-dismissible fade show`} role="alert">
                        {this.props.info.id === "REQ_FAIL" && <strong>Ошибка! </strong>}
                        {this.props.info.id === "REQ_SUCCESS" && <strong>Успех! </strong>}
                        {msg.message}.
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div> : null}
                <div className="row no-gutters justify-content-between">
                    <Link to="/admin/literature"><Icon icon={faArrowAltCircleLeft} size="lg" /> Назад</Link>
                    <form className="w-100 mt-3" onSubmit={this.submitForm}>
                        <div className="form-row">
                            <div className="col form-group">
                                <label HtmlFor="titleInput">Название</label>
                                <input onChange={this.changeInput} required type="text" className="form-control"
                                    name="title" id="titleInput" placeholder="Основы управленческой деятельности" value={this.state.title} />
                            </div>
                            <div className="col form-group">
                                <label HtmlFor="authorInput">Авторы</label>
                                <input onChange={this.changeInput} required type="text" className="form-control"
                                    name="author" id="authorInput" placeholder="Пушкин А.С., Чехов А.П." value={this.state.author} />
                            </div>
                        </div>
                        <div className="form-row mt-2">
                            <div className="col form-group">
                                <label HtmlFor="categoryInput">Категория</label>
                                <input onChange={this.changeInput} required className="form-control"
                                    name="category" id="categoryInput" placeholder="Менеджмент" value={this.state.category} />
                            </div>
                            <div className="col form-group">
                                <label HtmlFor="imageFileInput">Обложка</label>
                                {!this.state.id ?
                                    <input type="file" required onChange={this.handeFile}
                                        accept="image/jpeg, image/jpg, image/png"
                                        name="image" className="form-control-file" id="imageFileInput" />
                                    : <input type="text" disabled value={this.state.image}
                                        name="image" className="form-control" id="imageFileInput" />}
                            </div>
                        </div>
                        <div className="form-row mt-2">
                            <div className="col form-group">
                                <label HtmlFor="pathInput">Ссылка на книгу</label>
                                <input onChange={this.changeInput} type="text" className="form-control"
                                    name="path" id="PathInput" placeholder="http://uitusur.ru" value={this.state.path} />
                            </div>
                            <div className="col form-group">
                                <label HtmlFor="docFileInput">Оглавление</label>
                                {!this.state.id ?
                                    <input type="file" onChange={this.handeFile} accept="application/pdf"
                                        name="doc" className="form-control-file" id="docFileInput" />
                                    : <input type="text" disabled value={this.state.doc}
                                        name="doc" className="form-control" id="docFileInput" />}
                            </div>
                        </div>
                        <div className="form-group">
                            <label HtmlFor="descriptionInput">Библиографическое описание</label>
                            <textarea onChange={this.changeInput} required type="text" className="form-control"
                                name="description" id="descriptionInput" placeholder="..." value={this.state.description} />
                        </div>
                        <div className="form-group">
                            <label HtmlFor="annotationInput">Аннотация</label>
                            <textarea onChange={this.changeInput} required type="text" className="form-control"
                                name="annotation" id="annotationInput" placeholder="..." value={this.state.annotation} />
                        </div>
                        <div className="form-group">
                            <label HtmlFor="keywordsInput">Ключевые слова</label>
                            <input onChange={this.changeInput} required type="text" className="form-control"
                                name="keywords" id="keywordsInput" placeholder="Введите ключевые слова через пробел без запятых" value={this.state.keywords} />
                        </div>
                        <div className="w-100 mt-2 text-right">
                            <button className="btn btn-success mr-0" type="submit" onClick={this.submitForm}
                                disabled={isLoading}>{id ? "Обновить книгу" : "Добавить книгу"}</button>
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