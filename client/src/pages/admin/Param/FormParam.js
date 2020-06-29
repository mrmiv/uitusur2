import React, { Component, Fragment } from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { connect } from 'react-redux'
import { Editor } from "@tinymce/tinymce-react";
import { getParam, patchParam, postParam,getPageParam } from '../../../redux/actions/data_actions/paramActions'
import { clearInfo } from '../../../redux/actions/infoActions'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { Link, Prompt, withRouter } from 'react-router-dom'

export class FormParam extends Component {

  state = {
    id: null,

    title: "",
    text: "",
    page: "О кафедре",
    active: false,
    order: 0,
    image: "",

    order_length: null,

    visiblePreview: false,
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

    if (id) {
      if (id !== prevState.id) {
        this.setState({ id })
      }
      const { param } = this.props

      if (param !== prevProps.param) {

        this.setState({
          title: param.title,
          text: param.text,
          page: param.page,
          image: param.img || null,
          active: param.isActive,
          order: param.order
        });
      }
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

  changeBody = (text) => {
    this.setState({ text });
    if (!this.state.blocked) {
      this.setState({ blocked: true });
    }
  };

  submitForm = e => {
    e.preventDefault()
    window.scrollTo(0, 0)
    this.props.clearInfo()

    const { title, text, page, id, image, order, active } = this.state

    const Param = {
      title: title.trim(),
      text,
      page,
      image,
      order,
      active
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
    const { msg } = this.state
    console.log(this.state);
    
    const { isLoading } = this.props    
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
          <Link to="/admin/param"><Icon icon={faArrowAltCircleLeft} size="lg" /> Назад</Link>
          <form id="param_form" className="w-100 mt-3" onSubmit={this.submitForm}>

            <div className="form-row">
              <div className="col form-group">
                <label htmlFor="title-input">Заголовок</label>
                <input onChange={this.changeInput} type="text" className="form-control"
                  name="title" id="title-input" placeholder="Правила подачи документов" value={this.state.title} />
              </div>
              <div className="col form-group">
                <label htmlFor="page-input">Страница</label>
                <select onChange={this.changeInput} value={this.state.page} 
                name="page" id="page-input" className="form-control">
                    <option defaultValue value="О кафедре">О кафедре</option>
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
                  {this.state.order_length && (this.state.id ? 
                    this.state.order_length.map((ord,index)=>{
                      return <option defaultValue={index===0} value={index+1}>{index+1}</option> 
                    })
                    : <Fragment>
                      {this.state.order_length.map((ord,index)=>{
                      return <option defaultValue={index===0} value={index+1}>{index+1}</option> 
                    })} <option value={this.state.order_length.length+1}>{this.state.order_length.length +1}</option> 
                    </Fragment>
                  )}

                </select>
                
              </div>

              <div className="col form-group">
                <label htmlFor="image-input">Изображение</label>
                <select onChange={this.changeInput} value={this.state.image} 
                name="image" id="image-input" className="form-control">
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

            <div className="form-group">
              <label htmlFor="body-input">Сообщение</label>
              <Editor
                initialValue={this.state.text}
                init={{
                  height: 400,
                  // plugins: [
                  //   "advlist autolink lists link charmap print preview anchor",
                  //   "searchreplace visualblocks code",
                  //   "insertdatetime table paste code help wordcount",
                  // ],
                  plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                  menubar: 'file edit view insert format tools table help',
                  toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                  // toolbar_sticky: true,
                  style_formats: [
                    { title: 'button', inline: 'button', class: "more-link" }
                  ],
                  // toolbar:
                  //   "undo redo | formatselect | bold italic backcolor |alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | table insertfile image link media mediaembed pageembed | preview help",
                }}
                onEditorChange={this.changeBody}
                id="body-input"
              />
            </div>
            <div className="justify-content-end align-items-center form-row">
              
            <div className="form-group col-auto">
                <div className="form-check">
                  <input type="checkbox" id="activity" name="active" 
                  className="form-check-input" onChange={()=>this.setState({active: !this.state.active})} checked={this.state.active}/>
                  <label htmlFor="activity" className="form-check-label">Отобразить на странице</label>
                </div>
              </div>
            <div className="col-auto">
              <button className="btn btn-success mr-0" type="submit"
                disabled={isLoading}>{this.state.id ? "Обновить заголовок" : "Добавить заголовок"}</button>
            </div>

            </div>
          </form>
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