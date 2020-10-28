import React, {PureComponent} from 'react'

import ReactTooltip from 'react-tooltip'
// import {Icon} from '@iconify/react'
// import vkIcon from '@iconify/icons-mdi/vk';
// import spotifyIcon from '@iconify/icons-mdi/spotify';
// import soundcloudIcon from '@iconify/icons-mdi/soundcloud';
// import bxlAndroid from '@iconify/icons-bx/bxl-android';
// import bxlApple from '@iconify/icons-bx/bxl-apple';
// import podcastIcon from '@iconify/icons-fa-solid/podcast';

export default class KnowledgeLinks extends PureComponent{

  returnTip = place => {
    switch (place) {
      case "vk":
        return "Вконтакте"
      case "soundcloud":
        return "Soundcloud"
      case "yandex":
        return "Яндекс"
      case "spotify": 
        return "Spotify"
      case "apple-podcast":
        return "Apple подкасты"
      case "app-store":
        return "Скачать для iOS"
      case "play-market":
        return  "Скачать для Android"
      default:
        return "Открыть внешний ресурс"
    }
  }

  returnIcon = (link) => {

    const {path, place} = link
    return <a href={path} rel="noopener norefferer" target="_blank" data-for="knowledge-link-tooltip" data-tip={this.returnTip(place)} className={`knowledge-icon icon-${place}`}/>
  }

  render(){
    return <div className="d-flex knowledge-item-links">
      {this.props.links && this.props.links.map( link => this.returnIcon(link))}
      <ReactTooltip
        id="knowledge-link-tooltip"
        place="bottom"
        effect="float"
        multiline={false}
      />
    </div>
  }

}