import React, {PureComponent} from 'react'
import './podcast.scss'
import {Icon} from '@iconify/react'
import podcastIcon from '@iconify/icons-fa-solid/podcast';

export default class PodcastPage extends PureComponent{

  /**
   * Список подкастов кафедры УИ
   * Большой плеер
   * Компонент в списке подкастов
   */

  render(){
    return <section id="podcasts">
      <div className="container">
        <div className="podcast-title text-center">
          <Icon icon={podcastIcon} color="#B21F66" style={{fontSize: "1.75em"}}/>
          <h1>Подкасты кафедры УИ</h1>
          <p>Описание страницы подкастов, что тут есть интересного или что может быть, почему стоит послушать</p>
        </div>
      </div>
    </section>
  }
}