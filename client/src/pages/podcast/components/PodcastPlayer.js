import React, {PureComponent} from 'react'

export default class PodcastPlayer extends PureComponent{

  componentDidMount(){
    const audio = document.getElementById("playingNow")
    this.setState({audio})
    console.log(audio.duration, audio.playbackRate)
  }

  state = {
    audio: null,
    src: "/audio/song.mp3",
    play: false,
    speed: 1,
    loop: false,
    muted: false
  }

  setSpeed = speed => {
    const speedList = [1, 1.25, 1.5, 1.75, 2]

    const index = speedList.indexOf(speed)
    const nextIndex = index + 1 
    const nextSpeed = nextIndex < speedList.length ? speedList[nextIndex] : speedList[0]
    this.setState({speed: nextSpeed})
    this.state.audio.playbackRate = nextSpeed
  }

  playPause = play => {
    this.setState({play})
    const {audio} = this.state 
    !play ? audio.pause() : audio.play()
  }

  setMute = muted => {
    this.setState({muted})
    const {audio} = this.state 
    audio.muted = muted
  }

  render(){

    const {play, timecode, speed, loop, muted, src} = this.state

    return <div id="podcast-player">
      <button className="more-link" onClick={() => this.playPause(!play)} style={{color: play ? "green" : "gray"}}>
        Сейчас {play ? "играет музыка" : "пауза"}
      </button>
      <button disabled={!play} className="more-link" onClick={()=>this.setSpeed(speed)} style={{color: "green"}}>Скорость: {speed}</button>
      <button className="more-link" onClick={()=>this.setMute(!muted)} style={{color: "gray"}}>{muted? "Выкл" : "Вкл"}</button>
      <div className="song d-none">
        <audio id="playingNow" src={src} controls muted={muted} preload="auto" loop={loop}>
          Аудио не поддерживается в вашем браузере / Audio is unavailable  
        </audio>
      </div>
    </div>
  }
}