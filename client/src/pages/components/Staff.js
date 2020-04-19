import React, {Component} from 'react'
import {connect} from 'react-redux'
import {GetStaff} from '../../redux/actions/staffActions';
import { FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

export class StaffPage extends Component{

    state = {
        isLoading: this.props.CurrentStaff.isLoading,
        CurrentStaff: this.props.CurrentStaff.CurrentStaff
    }

    componentDidMount(){
        // load staff, update title
        this.props.GetStaff(this.props.id)
    }

    componentDidUpdate(prevProps){
        const {CurrentStaff} = this.props
        
        if(CurrentStaff !== prevProps.CurrentStaff){
            this.setState({CurrentStaff:CurrentStaff.CurrentStaff, isLoading:CurrentStaff.isLoading})
        }
        if(this.state.CurrentStaff){
            document.title = `${this.state.CurrentStaff.lastName +' '+  this.state.CurrentStaff.firstName} - Сотрудники кафедры`
        }
    }

    render(){
        const {CurrentStaff, isLoading} = this.state
        // console.log(CurrentStaff);
        
        return(
            !isLoading 
            ?
            <div className="modal__staff">
                {CurrentStaff &&
                <div className="modal__staff__info">
                <h4>{CurrentStaff.lastName +' '+ CurrentStaff.firstName}</h4>
                {CurrentStaff.post && <p>
                    <strong>
                    Должность: 
                    </strong>
                    {' ' + CurrentStaff.post}
                </p>}
                {CurrentStaff.degree && <p>
                    <strong>
                        Ученая степень: 
                    </strong>
                    {' ' + CurrentStaff.degree}
                </p>}
                {CurrentStaff.rank && <p>
                    <strong>
                        Ученое звание: 
                    </strong>
                    {' ' + CurrentStaff.rank}
                </p>}
                    {CurrentStaff.worktime &&
                    <p>
                    <strong>
                    Время консультаций: 
                    </strong>
                    <br/>
                    <table class="table table-bordered table-responsive">
                    <thead>
                        <tr>
                        <th scope="col">День недели</th>
                        <th scope="col">Время</th>
                        <th scope="col">Аудитория</th>
                        </tr>
                    </thead>
                    <tbody>
                        {CurrentStaff.worktime.map(day => {
                        return <tr>
                            <td>{day.week}</td>
                            <td>{day.time}</td>
                            <td>{day.place}</td>
                        </tr> 
                        })}
                    </tbody>
                    </table>
                    </p>}
                <a href={CurrentStaff.path} rel="noopener noreferrer" target="_blank"> <Icon icon={faLink}/> Справочник</a>
                </div>}
            </div>
            :
            <div className="text-center">
                <div className="spinner-border" style={{width:"3rem", height: "3rem"}} role="status">
                    <span className="sr-only">Загрузка...</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    CurrentStaff: state.api.staff.CurrentStaff,
})
  
export default connect(
    mapStateToProps,
    { GetStaff }
)(StaffPage)