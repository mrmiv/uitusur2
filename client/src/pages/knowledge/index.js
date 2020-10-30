import React, {PureComponent} from 'react'
import './knowledge.scss'

// import AppOrPodcast from './components/PodcastList'
// import Bookmark from './components/PodcastPlayer'
import { connect } from 'react-redux';
import { filterKnowledgeList } from './middleware/filterKnowledge'
import {getKnowledgeList, setMarks} from '../../redux/actions/knowledgeActions'
import ReactTooltip from 'react-tooltip'
import {Icon} from '@iconify/react'
import bookmarkIcon from '@iconify/icons-ion/bookmark';
import KnowledgeItem from './components/KnowledgeItem';

export class KnowledgePage extends PureComponent{

  state={
    activeMarks:{
      uk: true,
      i:  true,
      rt: true,
      all:true 
    },
    activeTypes:{
      "Подкаст":    true,
      "Аудиокнига": true,
      "Курс":       true,
      "Приложение": true,
      "Другое":     true
    }
  }

  componentDidMount(){
    this.props.getKnowledgeList()
  }

  componentDidUpdate(prevProps, prevState){

    const allMarksIsNotActive = !Object.values(this.state.activeMarks).find( val => val )
    if((this.state.activeMarks !== prevState.activeMarks) && allMarksIsNotActive){
      this.setState({
        activeMarks:{
          uk: true,
          i:  true,
          rt: true,
          all:true 
        }
      })
    }

    const allTypesIsNotActive = !Object.values(this.state.activeTypes).find( val => val )
    if((this.state.activeTypes !== prevState.activeTypes) && allTypesIsNotActive){
      this.setState({
        activeTypes:{
          "Подкаст":    true,
          "Аудиокнига": true,
          "Курс":       true,
          "Приложение": true,
          "Другое":     true
        }
      })
    }

  }

  setActiveMarks = (name, mark) => {
    const {uk, i, rt, all} = this.state.activeMarks

    const allIsActive = uk && i && rt && all
    
    if(allIsActive){
      this.setState({
        activeMarks:{
          uk:     false,
          i:      false,
          rt:     false,
          all:    false, 
          [name]: true
        }
      })
    } else {
      this.setState({activeMarks:{
        ...this.state.activeMarks,
        [name]: !mark
      }})
    }
  }

  setActiveTypes = (name, value) => {
    const {activeTypes} = this.state
    const allTypesIsActive = Object.values(activeTypes).find( value => !value )

    if(allTypesIsActive === undefined){
      this.setState({
        activeTypes: {
          "Подкаст":    false,
          "Аудиокнига": false,
          "Курс":       false,
          "Приложение": false,
          "Другое":     false,
          [name]:       true
        }
      })
    } else {
      this.setState({activeTypes:{
        ...activeTypes,
        [name]: !value
      }})
    }

  }

  render(){

    const {activeMarks, activeTypes} = this.state
    const {uk, i, rt, all} = activeMarks
    const { knowledgeList } = this.props
    const filteredKnowledgeList = filterKnowledgeList(knowledgeList, activeTypes, activeMarks)
    console.log(knowledgeList, filteredKnowledgeList);

    return <section id="knowledge">
      <div className="container">
        <div className="knowledge-title text-center">
          <Icon icon={bookmarkIcon} color="#EE9A2F" style={{fontSize: "1.75em"}}/>
          <h1>База знаний</h1>
          <p>Описание страницы базы знаний, что тут есть интересного или что может быть, информация об отметках</p>
          <div className="knowledge-sticky-navigation">
            <div className="d-flex justify-content-center py-2 knowledge-marks-list">
              <a data-for="mark" onClick={()=>this.setActiveMarks("uk",uk)} data-tip="Для управления качеством" style={{opacity: uk? 1: 0.35}} className="navigation-knowledge-link transition-cubic transform-scale uk-mark"/>
              <a data-for="mark" onClick={()=>this.setActiveMarks("i",i)} data-tip="Для инноватики" style={{opacity: i ? 1: 0.35}} className="navigation-knowledge-link transition-cubic transform-scale i-mark"/>
              <a data-for="mark" onClick={()=>this.setActiveMarks("rt",rt)} data-tip="Для робототехники" style={{opacity: rt? 1: 0.35}} className="navigation-knowledge-link transition-cubic transform-scale rt-mark"/>
              <a data-for="mark" onClick={()=>this.setActiveMarks("all",all)} data-tip="Для общего развития" style={{opacity: all? 1: 0.35}} className="navigation-knowledge-link transition-cubic transform-scale all-mark"/>
              <ReactTooltip
                id="mark"
                place="bottom"
                effect="float"
                multiline={true}
            />
            </div>
            <div className="d-flex justify-content-center py-2 knowledge-type-list">
              {Object.keys(activeTypes).map( (key, index) => {
                return <a key={index} onClick={()=>this.setActiveTypes(key, activeTypes[key])} style={{opacity: activeTypes[key] ? 1 : 0.35}} className=" more-link navigation-knowledge-type">{key}</a>
              })}
            </div>
          </div>
          <div className="row no-gutters">
          {filteredKnowledgeList.map( (item, index) => <KnowledgeItem item={item} key={item.id} index={index}/>)}
          </div>
          <ReactTooltip
            id="knowledge-link-tooltip"
            place="bottom"
            effect="float"
            multiline={true}
          />
        </div>
      </div>
    </section>
  }
}

const mapStateToProps = state => ({
  knowledgeList: state.api.knowledge.knowledgeList,
  isLoading: state.api.knowledge.isLoading,
  marks: state.api.knowledge.marks,
})

export default connect(
  mapStateToProps,
  {getKnowledgeList, setMarks}
)(KnowledgePage)