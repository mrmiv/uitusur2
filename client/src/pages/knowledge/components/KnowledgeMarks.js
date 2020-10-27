import React, {PureComponent} from 'react'
import ReactTooltip from 'react-tooltip'

export default class KnowledgeMarks extends PureComponent{

  returnMarks = () => {
    const {marks} = this.props

    return Object.keys(marks).map( key => {
      if (marks[key] === true){
        return <div
          className={`mark ${key}-mark`}
          data-for="small-mark"
          data-tip={this.returnDataTip(key)} 
        />
      } 
    })
  }

  returnDataTip = (key) => {
    switch (key) {
      case "uk":
        return "Для управленя качеством"
      case "i":
        return "Для иноватики"
      case "rt":
        return "Для робототехники"
      case "all":  
        return "Для общего развития"
      default: 
        return "Для всех"
    }
  } 

  render(){
    return <div className="d-flex knowledge-item-marks">
      {this.returnMarks()}
      <ReactTooltip
        id="small-mark"
        place="bottom"
        effect="float"
        multiline={true}
      />
    </div>
  }
}