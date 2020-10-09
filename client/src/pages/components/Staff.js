import React, { Fragment, PureComponent } from 'react'
import { connect } from 'react-redux'
import { GetStaff } from '../../redux/actions/staffActions';
import { Icon } from '@iconify/react'
import linkIcon from '@iconify/icons-fa-solid/link';
import copyIcon from '@iconify/icons-fa-solid/copy';

export class StaffPage extends PureComponent {

    state = {
        CurrentStaff: null,
        isLoading: false
    }

    componentDidMount(){
        document.title = "Сотрудники кафедры - Кафедра управления инновациями"
        
        const {CurrentStaff} = this.props

        if( !CurrentStaff || (CurrentStaff.fullname_url !== this.props.fullname_url) ){
            this.props.GetStaff('translit_name', this.props.fullname_url)
        } else {
            this.setState({CurrentStaff})
        }

    }

    componentDidUpdate(prevProps){
        const { CurrentStaff ,isLoading } = this.props

        if (isLoading !== prevProps.isLoading){
            this.setState({isLoading})
        }

        if(CurrentStaff !== prevProps.CurrentStaff){
            this.setState({CurrentStaff})
        }

    }

    copyStaffPost = () => {
        const staff = this.state.CurrentStaff
        navigator.clipboard.writeText(`${staff.post}${staff.degree ? `, ${staff.degree}` : ''}`)
            .then(()=> alert("Должность скопирована"))
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
                    {" " + CurrentStaff.post}
                    <a title="Копировать должность" style={{cursor: "pointer", marginLeft: "4px"}} onClick={this.copyStaffPost}>
                        <Icon inline color="#354ED1" icon={copyIcon} />
                    </a>
                </p>}
                {CurrentStaff.degree && <p>
                    <span style={{ fontWeight: "500" }}>
                        Ученая степень: 
                    </span>
                    {" " + CurrentStaff.degree}
                </p>}
                {CurrentStaff.rank && <p>
                    <span style={{ fontWeight: "500" }}>
                        Ученое звание: 
                    </span>
                    {" " + CurrentStaff.rank}
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
                <a href={CurrentStaff.path} rel="noopener noreferrer" target="_blank"> <Icon icon={linkIcon} inline color="#354ED1"/> Справочник</a>
            </div>
        </div> : <p>Сотрудник не найден</p>
        
        return CurrentStaffElement
    }

    render() {
        return (this.renderStaff())
    }
}

const mapStateToProps = state => ({
    CurrentStaff: state.api.staff.CurrentStaff.CurrentStaff,
    isLoading: state.api.staff.CurrentStaff.isLoading,
})

export default connect(
    mapStateToProps,
    { GetStaff }
)(StaffPage)