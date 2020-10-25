import React, {PureComponent} from 'react'
import './knowledgeBase.scss'

// import AppOrPodcast from './components/PodcastList'
// import Bookmark from './components/PodcastPlayer'

import {Icon} from '@iconify/react'
// import podcastIcon from '@iconify/icons-fa-solid/podcast'
import bookmarkIcon from '@iconify/icons-ion/bookmark';

export default class KnowledgeBase extends PureComponent{

  render(){
    return <section id="knowledgeBase">
      <div className="container">
        <div className="knowledge-title text-center">
          <Icon icon={bookmarkIcon} color="#B21F66" style={{fontSize: "1.75em"}}/>
          <h1>База знаний</h1>
          <p>Описание страницы базы знаний, что тут есть интересного или что может быть, информация об отметках</p>
        </div>
      </div>
    </section>
  }
}