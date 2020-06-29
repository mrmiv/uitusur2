import React, { Component } from "react";
import { closeNavbar } from "../../../redux/actions/navbarActions";
import { connect } from "react-redux";
import { clearInfo } from "../../../redux/actions/infoActions";
import { GetDocument, patchDocument, postDocument } from "../../../redux/actions/docsActions";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, Prompt, withRouter } from "react-router-dom";
import CyrillicToTranslit from "cyrillic-to-translit-js";

export class NewsForm extends Component {
  state = {
    id: null,

    title: "",
    category: "",
    date: "",
    subcategory: "",
    path: "",
    doc: null,

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
    const id = this.props.match.params.id;
    const { msg } = this.props.info;
    if (id) {
      if (id !== prevState.id) {
        this.setState({ id });
      }
      const { document } = this.props;

      if (document !== prevProps.document) {
        this.setState({
          title: document.title,
          category: document.category,
          date: document.date,
          subcategory: document.subcategory,
          path: document.path,
          doc: document.document,
        });
      }
    }
    if (msg !== prevProps.info.msg) {
      // console.log(msg);
      this.setState({ msg });
    }
  }

  changeInput = (e) => {
    const field = e.target.name;
    this.setState({ [field]: e.target.value });
    if (!this.state.blocked) {
      this.setState({ blocked: true });
    }
  };

  handeFile = (e) => {
    let file = e.target.files[0];
    if (file) {
      Object.defineProperty(file, "name", {
        writable: true,
        value: CyrillicToTranslit().transform(file["name"], "_"),
      })
      this.setState({ doc: file });
    } else {
      this.setState({ doc: null })
    }
    if (!this.state.blocked) {
      this.setState({ blocked: true });
    }
  };

  submitForm = (e) => {
    e.preventDefault();
    this.props.clearInfo();
    window.scrollTo(0, 0);
    const { id,
      title,
      category,
      subcategory,
      doc,
      path,
      date } = this.state;

    const Doc = {
      title,
      category,
      subcategory,
      doc,
      path,
      date
    }

    if (id) {
      // console.log(fields);
      this.props.patchDocument(id, Doc)
    } else {
      this.props.postDocument(Doc);
    }
  };

  render() {
    const { msg } = this.state;
    const { isLoading } = this.props
    return (
      <div className="container-md container-fluid">
        <Prompt
          when={this.state.blocked}
          message={() => `Вы действительно хотите покинуть эту страницу?`}
        />
        {msg ? (
          <div
            className={`alert 
                ${this.props.info.id === "REQ_FAIL" ? "alert-danger" : null}
                ${
              this.props.info.id === "REQ_SUCCESS" ? "alert-success" : null
              } alert-dismissible fade show`}
            role="alert"
          >
            {this.props.info.id === "REQ_FAIL" && <strong>Ошибка! </strong>}
            {this.props.info.id === "REQ_SUCCESS" && <strong>Успех! </strong>}
            {msg.message}.
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        ) : null}
        <div className="row no-gutters justify-content-between">
          <Link to="/admin/docs">
            <Icon icon={faArrowAltCircleLeft} size="lg" /> Назад
					</Link>
          <form className="w-100 mt-3" onSubmit={this.submitForm}>
            <div className="form-row">
              <div className="col form-group">
                <label htmlFor="title-input">Название документа</label>
                <input
                  onChange={this.changeInput}
                  type="text"
                  className="form-control"
                  name="title"
                  id="title-input"
                  placeholder="Методические указания по выполнению курсовых проектов и курсовых работ"
                  value={this.state.title}
                />
              </div>
              <div className="col form-group">
                <label htmlFor="date-input">Дата утверждения</label>
                <input
                  onChange={this.changeInput}
                  type="date"
                  className="form-control"
                  name="date"
                  id="date-input"
                  value={this.state.date}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="col form-group">
                <label htmlFor="category-input">Категория</label>
                <input
                  onChange={this.changeInput}
                  type="text"
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

            <div className="form-row">
              <div className="col form-group">
                <label htmlFor="path-input">Ссылка</label>
                <input
                  onChange={this.changeInput}
                  type="text"
                  className="form-control"
                  name="path"
                  id="path-input"
                  disabled={this.state.doc}
                  placeholder="https://..."
                  value={this.state.path}
                />
              </div>
              <div className="col form-group">
                <label htmlFor="doc-input">Документ</label>
                {!this.state.id ? <input
                  onChange={this.handeFile}
                  type="file"
                  accept=".doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf"
                  className="form-control-file"
                  name="doc"
                  id="doc-input"
                  disabled={this.state.path}
                /> : <input
                    onChange={this.changeInput}
                    type="text"
                    className="form-control"
                    name="doc"
                    id="doc-input"
                    disabled={true}
                    value={this.state.doc}
                  />}
              </div>
            </div>

            <button
              className="btn btn-success mr-0"
              type="submit"
              disabled={isLoading}
            >
              {this.state.id ? "Обновить документ" : "Добавить документ"}
            </button>
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
