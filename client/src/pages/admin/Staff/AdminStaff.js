import React, { Component } from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { GetStaffList, delStaff } from '../../../redux/actions/staffActions'
import { clearInfo } from '../../../redux/actions/infoActions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react';
import plusCircle from '@iconify/icons-fa-solid/plus-circle';
import cogIcon from '@iconify/icons-fa-solid/cog';
import trashAlt from '@iconify/icons-fa-solid/trash-alt';

export class AdminStaff extends Component {

    state = {
        page: 1,
        perPage: 12,
        msg: null
    }

    componentWillUnmount() {
        this.props.closeNavbar()
    }

    componentDidMount() {
        document.title = this.props.title
        this.props.clearInfo()
        this.props.GetStaffList()
    }

    componentDidUpdate(prevProps) {
        const { msg } = this.props.info

        if (msg !== prevProps.info.msg) {
            this.setState({ msg })
        }
    }

    delStaff = id => {
        const areYouSure = window.confirm('Вы действительно хотите удалить этот элемент?')
        if(areYouSure){
            window.scrollTo(0, 0)
            this.props.clearInfo()
            this.props.delStaff(id)
        } else {
            console.log('Элемент не удален')
        }
    }

    render() {
        const { Staff, isLoading } = this.props
        const { StaffList } = Staff
        const { msg } = this.state

        return (
            <div className="container-md container-fluid">
                {msg ?
                    <div className={`alert 
        ${this.props.info.id === "REQ_FAIL" ? 'alert-danger' : null}
        ${this.props.info.id === "REQ_SUCCESS" ? 'alert-success' : null} alert-dismissible fade show`} role="alert">
                        {this.props.info.id === "REQ_FAIL" && <strong>Ошибка! </strong>}
                        {this.props.info.id === "REQ_SUCCESS" && <strong>Успех! </strong>}
                        {msg.message}.
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div> : null}
                <div className="row no-gutters align-items-center justify-content-between">
                    <h1> <Link to="/admin" style={{fontSize: "1em"}}><Icon icon={cogIcon} /></Link> Сотрудники кафедры</h1>
                    <Link className="add_admin_button" to="/admin/staff/form">Добавить сотрудника <Icon icon={plusCircle} /></Link>
                </div>
                <table className="table table-sm table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ФИО</th>
                            <th scope="col">Должность</th>
                            <th scope="col">Ученая степень</th>
                            <th scope="col" style={{ width: "50px", textAlign: "center" }}><Icon icon={trashAlt} /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading && StaffList ?
                            StaffList.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index}</th>
                                        <td name="name"><Link to={`/admin/staff/form/${item._id}`}>
                                            {`${item.lastname} ${item.firstname[0]}. ${item.secondname ? `${item.secondname[0]}.` : ''}`}
                                            </Link></td>
                                        <td name="post">{item.post}</td>
                                        <td name="degree">{item.degree}</td>
                                        <td name="del">
                                            <button type="button" className="btn" onClick={() => this.delStaff(item._id)}><Icon icon={trashAlt} color="red" /></button>
                                        </td>
                                    </tr>
                                )
                            })
                            : <p>loading</p>}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    Staff: state.api.staff.StaffList,
    isLoading: state.api.staff.isLoading,
    info: state.info
})

export default connect(
    mapStateToProps,
    { closeNavbar, GetStaffList, delStaff, clearInfo }
)(AdminStaff)