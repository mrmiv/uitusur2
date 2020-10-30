import React, { Component, Fragment, useState } from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { connect } from 'react-redux'
import { getKnowledgeById, postKnowledge, patchKnowledge } from '../../../redux/actions/knowledgeActions'
import { clearInfo } from '../../../redux/actions/infoActions'
import { Link, Prompt, withRouter } from 'react-router-dom'
import { MessageAlert } from '../components/MessageAlert'
import { FileField } from '../components/FileField'
import { Icon } from '@iconify/react'
import plusCircle from '@iconify/icons-fa-solid/plus-circle'
import trashAlt from '@iconify/icons-fa-solid/trash-alt'
import bxsEdit from '@iconify/icons-bx/bxs-edit'
import bxsCheckCircle from '@iconify/icons-bx/bxs-check-circle';

export class FormKnowledge extends Component {

  state = {
    id: null,

    title: "",
    type: "Другое",
    description: "",
    image: null,
    oldImage: null,
    links: [],
    marks: {
      all: false,
      i:   false,
      uk:  false,
      rt:  false
    },

    link_place: "other",
    link_path: "",

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
      this.props.getKnowledgeById(id)
    }
  }

  componentDidUpdate(prevProps, prevState) {

    const {id} = this.props.match.params
    const { msg } = this.props.info
    const { knowledge } = this.props
    
    if (id && (id !== prevState.id)) {
      this.setState({ id })
    }

    if (id && (knowledge !== prevProps.knowledge)) {
      this.setState({
        title:       knowledge.title,
        type:        knowledge.type,
        description: knowledge.description,
        oldImage:    knowledge.image,
        links:       knowledge.links,
        marks:       knowledge.marks,
      })
    }

    if (msg !== prevProps.info.msg) {
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

  handleFile = files => {
    this.setState({
      image: files[0],
      oldImage: null 
    })
  }

  deleteOldFile = () => {
    this.setState({
      oldImage: null
    })
  }

  addLink = () => {
    
    const { links, link_place, link_path } = this.state

    if(!link_path){
      return
    }

    if (links.find( link => link.path === link_path.trim())){
      return
    }

    this.setState({
      links: [...links, {
        place: link_place,
        path: link_path.trim()
      }],
      link_place: "other",
      link_path: ""
    })
  }

  editLink = (i, place, path) => {
    console.log(i, place, path);
    this.setState(state => {return {
      links: state.links.map( (link, index) => {
        if (i === index){
          link = {place, path}
        }
        return link
      })
    }})
  }

  deleteLink = i => {
    console.log(i);
    const {links} = this.state
    this.setState({
      links: links.filter((link, index) => index !== i)
    })
  }
  
  setMarks = e => {
    const {marks} = this.state
    const field = e.target.name
    const checked = e.target.checked
    this.setState({ marks:{
      ...marks,
      [field]: checked
    } })
  }

  submitForm = e => {
    e.preventDefault()
    window.scrollTo(0, 0)
    this.props.clearInfo()
    const {id} = this.state

    const {
      title,
      type,
      description,
      image,
      marks,
      links
    } = this.state

    const Knowledge = {
      title,
      type,
      description,
      image,
      marks,
      links
    }

    if (id) {
      this.props.patchKnowledge(id, Knowledge)
    } else {
      console.log(Knowledge);
      this.props.postKnowledge(Knowledge)
    }
  }

  render() {
    const { msg, blocked, title, description, links, marks, type, oldImage, image, link_place, link_path, id } = this.state
    const { isLoading } = this.props

    const options = [
      {
        value: "other",
        name: "Внешняя ссылка",
      },
      {
        value: "vk",
        name: "Вконтакте",
      },{
        value: "yandex",
        name: "Яндекс",
      },{
        value: "soundcloud",
        name: "Soundcloud",
      },{
        value: "google",
        name: "Google подкасты",
      },{
        value: "spotify",
        name: "Spotify",
      },{
        value: "castbox",
        name: "Castbox",
      },{
        value: "app-store",
        name: "App Store",
      },{
        value: "play-market",
        name: "Play Market",
      },{
        value: "apple-podcast",
        name: "Apple подкасты",
      },
    ]

    const buttonDisabled = isLoading || (!title || (links && links.length === 0) || !type || !Object.values(marks).find( item => item ) || !(oldImage || image) )

    return (
      <div className="container-md container-fluid">
        <Prompt
          when={blocked}
          message={() =>
            `Вы действительно хотите покинуть эту страницу?`
          }
        />
        
        <MessageAlert msg={msg} id={this.props.info.id}/>

        <div className="row no-gutters justify-content-between">
          <Link to="/admin/knowledge"> Назад</Link>
          <form id="knowledge_form" className="w-100 mt-3" onSubmit={this.submitForm}>
            <div className="form-row">
              <div className="col form-group">
                <label htmlFor="knowledge-title">Название *</label>
                <input id="knowledge-title" required maxLength={64} value={title} onChange={this.changeInput}
                  className="form-control" name="title" placeholder="Система менеджмента качества" type="text" />
              </div>
              <div className="col form-group">
                <label htmlFor="knowledge-type">Тип *</label>
                <select id="knowledge-type" value={type} onChange={this.changeInput}
                  className="form-control" name="type">
                  <option selected value="Другое">Другое</option>
                  <option value="Курс">Курс</option>
                  <option value="Подкаст">Подкаст</option>
                  <option value="Аудиокнига">Аудиокнига</option>
                  <option value="Приложение">Приложение</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="knowledge-marks">Метки *</label>
              
              <div id="knowledge-marks">
                <div className="form-check form-check-inline">
                  <input onChange={this.setMarks} className="form-check-input uk-mark" name="uk" type="checkbox" id="uk-mark" checked={marks.uk}/>
                  <label className="form-check-label" htmlFor="uk-mark">Управление качеством</label>
                </div>
                <div className="form-check form-check-inline">
                  <input onChange={this.setMarks} className="form-check-input i-mark" name="i" type="checkbox" id="i-mark" checked={marks.i}/>
                  <label className="form-check-label" htmlFor="i-mark">Инноватика</label>
                </div>
                <div className="form-check form-check-inline">
                  <input onChange={this.setMarks} className="form-check-input rt-mark" name="rt" type="checkbox" id="rt-mark" checked={marks.rt}/>
                  <label className="form-check-label" htmlFor="rt-mark">Мехатроника и робототехника</label>
                </div>
                <div className="form-check form-check-inline">
                  <input onChange={this.setMarks} className="form-check-input all-mark" name="all" type="checkbox" id="all-mark" checked={marks.all}/>
                  <label className="form-check-label" htmlFor="all-mark">Для общего знания</label>
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="knowledge-description">Описание</label>
              <textarea id="knowledge-description" maxLength={512} value={description} onChange={this.changeInput}
                className="form-control" name="description" type="text" />
            </div>
            
            <LinksList links={links} onDelete={(index) => this.deleteLink(index)} updateLink={(index, place, path) => this.editLink(index, place, path)} options={options}/>
            
            <div className="form-row">
              <div className="col-4 form-group">
                <label htmlFor="knowledge-link-place">Ресурс</label>
                <select id="knowledge-link-place" value={link_place} onChange={this.changeInput}
                  className="form-control" name="link_place">
                  {options.map( (opt, index) => <option index={index} key={index} value={opt.value}>{opt.name}</option> )}
                </select>
              </div>
              <div className="col-6 form-group">
                <label htmlFor="knowledge-link-path">Ссылка</label>
                <input id="knowledge-link-path" value={link_path} onChange={this.changeInput}
                className="form-control" name="link_path" placeholder="https://..." type="text" />
              </div>
              <button type="button" className="btn btn-info col-2" onClick={this.addLink}><Icon color="white" icon={plusCircle}/></button>
            </div>

            <FileField handleParentFiles={this.handleFile} deleteOldFile={this.deleteOldFile} width="100%" 
              accept="image/*" id="imageFileInput" files={oldImage ? [oldImage] : []} label="изображение" 
              undefinedFileName={title} name="image-input" multiple={false}/>

            <div className="d-flex justify-content-end mt-2">
              <button className="btn btn-success" type="submit"
                disabled={buttonDisabled}>{id ? `Обновить ${type}` : `Добавить ${type}`}</button>
            </div>
          </form>
        </div>
      </div >
    )
  }
}

const mapStateToProps = state => ({
  knowledge: state.api.knowledge.knowledge,
  isLoading: state.api.knowledge.isLoading,
  info: state.info
})

export default withRouter(connect(
  mapStateToProps,
  {
    getKnowledgeById, postKnowledge, patchKnowledge,
    closeNavbar,
    clearInfo
  }
)(FormKnowledge))

function LinksList({links, options, onDelete, updateLink}) {
  
  const [place, setPlace] = useState("")
  const [path, setPath] = useState("")
  const [i, setIndex] = useState(null)

  if ((links && (links.length === 0))){
    return <Fragment/>
  }

  return links.map( (link, index ) => {
      const edited = i === index
      return <div className="row link-row" key={index} index={index}>
        <div className="col-4"> 
          <select readOnly={!edited} className={`form-control${!edited ? '-plaintext' : ''} knowledge-icon icon-${edited ? place : link.place}`} 
            value={edited? place : link.place} onChange={edited ? (e) => setPlace(e.target.value) : null} >
            {options.map( (opt, j) => {
              return <option key={j} index={j} value={opt.value}>{opt.name}</option>
            }) }
          </select>
        </div>
        <div className="col-6">
          <input className={`form-control${!edited ? '-plaintext': ''}`} readOnly={!edited}
            value={ edited ? path : link.path} onChange={edited ? (e) => setPath(e.target.value) : null} />
        </div>
        <div className="col-2">
          <div className="d-flex justify-content-end">
          {!edited ?
            <Fragment>
              <a className="btn" onClick={() => {
                setPlace(link.place)
                setPath(link.path)
                setIndex(index)
              }}><Icon color="green" icon={bxsEdit}/></a>
              <a className="btn" onClick={() => onDelete(index)}><Icon color="red" icon={trashAlt}/></a>
            </Fragment>
            :<a className="btn" onClick={() => {
              updateLink(index, place, path)
              setIndex(null)
            }}><Icon color="green" icon={bxsCheckCircle}/></a>
          }
          </div>
        </div>
      </div>
  })

}