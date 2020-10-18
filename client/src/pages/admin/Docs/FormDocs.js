import React, { Component } from "react";
import { closeNavbar } from "../../../redux/actions/navbarActions";
import { connect } from "react-redux";
import { clearInfo } from "../../../redux/actions/infoActions";
import { GetDocument, patchDocument, postDocument } from "../../../redux/actions/docsActions";
import { Link, Prompt, withRouter } from "react-router-dom";
import { FormatDateToPost, DateMaskInput } from "../components/DateField";
import { toDate } from "../../components/NewsList";
import { FileField } from "../components/FileField";
import { MessageAlert } from "../components/MessageAlert";

export class NewsForm extends Component {
  state = {
    id: null,

    title: "",
    category: "",
    date: "",
    subcategory: "",
    path: "",
    doc: null,
    oldDoc: null,

    blocked: false,
    msg: null
  };

  componentWillUnmount() {
    this.props.clearInfo()
    this.props.closeNavbar();
  }

  componentDidMount() {
    document.title = this.props.title;
    const id = this.props.match.params.id;
    if (id) {
      this.props.GetDocument(id);
    }
  }

  componentDidUpdate(prevProps, prevState) {

    const id = this.props.match.params.id
    const { msg } = this.props.info
    const { document } = this.props

    if (id !== prevState.id) {
      this.setState({ id })
    }

    if (this.state.id && document !== prevProps.document) {
      this.setState({
        title: document.title,
        category: document.category,
        date: document.date ? toDate(document.date, false ,"-") : "",
        subcategory: document.subcategory,
        path: document.path,
        oldDoc: document.document,
      })
    }

    if (msg !== prevProps.info.msg) {
      this.setState({ msg })
    }
  }

  changeInput = (e) => {
    const field = e.target.name
    const value = e.target.value
    this.setState({ [field]: value })

    if (field === "path"){
      this.setState({path: value, oldDoc: null, doc: null})
    }

    if (!this.state.blocked) {
      this.setState({ blocked: true })
    }
  };

  handleFile = files => {

    this.setState({doc: files[0], path: ""})

    if (!this.state.blocked) {
      this.setState({ blocked: true });
    }

  }

  deleteOldFile = file => {
		this.setState({oldDoc: null})
  }

  submitForm = e => {

    e.preventDefault()
    this.props.clearInfo()
    window.scrollTo(0, 0)

    const { id,
      title,
      category,
      subcategory,
      doc,
      path,
      date } = this.state

    const Doc = {
      title,
      category,
      subcategory,
      doc,
      path,
      date: date ? FormatDateToPost(date) : ''
    }

    if (id) {
      this.props.patchDocument(id, Doc)
    } else {
      this.props.postDocument(Doc)
    }
  };

  render() {

    const { msg, title, doc, path, category } = this.state;
    const { isLoading } = this.props

    const buttonDisabled = isLoading || (!title && !category && (!path || !doc))

    return (
      <div className="container-md container-fluid">
        <Prompt
          when={this.state.blocked}
          message={() => `Вы действительно хотите покинуть эту страницу?`}
        />
        
        <MessageAlert msg={msg} id={this.props.info.id}/>

        <div className="row no-gutters justify-content-between">
          <Link to="/admin/docs">Назад</Link>
          <form className="w-100 mt-3" onSubmit={this.submitForm}>
            <div className="form-row">
              <div className="col form-group">
                <label htmlFor="title-input">Название документа *</label>
                <input
                  onChange={this.changeInput}
                  type="text"
                  required
                  className="form-control"
                  name="title"
                  id="title-input"
                  placeholder="Методические указания по выполнению курсовых проектов и курсовых работ"
                  value={this.state.title}
                />
              </div>
              <DateMaskInput id="date-input" name="date"
                changeParentInput={this.changeInput}
                value={this.state.date} label="Дата утверждения" col />
            </div>
            <div className="form-row">
              <div className="col form-group">
                <label htmlFor="category-input">Категория *</label>
                <input
                  onChange={this.changeInput}
                  type="text"
                  required
                  className="form-control"
                  name="category"
                  id="category-input"
                  placeholder="Методические указания"
                  value={this.state.category}
                />
              </div>
              <div className="col form-group">
                <label htmlFor="subcategory-input">Подкатегория</label>
                <input
                  onChange={this.changeInput}
                  type="text"
                  className="form-control"
                  name="subcategory"
                  id="subcategory-input"
                  placeholder="Курсовые работы и курсовые проекты"
                  value={this.state.subcategory}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="path-input">Ссылка</label>
              <input
                onChange={this.changeInput}
                type="text"
                className="form-control"
                name="path"
                id="path-input"
                disabled={this.state.doc || this.state.oldDoc}
                placeholder="https://..."
                value={this.state.path}
              />
            </div>

            <FileField handleParentFiles={this.handleFile} deleteOldFile={this.deleteOldFile} width="100%" 
              accept=".doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf"
              id="imageFileInput" files={this.state.oldDoc ? [this.state.oldDoc] : []} label="документ" 
              undefinedFileName={this.state.title} name="doc-input" multiple={false}/>

            <div className="d-flex justify-content-end mt-3">
              <button
                className="btn btn-success"
                type="submit"
                disabled={buttonDisabled}
              >
                {this.state.id ? "Обновить документ" : "Добавить документ"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  document: state.api.docs.doc.document,
  isLoading: state.api.docs.doc.isLoading,
  info: state.info,
});

export default withRouter(
  connect(
    mapStateToProps,
    { closeNavbar, clearInfo, postDocument, patchDocument, GetDocument })
    (NewsForm)
);
