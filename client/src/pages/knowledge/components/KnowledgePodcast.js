import React, {PureComponent} from 'react'

// import AppOrPodcast from './components/PodcastList'
// import Bookmark from './components/PodcastPlayer'
import ReactTooltip from 'react-tooltip'
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
    marks: {}
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

  render(){

    const {key,index, title, description, image, marks, links, type} = this.state

    return <div className="col-6">
      <div id={`knowledge-podcast-${index}`} className="knowledge-item p-2 knowledge-podcast" data-for="knowledge-description" data-tip={description} key={key}>
        <div className="knowledge-item-image">
          <img src={image ? image : '/svg/FIT_LOGO_NAVBAR.svg'} alt={title}/>
        </div>
        <div className="knowledge-item-content">
          <div className="knowledge-item-title">
            <h5>{title}</h5>
            <p className="knowledge-item-type">{type}</p>
          </div>
          <div className="d-flex knowledge-item-links">

          </div>
          <KnowledgeMarks marks={marks}/>
        </div>
      </div>
    </div>
  }
}