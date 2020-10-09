import React, { Component } from 'react'
import InputMask from 'react-input-mask';

export class DateMaskInput extends Component{

    changeInput = e => {
        this.props.changeParentInput(e)
    }

    render(){
        return(
            <div className={`form-group ${this.props.col && "col"}`}>
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <InputMask {...this.props} 
                    className="form-control"
                    defaultValue="01-01-2020"
                    placeholder="01-01-2020"
                    mask="99-99-9999" maskChar={'_'}
                    alwaysShowMask={false}
                    value={this.props.value}
                    onChange={this.changeInput}
                    id={this.props.id}
                    name={this.props.name}/>
            </div>
        )
    }
}

export function FormatDateToPost(StringDate){
    const ddmmyyy = StringDate.split('-')
    const dd = ddmmyyy[0]
    const mm = ddmmyyy[1]
    const yyyy = ddmmyyy[2]
    return `${mm}-${dd}-${yyyy}`
}