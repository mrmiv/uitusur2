import React, {Component} from 'react'
import {connect} from 'react-redux'
import {GetStaff} from '../../redux/actions/staffActions';
import { FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

export class StaffPage extends Component{

    componentDidMount(){
        // load staff, update title
        this.props.GetStaff(this.props.id)
        const {CurrentStaff} = this.props.CurrentStaff
        document.title = CurrentStaff.lastname +' '+ CurrentStaff.firstname[0]+'. '+ CurrentStaff.secondname[0]+'. - Кафедра управления инновациями'
    }
    
    render(){
        const {CurrentStaff, isLoading} = this.props.CurrentStaff
        
        return(
            !isLoading 
            ?
            <div className="modal__staff">
                {CurrentStaff &&
                <div className="modal__staff__info">
                <h4>{CurrentStaff.lastname +' '+ CurrentStaff.firstname+' '+ CurrentStaff.secondname}</h4>
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