import React, { Fragment, PureComponent } from 'react'
import { connect } from 'react-redux'
import { GetStaff } from '../../redux/actions/staffActions';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

export class StaffPage extends PureComponent {

    state = {
        CurrentStaff: {},
        isLoading: false
    }

    componentDidMount(){
        
        const {CurrentStaff} = this.props.CurrentStaff

        if( !CurrentStaff || (CurrentStaff.fullname_url !== this.props.fullname_url) ){
            this.props.GetStaff('translit_name', this.props.fullname_url)
        }

        document.title = "Сотрудники кафедры - Кафедра управления инновациями"
    }

    componentDidUpdate(prevProps){
        const { CurrentStaff, isLoading } = this.props.CurrentStaff
        const prevCurrentStaff = prevProps.CurrentStaff.CurrentStaff
        const prevIsLoading = prevProps.CurrentStaff.CurrentStaff

        if (isLoading !== prevIsLoading){
            this.setState({isLoading})
        }

        if (CurrentStaff !== prevCurrentStaff){
            this.setState({CurrentStaff})
        }
    }

    renderStaff = () => {

        const { CurrentStaff, isLoading } = this.state
        
        const LoadingElement = <div className="text-center">
            <div className="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
                <span className="sr-only">Загрузка...</span>
            </div>
        </div>

        if (isLoading){
            return LoadingElement
        }

        const CurrentStaffElement = CurrentStaff ? <div className="modal__staff">
            <div className="modal__staff__info">
                <h4>{`${CurrentStaff.lastname} ${CurrentStaff.firstname} ${CurrentStaff.secondname ? CurrentStaff.secondname : ''}`}</h4>
                {CurrentStaff.post && <p>
                    <span style={{ fontWeight: "500" }}>
                        Должность: 
                    </span>
                    {CurrentStaff.post}
                </p>}
                {CurrentStaff.degree && <p>
                    <span style={{ fontWeight: "500" }}>
                        Ученая степень: 
                    </span>
                    {CurrentStaff.degree}
                </p>}
                {CurrentStaff.rank && <p>
                    <span style={{ fontWeight: "500" }}>
                        Ученое звание: 
                    </span>
                    {CurrentStaff.rank}
                </p>}
                {CurrentStaff.worktime && CurrentStaff.worktime.length !== 0 &&
                <Fragment>
                    <p>
                        <span style={{ fontWeight: "500" }}>
                            Время консультаций: 
                        </span>
                    </p>  
                    <table className="table table-responsive table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">День недели</th>
                                <th scope="col">Время</th>
                                <th scope="col">Аудитория</th>
                            </tr>
                        </thead>
                        <tbody>
                            {CurrentStaff.worktime.map((day, index) => {
                                return <tr key={index}>
                                    <td>{day.week}</td>
                                    <td>{day.time}</td>
                                    <td>{day.place}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>                          
                </Fragment>}
                <a href={CurrentStaff.path} rel="noopener noreferrer" target="_blank"> <Icon icon={faLink} /> Справочник</a>
            </div>
        </div> : <p>Сотрудник не найден</p>
        
        return CurrentStaffElement
    }

    render() {
        return (this.renderStaff())
    }
}

const mapStateToProps = state => ({
    CurrentStaff: state.api.staff.CurrentStaff,
})

export default connect(
    mapStateToProps,
    { GetStaff }
)(StaffPage)