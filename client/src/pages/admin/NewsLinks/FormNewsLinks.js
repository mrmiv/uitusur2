import React, { PureComponent } from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { connect } from 'react-redux'
import { getOneNewsLink, postNewsLink, patchNewsLink } from '../../../redux/actions/newsLinksActions'
import { clearInfo } from '../../../redux/actions/infoActions'
import { Link, Prompt, withRouter } from 'react-router-dom'
import { MessageAlert } from '../components/MessageAlert'

export class FormNewsLink extends PureComponent {

  state = {
    id: null,

    name: "",
    type: "",
    path: "",

    blocked: false,
    msg: null
  }

  componentWillUnmount() {
    this.props.closeNavbar()
  }

  componentDidMount() {
    document.title = this.props.title
    const {id} = this.props.match.params
    if (id) {
      this.props.getOneNewsLink(id)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {id} = this.props.match.params
    const { msg } = this.props.info

    if (msg !== prevProps.info.msg) {
      this.setState({ msg })
    }

    if (id && (id !== prevState.id)) {
      this.setState({ id })
      return
    }

    const { NewsLink } = this.props

    if(!NewsLink){
      return
    }

    if (NewsLink !== prevProps.NewsLink) {

      this.setState({
        name: NewsLink.name,
        path: NewsLink.path,
        type: NewsLink.type
      })
    }
    
  }

  changeInput = e => {
    const field = e.target.name
    const value = e.target.value

    this.setState({ [field]: value })

    if (!this.state.blocked) {
      this.setState({ blocked: true })
    }
  }

  submitForm = e => {
    e.preventDefault()
    window.scrollTo(0, 0)
    this.props.clearInfo()
    const {id} = this.state

    const { name, path, type } = this.state

    const NewsLink = { name, type, path }

    if (id) {
      this.props.patchNewsLink(id, NewsLink)
    } else {
      this.props.postNewsLink(NewsLink)
    }

    if (this.props.info.id === "REQ_SUCCESS") {
      this.setState({ blocked: false })
      document.getElementsByTagName("form")[0].reset()
    }
  }

  render() {

    const { isLoading } = this.props
    
    return (
      <div className="container-md container-fluid">
        <Prompt
          when={this.state.blocked}
          message={() =>
            `Вы действительно хотите покинуть эту страницу?`
          }
        />
        
        <MessageAlert msg={this.state.msg} id={this.props.info.id}/>

        <div className="row no-gutters justify-content-between">
          <Link to="/admin/news-links">Назад</Link>
          <form id="curator_form" className="w-100 mt-3" onSubmit={this.submitForm}>
            <div className="form-group">
              <label htmlFor="name-input">Название</label>
              <input id="name-input" value={this.state.name} onChange={this.changeInput}
                className="form-control" name="name" placeholder="Активные конкурсы Российского фонда" type="text" />
            </div>
            <div className="form-row">
              <div className="col form-group">
                <label htmlFor="type-input">Тип новостей</label>
                <select id="grtypeoup-input" value={this.state.type} onChange={this.changeInput}
                  className="form-control" name="type"> 
                  <option defaultValue value={1}>Объявления кафедры</option>
                  <option value={2}>Стипендии, конкурсы и гранты</option>
                  <option value={3}>Конференции</option>
                </select>
              </div>
              <div className="col form-group">
                <label htmlFor="path-input">Ссылка</label>
                <input id="path-input" value={this.state.path} onChange={this.changeInput}
                  className="form-control" name="path" placeholder="https://" type="text" />
              </div>
            </div>
            <div className="d-flex justify-content-end mt-2 text-right">
              <button className="btn btn-success" type="submit"
                disabled={isLoading}>{this.state.id ? "Обновить ссылку" : "Добавить ссылку"}</button>
            </div>
          </form>
        </div>
      </div >
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.api.news.newslinks.isLoading,
  NewsLink: state.api.news.newslinks.NewsLink,
  info: state.info
})

export default withRouter(connect(
  mapStateToProps,
  {
    closeNavbar,
    clearInfo,
    getOneNewsLink, 
    postNewsLink, 
    patchNewsLink
  }
)(FormNewsLink))