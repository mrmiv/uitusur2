import React, {PureComponent} from 'react'

// import AppOrPodcast from './components/PodcastList'
// import Bookmark from './components/PodcastPlayer'
import {CSSTransition} from 'react-transition-group'
import KnowledgeLinks from './KnowledgeLinks'
import KnowledgeMarks from './KnowledgeMarks'

export default class KnowledgeItem extends PureComponent{

  state = {
    key: 0,
    index: 0,
    id: 0,
    type: "",
    title: "",
    description: "",
    image: "",
    path:"",
    link: [],
    marks: {},

    openInfo: false
  }

  componentDidMount(){
    const {item, key, index} = this.props

    this.setState({
      key:         key,
      index:       index,
      type:        item.type,
      id:          item.id,
      title:       item.title,
      description: item.description,
      image:       item.image,
      path:        item.path,
      links:       item.links,
      marks:       item.marks,
    })
  }

  switchInfo = () => {
    this.setState(state => { return {openInfo: !state.openInfo}})
  }

  render(){

    const {key, openInfo, title, description, image, marks, links, type} = this.state

    return <div className="col-md-6">
      <div className="knowledge-item p-2" style={{
            borderRadius: openInfo ? "8px 8px 0 0" : "8px",
            marginBottom: openInfo ? "140px" : ""}} key={key}>
        <CSSTransition
          in={openInfo}
          timeout={50}
          classNames="knowledge-item-description">
          <div className="knowledge-item-description">
            <p>{description}</p>
          </div>
        </CSSTransition>
        <div className="knowledge-item-image">
          <img src={image ? image : '/svg/FIT_LOGO_NAVBAR.svg'} alt={title}/>
        </div>
        <div className="knowledge-item-content">
          <div className="knowledge-item-title">
            <h5>{title}</h5>
          </div>
          <div className="knowledge-info-button" onClick={()=> this.switchInfo()}/>
          <KnowledgeMarks marks={marks}/>
          <KnowledgeLinks links={links}/>
        </div>
      </div>
    </div>
  }
}