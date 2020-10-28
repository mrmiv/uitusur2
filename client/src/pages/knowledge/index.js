import React, {PureComponent} from 'react'
import './knowledge.scss'

// import AppOrPodcast from './components/PodcastList'
// import Bookmark from './components/PodcastPlayer'
import ReactTooltip from 'react-tooltip'
import {Icon} from '@iconify/react'
import bookmarkIcon from '@iconify/icons-ion/bookmark';
import KnowledgeItem from './components/KnowledgeItem';
import KnowledgeSmallItem from './components/KnowledgeSmallItem'

export default class KnowledgePage extends PureComponent{

  state={
    activeMarks:{
      uk: true,
      i:  true,
      rt: true,
      all:true 
    },
    activeTypes:{
      podcast:   true,
      app:       true,
      course:    true,
      audiobook: true,
      other:     true
    },
    knowledgeList: {
      podcasts: [{
          id: 1,
          type: "Подкаст",
          title: "Это интересный подкаст 1",
          description: "Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно",
          image: "",
          links:[
            {
              place: "vk",
              path: "..."
            },
            {
              place: "soundcloud",
              path: "..."
            }
          ],
          marks: {
            uk: true,
            i: true
          }
        },
        {
          id: 2,
          type: "Подкаст",
          title: "Это интересный подкаст 2",
          description: "Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно",
          image: "",
          links:[
            {
              place: "soundcloud",
              path: "..."
            }
          ],
          marks: {
            all: true,
            rt: true
          }
        }
      ],
      smallItems: [
        {
          id: 3,
          type: "Курс",
          title: "Это интересный курс 1",
          description: "Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно",
          image: "",
          path: "...",
          links: [
            {place: "other",
            path: "..."}
          ],
          marks: {
            uk: true,
            i: true
          }
        },
        {
          id: 4,
          type: "Курс",
          title: "Это интересный курс 2",
          description: "Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно",
          image: "",
          path: "...",
          links: [
            {place: "other",
            path: "..."}
          ],
          marks: {
            i: true,
            rt: true,
            all: true,
            uk: true
          }
        }
      ]
    }
  }

  componentDidUpdate(prevProps, prevState){

    const {uk, i, rt, all} = this.state.activeMarks
    const allMarksIsNotActive = !uk && !i && !rt && !all

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

    const {podcast, app, course, audiobook, other} = this.state.activeTypes
    const allTypesIsNotActive = !podcast && !app && !course && !audiobook && !other
    if((this.state.activeTypes !== prevState.activeTypes) && allTypesIsNotActive){
      this.setState({
        activeTypes:{
          podcast:   true,
          app:       true,
          course:    true,
          audiobook: true,
          other:     true
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

  setActiveTypes = (name, mark) => {
    const {podcast, app, course, audiobook, other} = this.state.activeTypes
    const allTypesIsActive = podcast && app && course && audiobook && other

    if(allTypesIsActive){
      this.setState({
        activeTypes:{
          uk:     false,
          i:      false,
          rt:     false,
          all:    false, 
          [name]: true
        }
      })
    } else {
      this.setState({activeTypes:{
        ...this.state.activeTypes,
        [name]: !mark
      }})
    }

  }

  render(){

    const {uk, i, rt, all} = this.state.activeMarks
    const {podcast, app, course, audiobook, other} = this.state.activeTypes
    const {podcasts, smallItems} = this.state.knowledgeList

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
              <a  onClick={()=>this.setActiveTypes("podcast",podcast)} style={{opacity: podcast? 1: 0.35}} className=" more-link navigation-knowledge-type">Подкасты</a>
              <a  onClick={()=>this.setActiveTypes("audiobook",audiobook)} style={{opacity: audiobook? 1: 0.35}} className=" more-link navigation-knowledge-type">Аудиокниги</a>
              <a  onClick={()=>this.setActiveTypes("app",app)} style={{opacity: app? 1: 0.35}} className=" more-link navigation-knowledge-type">Приложения</a>
              <a  onClick={()=>this.setActiveTypes("course",course)} style={{opacity: course? 1: 0.35}} className=" more-link navigation-knowledge-type">Курсы</a>
              <a  onClick={()=>this.setActiveTypes("other",other)} style={{opacity: other? 1: 0.35}} className=" more-link navigation-knowledge-type">Другое</a>
            </div>
          </div>
          <div className="row no-gutters">
          {podcasts.map( (podcast, index) => <KnowledgeItem podcast={podcast} key={podcast.id} index={index}/>)}
          {smallItems.map( (item, index) => <KnowledgeSmallItem item={item} key={item.id} index={index}/>)}
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