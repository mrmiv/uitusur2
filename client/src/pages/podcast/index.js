import React, {PureComponent} from 'react'
import './podcast.scss'

import PodcastList from './components/PodcastList'
import PodcastPlayer from './components/PodcastPlayer'

import {Icon} from '@iconify/react'
import podcastIcon from '@iconify/icons-fa-solid/podcast'

export default class PodcastPage extends PureComponent{

  render(){
    return <section id="podcasts">
      <div className="container">
        <div className="podcast-title text-center">
          <Icon icon={podcastIcon} color="#B21F66" style={{fontSize: "1.75em"}}/>
          <h1>Подкасты кафедры УИ</h1>
          <p>Описание страницы подкастов, что тут есть интересного или что может быть, почему стоит послушать</p>
        </div>
        <PodcastList/>
        <PodcastPlayer/>
      </div>
    </section>
  }
}