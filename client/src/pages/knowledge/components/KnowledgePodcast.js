import React, {PureComponent} from 'react'

// import AppOrPodcast from './components/PodcastList'
// import Bookmark from './components/PodcastPlayer'
import ReactTooltip from 'react-tooltip'
import {CSSTransition} from 'react-transition-group'
import KnowledgeLinks from './KnowledgeLinks'
import KnowledgeMarks from './KnowledgeMarks'

export default class KnowledgePodcast extends PureComponent{

  state = {
    key: 0,
    index: 0,
    id: 0,
    type: "",
    title: "",
    description: "",
    image: "",
    links:[],
    marks: {},

    openInfo: false
  }

  componentDidMount(){
    const {podcast, key, index} = this.props

    this.setState({
      key:         key,
      index:       index,
      type:        podcast.type,
      id:          podcast.id,
      title:       podcast.title,
      description: podcast.description,
      image:       podcast.image,
      links:       podcast.links,
      marks:       podcast.marks,
    })
  }

  switchInfo = () => {
    this.setState(state => { return {openInfo: !state.openInfo}})
  }

  render(){

    const {key, index, openInfo, title, description, image, marks, links, type} = this.state

    return <div className="col-6">
      <div id={`knowledge-podcast-${index}`} className="knowledge-item p-2 knowledge-podcast" key={key}>
        <CSSTransition
          in={openInfo}
          timeout={300}
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
            <p className="knowledge-item-type">{type}</p>
          </div>
          <div className="knowledge-info-button" onClick={()=> this.switchInfo()}/>
          <KnowledgeLinks links={links}/>
          <KnowledgeMarks marks={marks}/>
        </div>
      </div>
    </div>
  }
}