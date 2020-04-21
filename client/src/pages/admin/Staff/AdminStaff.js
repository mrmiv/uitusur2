import React, {Component} from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { GetStaffList, delStaff } from '../../../redux/actions/staffActions'
import { connect } from 'react-redux'
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


export class AdminStaff extends Component{

    state={
        page: 1,
        perPage: 12
    }

    componentWillUnmount(){
        this.props.closeNavbar()
    }

    componentDidMount(){
        document.title = this.props.title
        this.props.GetStaffList()
    }

    delStaff=(id)=>{
        this.props.delStaff(id)
        this.props.GetStaffList()
    }

    render(){
        const {Staff} = this.props
        const {StaffList, isLoading} = Staff

        return(
            <div className="container-md container-fluid">
                <div className="row no-gutters justify-content-between">
                <h2>Сотрудники кафедры</h2>
                <Link to="/admin/staff/add">Добавить сотрудника <Icon icon={faPlusCircle}/></Link>
                <div className="w-100"/>
                <table class="table table-hover table-sm-responsive">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ФИО</th>
                            <th scope="col">Должность</th>
                            <th scope="col">Ученая степень</th>
                            <th scope="col" style={{width:"50px", textAlign: "center"}}><Icon icon={faTrashAlt}/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading && StaffList?
                            StaffList.map((item, index)=>{
                                return(
                                    <tr key={index}>
                                        <th scope="row">{index}</th>
                                        <td name="name"><Link to={`/admin/staff/edit/${item._id}`}>{item.lastname +' '+ item.firstname[0] +'. '+ item.secondname[0]+'.'}</Link></td>
                                        <td name="post">{item.post}</td>
                                        <td name="degree">{item.degree}</td>
                                        <td name="del">
                                            <button type="button" className="btn" onClick={()=>this.delStaff(item._id)}><Icon icon={faTrashAlt}/></button>
                                        </td>
                                    </tr>
                                )
                            })
                        : <p>loading</p>}
                    </tbody>
                    </table>
                </div>
            </div>
        )
    }
} 

const mapStateToProps = state => ({
    Staff: state.api.staff.StaffList
})
  
export default connect(
    mapStateToProps,
    { closeNavbar, GetStaffList, delStaff}
)(AdminStaff)