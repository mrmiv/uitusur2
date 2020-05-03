import React, { Component } from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { clearInfo } from '../../../redux/actions/infoActions'
import { getSP, delSP } from '../../../redux/actions/data_actions/spActionns'
import { connect } from 'react-redux'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export class AdminSP extends Component {

    state = {
        msg: null
    }

    componentWillUnmount() {
        this.props.closeNavbar()
    }

    componentDidMount() {
        this.props.clearInfo()
        document.title = this.props.title
        this.props.getSP()
    }

    componentDidUpdate(prevProps) {
        const { msg } = this.props.info
        if (msg !== prevProps.info.msg) {
            this.setState({ msg })
        }
    }

    delSP = id => {
        window.scrollTo(0, 0)
        this.props.clearInfo()
        this.props.delSP(id)
    }

    render() {
        const { SP } = this.props
        const { msg } = this.state
        return (
            <div className="container-md container-fluid">
                {msg ?
                    <div className={`alert 
                ${this.props.info.id === "REQ_FAIL" ? 'alert-danger' : null}
                ${this.props.info.id === "REQ_SUCCESS" ? 'alert-success' : null} alert-dismissible fade show`} role="alert">
                        {this.props.info.id === "REQ_FAIL" && <strong>Ошибка! </strong>}
                        {this.props.info.id === "REQ_SUCCESS" && <strong>Успех! </strong>}
                        {msg.message}
                        <button type="button" className="close" data-dismiss="alert" onClick={() => this.props.clearInfo()} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div> : null}
                <div className="row no-gutters justify-content-between">
                    <h2>Учебный план</h2>
                    <Link to="/admin/studyplan/add">Добавить учебный план<Icon icon={faPlusCircle} /></Link>
                    <div className="w-100" />
                    <table class="table table-hover">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Курс</th>
                                <th scope="col">Группа</th>
                                <th scope="col" style={{ width: "50px", textAlign: "center" }}><Icon icon={faTrashAlt} /></th>
                                {/* style={{width="50px"}} */}
                            </tr>
                        </thead>
                        <tbody>
                            {SP ?
                                SP.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td name="course">{item.course === 5 ? "1M" : item.course === 6 ? "2M" : item.course}</td>
                                            <td name="group"><Link to={`/admin/studyplan/edit/${item._id}`}> {item.group}</Link></td>
                                            <td name="del">
                                                <button type="button" className="btn" onClick={() => this.delSP(item._id)}><Icon icon={faTrashAlt} /></button>
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
    SP: state.api.studyplan.StudyPlans,
    info: state.info
})

export default connect(
    mapStateToProps,
    { closeNavbar, clearInfo, getSP, delSP }
)(AdminSP)