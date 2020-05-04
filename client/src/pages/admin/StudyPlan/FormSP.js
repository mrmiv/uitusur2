import React, { Component } from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { connect } from 'react-redux'
import { postSP, patchSP, getOneSP } from '../../../redux/actions/data_actions/spActionns'
import { clearInfo } from '../../../redux/actions/infoActions'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Link, Prompt, withRouter } from 'react-router-dom'

export class SPForm extends Component {

    state = {
        id: null,
        course: 1,
        group: '',
        exam_from: '',
        exam_to: '',
        gia_from: '',
        gia_to: '',
        weekend_from: '',
        weekend_to: '',
        practic_from: '',
        practic_to: '',
        practic_type: '',

        blocked: false,
        msg: null
    }

    componentWillUnmount() {
        this.props.closeNavbar()
    }

    componentDidMount() {
        document.title = this.props.title
        const id = this.props.match.params.id
        if (id) {
            this.props.getOneSP(id)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const id = this.props.match.params.id
        const { msg } = this.props.info

        if (id) {

            if (id !== prevState.id) {
                this.setState({ id })
            }
            const { SP } = this.props

            if (SP !== prevProps.SP) {



                this.setState({
                    course: SP.course,
                    group: SP.group,
                    exam_from: SP.exam && SP.exam.from ? SP.exam.from : '',
                    exam_to: SP.exam && SP.exam.to ? SP.exam.to : '',
                    gia_from: SP.gia && SP.gia.from ? SP.gia.from : '',
                    gia_to: SP.gia && SP.gia.to ? SP.gia.to : '',
                    weekend_from: SP.weekend && SP.weekend.from ? SP.weekend.from : '',
                    weekend_to: SP.weekend && SP.weekend.to ? SP.weekend.to : '',
                    practic_from: SP.practic && SP.practic.to ? SP.practic.to : '',
                    practic_to: SP.practic && SP.practic.from ? SP.practic.from : '',
                    practic_type: SP.practic && SP.practic.type ? SP.practic.type : ''
                });

            }
        }
        if (msg !== prevProps.info.msg) {
            this.setState({ msg })
        }
    }

    changeInput = e => {
        const field = e.target.name
        this.setState({ [field]: e.target.value })
        if (!this.state.blocked) {
            this.setState({ blocked: true })
        }
    }

    submitForm = e => {
        e.preventDefault()
        window.scrollTo(0, 0)
        this.props.clearInfo()
        const id = this.state.id

        const { course, group, exam_from, exam_to, practic_from, practic_to, practic_type, gia_from, gia_to, weekend_from, weekend_to } = this.state

        const SP = {
            course, group, exam_from, exam_to, practic_from, practic_to, practic_type, gia_from, gia_to, weekend_from, weekend_to
        }
        // console.log(Club);

        if (id) {
            this.props.patchSP(id, SP)
        } else {
            this.props.postSP(SP)
        }

        if (this.props.info.id === "REQ_SUCCESS") {
            document.getElementById("SP_form").reset()
        }
    }

    render() {
        const { msg } = this.state
        const { isLoading } = this.props
        return (
            <div className="container-md container-fluid">
                <Prompt
                    when={this.state.blocked}
                    message={() =>
                        `Вы действительно хотите покинуть эту страницу?`
                    }
                />
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
                    <Link to="/admin/studyplan"><Icon icon={faArrowAltCircleLeft} size="lg" /> Назад</Link>
                    <form id="SP_form" className="w-100 mt-3" onSubmit={this.submitForm}>
                        <div className="form-row">
                            <div className="col form-group">
                                <label htmlFor="course-input">Курс</label>
                                <select className="form-control" name="course" id="course-input" onChange={this.changeInput} value={this.state.course}>
                                    <option value={1}>Бакалавриат - 1 курс</option>
                                    <option value={2}>Бакалавриат - 2 курс</option>
                                    <option value={3}>Бакалавриат - 3 курс</option>
                                    <option value={4}>Бакалавриат - 4 курс</option>
                                    <option value={5}>Магистратура - 1 курс</option>
                                    <option value={6}>Магистратура - 2 курс</option>
                                </select>
                            </div>
                            <div className="col form-group">
                                <label htmlFor="group-input">Группа</label>
                                <input onChange={this.changeInput} type="text" className="form-control"
                                    name="group" id="group-input" placeholder="057" value={this.state.group} />
                            </div>
                        </div>
                        <label ><strong>Экзамены</strong></label>
                        <div className="form-row">
                            <div className="col form-group">
                                <label htmlFor="exam_from-input">С</label>
                                <input onChange={this.changeInput} type="date" className="form-control"
                                    name="exam_from" id="exam_from-input"
                                    placeholder={this.state.exam_from} value={this.state.exam_from} />
                            </div>
                            <div className="col form-group">
                                <label htmlFor="exam_to-input">По</label>
                                <input onChange={this.changeInput} type="date" className="form-control"
                                    name="exam_to" id="exam_to-input"
                                    placeholder={this.state.exam_to} value={this.state.exam_to} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="practic_type-input"><strong>Практика</strong></label>
                            <input onChange={this.changeInput} type="text" className="form-control"
                                name="practic_type" id="practic_type-input" placeholder="Производственная"
                                value={this.state.practic_type} />
                        </div>
                        <div className="form-row">

                            <div className="col form-group">
                                <label htmlFor="practic_from-input">С</label>
                                <input onChange={this.changeInput} type="date" className="form-control"
                                    name="practic_from" id="practic_from-input"
                                    placeholder={this.state.practic_from} value={this.state.practic_from} />
                            </div>
                            <div className="col form-group">
                                <label htmlFor="practic_to-input">По</label>
                                <input onChange={this.changeInput} type="date" className="form-control"
                                    name="practic_to" id="practic_to-input"
                                    value={this.state.practic_to} placeholder={this.state.practic_to} />
                            </div>
                        </div>

                        <label><strong>ГИА</strong></label>
                        <div className="form-row">
                            <div className="col form-group">
                                <label htmlFor="gia_from-input">С</label>
                                <input onChange={this.changeInput} type="date" className="form-control"
                                    name="gia_from" id="gia_from-input"
                                    value={this.state.gia_from} placeholder={this.state.gia_from} />
                            </div>
                            <div className="col form-group">
                                <label htmlFor="gia_to-input">По</label>
                                <input onChange={this.changeInput} type="date"
                                    className="form-control" name="gia_to" id="gia_to-input"
                                    value={this.state.gia_to} placeholder={this.state.gia_to} />
                            </div>
                        </div>

                        <label><strong>Каникулы</strong></label>
                        <div className="form-row">
                            <div className="col form-group">
                                <label htmlFor="weekend_from-input">С</label>
                                <input onChange={this.changeInput} type="date" className="form-control"
                                    name="weekend_from" id="weekend_from-input"
                                    placeholder={this.state.weekend_from} value={this.state.weekend_from} />
                            </div>
                            <div className="col form-group">
                                <label htmlFor="weekend_to-input">По</label>
                                <input onChange={this.changeInput} type="date" className="form-control"
                                    name="weekend_to" id="weekend_to-input"
                                    placeholder={this.state.weekend_to} value={this.state.weekend_to} />
                            </div>
                        </div>

                        <div className="w-100 mt-2 text-right">
                            <button className="btn btn-success mr-0" type="submit"
                                disabled={isLoading}>{this.state.id ? "Обновить учебный план" : "Добавить учебный план"}</button>
                        </div>

                    </form>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    SP: state.api.studyplan.groupSP,
    isLoading: state.api.studyplan.isLoading,
    info: state.info
})

export default withRouter(connect(
    mapStateToProps,
    { postSP, patchSP, getOneSP, closeNavbar, clearInfo, }
)(SPForm))