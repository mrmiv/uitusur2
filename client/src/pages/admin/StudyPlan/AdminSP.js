import React, { Component } from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { clearInfo } from '../../../redux/actions/infoActions'
import { getSP, delSP } from '../../../redux/actions/data_actions/spActionns'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { MessageAlert } from '../components/MessageAlert'

import { Icon } from '@iconify/react';
import plusCircle from '@iconify/icons-fa-solid/plus-circle';
import bxsEdit from '@iconify/icons-bx/bxs-edit';
import trashAlt from '@iconify/icons-fa-solid/trash-alt';

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
        const areYouSure = window.confirm('Вы действительно хотите удалить этот элемент?')
        if(areYouSure){
            window.scrollTo(0, 0)
            this.props.clearInfo()
            this.props.delSP(id)
        } else {
            console.log('Элемент не удален')
        }
    }

    render() {
        const { SP } = this.props
        const { msg } = this.state
        return (
            <div className="container-md container-fluid">
                <MessageAlert msg={msg} id={this.props.info.id}/>
                <div className="row no-gutters align-items-center justify-content-between">
                    <h1>Учебный план</h1>
                    <Link className="add_admin_button" to="/admin/studyplan/add">Добавить учебный план <Icon icon={plusCircle} /></Link>
                </div>
                <table class="table table-hover table-bordered table-sm">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Группа</th>
                            <th scope="col">Курс</th>
                            <th scope="col" style={{ width: "50px", textAlign: "center" }}><Icon icon={bxsEdit} /></th>
                            <th scope="col" style={{ width: "50px", textAlign: "center" }}><Icon icon={trashAlt} /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {SP ?
                            SP.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td name="group">{item.group}</td>
                                        <td name="course">{item.course === 5 ? "1M" : item.course === 6 ? "2M" : item.course}</td>
                                        <td name="edit">
                                            <Link to={`/admin/studyplan/edit/${item._id}`}> <Icon icon={bxsEdit} color="green"/></Link>
                                        </td>
                                        <td name="del">
                                            <button type="button" className="btn" onClick={() => this.delSP(item._id)}><Icon icon={trashAlt} /></button>
                                        </td>
                                    </tr>
                                )
                            })
                            : <p>Загрузка</p>}
                    </tbody>
                </table>
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