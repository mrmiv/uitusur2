import React, { Component, Fragment } from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { connect } from 'react-redux'
import { EditorArea } from '../components/Editor'
import { getParam, patchParam, postParam, getPageParam } from '../../../redux/actions/data_actions/paramActions'
import { clearInfo } from '../../../redux/actions/infoActions'
import { Link, Prompt, withRouter } from 'react-router-dom'
// import { text } from '@fortawesome/fontawesome-svg-core'
import { ParamComponent } from '../../components/ParamsList'
import { MessageAlert } from '../components/MessageAlert'

export class FormParam extends Component {

  state = {
    id: null,

    title: "",
    text: "",
    page: "О кафедре",
    isActive: false,
    order: 1,
    img: "",

    order_length: null,

    textRight: false,

    blocked: false,
    msg: null
  }

  componentWillUnmount() {
    this.props.closeNavbar()
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    document.title = this.props.title
    this.props.getPageParam(this.state.page)
    const id = this.props.match.params.id
    if (id) {
      this.props.getParam(id)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const id = this.props.match.params.id
    const { msg } = this.props.info
    const { param } = this.props
    
    if ( id && (id !== prevState.id)) {
      this.setState({ id })
    }

    if (id && (param !== prevProps.param)) {
        this.setState({
          title: param.title,
          text: param.text,
          page: param.page,
          img: param.img || null,
          isActive: param.isActive,
          order: param.order
        })
    }

    if(this.props.params_list_onpage !== prevProps.params_list_onpage){
      this.setState({order_length: this.props.params_list_onpage})
    }

    if (this.state.page !== prevState.page){
      this.props.getPageParam(this.state.page)
    }

    if (msg !== prevProps.info.msg) {
      this.setState({ msg })
    }
  }

  changeInput = e => {
    const field = e.target.name
    const {value} = e.target
    this.setState({ [field]: value.length ? value : null })
    if (!this.state.blocked) {
      this.setState({ blocked: true })
    }
  }

  changeBody = text => {
    this.setState({ text });
    if (!this.state.blocked) {
      this.setState({ blocked: true });
    }
  }

  selectOrderCountList = () => {
    
    const {id, page, order_length} = this.state
    const propsPage = this.props.param.page

    const option = (value) => (<option value={value}>{value}</option>)

    if(!order_length){
      return
    }

    const count = order_length.length

    return <Fragment> 
      {order_length.map( (ord, index) => option(index+1) )}
      {(!id || (page !== propsPage)) && option(count+1)}
    </Fragment>

  }

  submitForm = e => {
    e.preventDefault()
    window.scrollTo(0, 0)
    this.props.clearInfo()

    const { title, text, page, id, img, order, isActive } = this.state

    const Param = {
      title: title.trim(),
      text,
      page,
      img,
      order,
      isActive
    }

    if (id) {
      this.props.patchParam(id, Param)
    } else {
      this.props.postParam(Param)
    }

    if (this.props.info.id === "REQ_SUCCESS") {
      this.setState({ blocked: false })
      document.getElementById("param_form").reset()
    }

  }

  render() {
    const { msg, title, text, page } = this.state
    const { isLoading } = this.props    

    const buttonDisabled = isLoading || !(title && text && page)

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
          <Link to="/admin/param"> Назад</Link>
          <form id="param_form" className="w-100 mt-3" onSubmit={this.submitForm}>

            <div className="form-row">
              <div className="col form-group">
                <label htmlFor="title-input">Заголовок *</label>
                <input onChange={this.changeInput} type="text" className="form-control"
                  name="title" id="title-input" placeholder="Правила подачи документов" value={this.state.title} />
              </div>
              <div className="col form-group">
                <label htmlFor="page-input">Страница *</label>
                <select onChange={this.changeInput} value={this.state.page} disabled={this.state.id}
                name="page" id="page-input" className="form-control">
                    <option selected value="О кафедре">О кафедре</option>
                    <option value="Поступающему Магистратура">Абитуриенту - Магистратура</option>
                    <option value="Абитуриенту">Абитуриенту - Бакалавриат</option>
                    <option value="Бакалавриат">Обучающимся - Бакалавриат</option>
                    <option value="Магистратура">Обучающимся - Магистратура</option>
                  </select>
                </div>
            </div>

            <div className="form-row">

              <div className="col form-group">
                <label htmlFor="order-input">Порядок на странице</label>
                <select onChange={this.changeInput} value={this.state.order} 
                name="order" id="order-input" className="form-control">
                  {this.selectOrderCountList()}
                </select>
                
              </div>

              <div className="col form-group">
                <label htmlFor="img-input">Изображение</label>
                <select onChange={this.changeInput} value={this.state.img} 
                name="img" id="img-input" className="form-control">
                    <option defaultValue value="">Без изображения</option>
                    <option value="/svg/images_for_params/calendar.svg">Календарь</option>
                    <option value="/svg/images_for_params/files_and_folders.svg">Файлы и папки</option>
                    <option value="/svg/images_for_params/focused_working.svg">Фокусировка</option>
                    <option value="/svg/images_for_params/gpo_bach.svg">Группа на велосипеде</option>
                    <option value="/svg/images_for_params/knowledge.svg">Человек и знания</option>
                    <option value="/svg/images_for_params/quality_check.svg">Документ в руке</option>
                    <option value="/svg/images_for_params/report_analysis.svg">Аналитика</option>
                    <option value="/svg/images_for_params/team_meeting.svg">Работа за столом</option>
                  </select>
                </div>
            </div>

            <EditorArea value={this.state.text} changeParentBody={this.changeBody}/>

            <div className="d-flex justify-content-end align-items-center">
              <div className="form-check mr-3">
                <input type="checkbox" id="activity" name="isActive" 
                className="form-check-input" onChange={()=>this.setState({isActive: !this.state.isActive})} checked={this.state.isActive}/>
                <label htmlFor="activity" className="form-check-label">Отобразить на странице</label>
              </div>
              <button className="btn btn-success" type="submit"
                disabled={buttonDisabled}>{this.state.id ? "Обновить заголовок" : "Добавить заголовок"}</button>
            </div>
          </form>

          <section id="preview-param">
            <ParamComponent
              param={{
                title: this.state.title,
                text: this.state.text,
                img: this.state.img,
              }}
              index={this.state.order}
            />
          </section>

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  param: state.param.param,
  params_list_onpage: state.param.params_list_onpage,
  isLoading: state.param.isLoading,
  info: state.info
})

export default withRouter(connect(
  mapStateToProps,
  { postParam, closeNavbar, clearInfo, patchParam, getParam, getPageParam }
)(FormParam))