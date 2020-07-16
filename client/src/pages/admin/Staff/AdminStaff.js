import React, { Component } from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { GetStaffList, delStaff } from '../../../redux/actions/staffActions'
import { clearInfo } from '../../../redux/actions/infoActions'
import { connect } from 'react-redux'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


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

    delStaff = (id) => {
        this.props.clearInfo()
        this.props.delStaff(id)
        this.props.GetStaffList()
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
                <div className="row no-gutters justify-content-between">
                    <h2>Сотрудники кафедры</h2>
                    <Link to="/admin/staff/form">Добавить сотрудника <Icon icon={faPlusCircle} /></Link>
                    <div className="w-100" />
                    <table className="table table-hover table-sm-responsive">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">ФИО</th>
                                <th scope="col">Должность</th>
                                <th scope="col">Ученая степень</th>
                                <th scope="col" style={{ width: "50px", textAlign: "center" }}><Icon icon={faTrashAlt} /></th>
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
                                                <button type="button" className="btn" onClick={() => this.delStaff(item._id)}><Icon icon={faTrashAlt} /></button>
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
    Staff: state.api.staff.StaffList,
    isLoading: state.api.staff.isLoading,
    info: state.info
})

export default connect(
    mapStateToProps,
    { closeNavbar, GetStaffList, delStaff, clearInfo }
)(AdminStaff)