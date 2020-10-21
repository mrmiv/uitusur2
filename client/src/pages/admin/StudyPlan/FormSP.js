import React, { Component } from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { connect } from 'react-redux'
import { postSP, patchSP, getOneSP } from '../../../redux/actions/data_actions/spActionns'
import { clearInfo } from '../../../redux/actions/infoActions'
import { Link, Prompt, withRouter } from 'react-router-dom'
import { DateMaskInput, FormatDateToPost } from '../components/DateField'
import { toDate } from '../../components/NewsList'
import { MessageAlert } from '../components/MessageAlert'

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
                    exam_from: SP.exam && SP.exam.from ? toDate(SP.exam.from,false, "-") : '',
                    exam_to: SP.exam && SP.exam.to ? toDate(SP.exam.to, false, "-") : '',
                    gia_from: SP.gia && SP.gia.from ? toDate(SP.gia.from, false, "-") : '',
                    gia_to: SP.gia && SP.gia.to ? toDate(SP.gia.to, false, "-") : '',
                    weekend_from: SP.weekend && SP.weekend.from ? toDate(SP.weekend.from, false, "-") : '',
                    weekend_to: SP.weekend && SP.weekend.to ? toDate(SP.weekend.to, false, "-") : '',
                    practic_from: SP.practic && SP.practic.to ? toDate(SP.practic.from, false, "-") : '',
                    practic_to: SP.practic && SP.practic.from ? toDate(SP.practic.to, false, "-") : '',
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
            course, 
            group, 
            exam_from: exam_from && FormatDateToPost(exam_from), 
            exam_to: exam_to && FormatDateToPost(exam_to), 
            practic_from: practic_from && FormatDateToPost(practic_from), 
            practic_to: practic_to && FormatDateToPost(practic_to), 
            practic_type, 
            gia_from: gia_from && FormatDateToPost(gia_from), 
            gia_to: gia_to && FormatDateToPost(gia_to), 
            weekend_from: weekend_from && FormatDateToPost(weekend_from), 
            weekend_to: weekend_to && FormatDateToPost(weekend_to)
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
        const { msg, practic_from, practic_to, practic_type, exam_from, exam_to, weekend_from, weekend_to, gia_from, gia_to, group, course } = this.state
        const { isLoading } = this.props

        const practicIsFilled = practic_from || practic_to || practic_type
        const examIsFilled = exam_from || exam_to
        const weekendIsFilled = weekend_from || weekend_to
        const giaIsFilled = gia_from || gia_to

        const needToFillPractic = practicIsFilled && !(practic_from && practic_to && practic_type)
        const needToFillExam = examIsFilled && !(exam_to && exam_from)
        const needToFillWeekend = weekendIsFilled && !(weekend_from && weekend_to)
        const needToFillGia = giaIsFilled && !(gia_from && gia_to)

        const buttonDisabled = isLoading || !(group && course) || (needToFillExam || needToFillGia || needToFillPractic || needToFillWeekend)

        return (
            <div className="container-md container-fluid">
                <Prompt
                    when={this.state.blocked}
                    message={() =>
                        `Вы действительно хотите покинуть эту страницу?`
                    }
                />
                
                <MessageAlert msg={msg} id={this.props.info.id}/>

                <Link to="/admin/studyplan">Назад</Link>
                <form id="SP_form" className="w-100 mt-3" onSubmit={this.submitForm}>
                    <div className="form-row">
                        <div className="col form-group">
                            <label htmlFor="course-input">Курс *</label>
                            <select className="form-control" name="course" id="course-input" onChange={this.changeInput} value={course}>
                                <option value={1}>Бакалавриат - 1 курс</option>
                                <option value={2}>Бакалавриат - 2 курс</option>
                                <option value={3}>Бакалавриат - 3 курс</option>
                                <option value={4}>Бакалавриат - 4 курс</option>
                                <option value={5}>Магистратура - 1 курс</option>
                                <option value={6}>Магистратура - 2 курс</option>
                            </select>
                        </div>
                        <div className="col form-group">
                            <label htmlFor="group-input">Группа *</label>
                            <input onChange={this.changeInput} type="text" className="form-control"
                                name="group" id="group-input" placeholder="057" value={group} />
                        </div>
                    </div>
                    <label ><strong>Экзамены</strong></label>
                    <div className="form-row">
                        <DateMaskInput id="exam_from-input" name="exam_from"
                            changeParentInput={this.changeInput} required={examIsFilled}
                            value={exam_from} label={`С ${examIsFilled && "*"}`} col />
                        <DateMaskInput id="exam_to-input" name="exam_to"
                            changeParentInput={this.changeInput} required={examIsFilled}
                            value={exam_to} label={`ПО ${examIsFilled && "*"}`} col />
                    </div>

                    <div className="form-group">
                        <label htmlFor="practic_type-input"><strong>Практика {practicIsFilled && "*"}</strong></label>
                        <input onChange={this.changeInput} type="text" className="form-control"
                            name="practic_type" id="practic_type-input" placeholder="Производственная" required={practicIsFilled}
                            value={practic_type} />
                    </div>
                    <div className="form-row">
                        <DateMaskInput id="practic_from-input" name="practic_from"
                            changeParentInput={this.changeInput}
                            value={practic_from} required={practicIsFilled} label={`С ${practicIsFilled && "*"}`} col />
                        <DateMaskInput id="practic_to-input" name="practic_to"
                            changeParentInput={this.changeInput}
                            value={practic_to} required={practicIsFilled} label={`ПО ${practicIsFilled && "*"}`} col />
                    </div>

                    <label><strong>ГИА</strong></label>
                    <div className="form-row">
                        <DateMaskInput id="gia_from-input" name="gia_from"
                            changeParentInput={this.changeInput} required={giaIsFilled}
                            value={gia_from} label={`ПО ${giaIsFilled && '*'}`} col />
                        <DateMaskInput id="gia_to-input" name="gia_to"
                            changeParentInput={this.changeInput} required={giaIsFilled}
                            value={gia_to} label={`ПО ${giaIsFilled && '*'}`} col />
                    </div>

                    <label><strong>Каникулы</strong></label>
                    <div className="form-row">

                        <DateMaskInput id="weekend_from-input" name="weekend_from"
                            changeParentInput={this.changeInput} required={weekendIsFilled}
                            value={weekend_from} label={`С ${weekendIsFilled && '*'}`} col />
                        <DateMaskInput id="weekend_to-input" name="weekend_to"
                            changeParentInput={this.changeInput}  required={weekendIsFilled}
                            value={weekend_to} label={`ПО ${weekendIsFilled && '*'}`} col />
                    </div>

                    <div className="d-flex justify-content-end mt-2">
                        <button className="btn btn-success" type="submit"
                            disabled={buttonDisabled}>{this.state.id ? "Обновить учебный план" : "Добавить учебный план"}</button>
                    </div>

                </form>
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