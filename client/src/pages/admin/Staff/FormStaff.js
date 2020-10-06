import React, { Component, Fragment } from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { connect } from 'react-redux'
import { clearInfo } from '../../../redux/actions/infoActions'
import { postStaff, patchStaff, GetStaff } from '../../../redux/actions/staffActions'
import { Icon } from '@iconify/react';
import trashAlt from '@iconify/icons-fa-solid/trash-alt';
import { Link, Prompt, withRouter } from 'react-router-dom'
import { transliterate as tr, slugify } from 'transliteration';
import { MessageAlert } from '../components/MessageAlert'

export class StaffForm extends Component {

    state = {
        id: null,

        firstname: '',
        lastname: '',
        secondname: '',
        fullname_url:'',
        post: '',
        degree: '',
        rank: '',
        path: '',
        worktime: [],

        week: '',
        time: '',
        place: '',

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
            this.props.GetStaff('id', id)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const id = this.props.match.params.id
        const { msg } = this.props.info

        if (id) {

            if (id !== prevState.id) {
                this.setState({ id })
            }
            const { CurrentStaff } = this.props.Staff

            if (!CurrentStaff){
                return
            }

            if (CurrentStaff !== prevProps.Staff.CurrentStaff) {

                this.setState({
                    firstname: CurrentStaff.firstname,
                    lastname: CurrentStaff.lastname,
                    secondname: CurrentStaff.secondname,
                    fullname_url: CurrentStaff.fullname_url,
                    post: CurrentStaff.post,
                    degree: CurrentStaff.degree,
                    path: CurrentStaff.path,
                    rank: CurrentStaff.rank,
                    worktime: CurrentStaff.worktime,
                });
            }
        }

        if (msg !== prevProps.info.msg) {
            this.setState({ msg })
        }
    }

    changeInput = e => {
        const field = e.target.name
        const value = e.target.value

        this.setState({ [field]: value })

        if (!this.state.blocked) {
            this.setState({ blocked: true })
        }
       
    }

    setFullnameUrl = () => {

        if (this.state.fullname_url){
            return
        }

        const {lastname, firstname, secondname} = this.state

        const lastname_translit = slugify(lastname)
        const firstname_translit = firstname.length  > 1 ? slugify(firstname[0])  : slugify(firstname)
        const secondname_translit = secondname.length > 1 ? slugify(secondname[0]) : slugify(secondname)

        this.setState({
            fullname_url: `${lastname_translit}-${firstname_translit}${secondname_translit}`
        })
    }

    addWorktime = () => {
        const { week, time, place, worktime } = this.state

        let exists = worktime.filter(item => item.week === week.trim())

        if (exists.length === 0 && (week.trim() !== "") && (time.trim() !== "") && (place.trim() !== "")) {
            this.setState({
                worktime: [...worktime, { week: week.trim(), time: time.trim(), place: place.trim() }],
                week: '',
                time: '',
                place: ''
            })
        }
    }

    removeWorktime = (week) => {
        const { worktime } = this.state

        let newworktime = []

        worktime.map(item => {
            if (item.week !== week) {
                newworktime.push(item)
            }
        })

        this.setState({ worktime: newworktime })

    }

    submitForm = e => {
        e.preventDefault()
        window.scrollTo(0, 0)

        this.props.clearInfo()

        const {id} = this.state

        const { firstname,
            secondname,
            lastname,
            fullname_url,
            post,
            degree,
            path,
            rank,
            worktime } = this.state

        const Staff = {
            firstname,
            secondname,
            lastname,
            fullname_url,
            post,
            degree,
            rank,
            path,
            worktime
        }

        // console.log(Staff);

        if (id) {
            this.props.patchStaff(id, Staff)
        } else {
            this.props.postStaff(Staff)
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
                <MessageAlert msg={msg} id={this.props.info.id}/>
                <div className="row no-gutters justify-content-between">
                    <Link to="/admin/staff">Назад</Link>
                    <form className="w-100 mt-3" onSubmit={this.submitForm}>
                        <div className="form-row">
                            <div className="col form-group">
                                <label htmlFor="lastname-input">Фамилия</label>
                                <input onChange={this.changeInput} type="text" className="form-control"
                                    name="lastname" id="lastname-input" placeholder="Иванов" value={this.state.lastname} />
                            </div>
                            <div className="col form-group">
                                <label htmlFor="firstname-input">Имя</label>
                                <input onChange={this.changeInput} type="text" className="form-control"
                                    name="firstname" id="firstname-input" placeholder="Иван" value={this.state.firstname} />
                            </div>
                            <div className="col form-group">
                                <label htmlFor="secondname-input">Отчество</label>
                                <input onChange={this.changeInput} type="text" className="form-control"
                                    name="secondname" id="secondname-input" placeholder="Иванович" value={this.state.secondname} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="fullname_url-input">URL</label>
                            <input onChange={this.changeInput} onFocus={this.setFullnameUrl} type="text" className="form-control"
                                name="fullname_url" id="fullname_url-input" placeholder="ivanov-i-i" value={this.state.fullname_url} />
                        </div>
                        <div className="form-row">
                            <div className="col form-group">
                                <label htmlFor="post-input">Должность</label>
                                <input onChange={this.changeInput} type="text" className="form-control"
                                    name="post" id="post-input" placeholder="Доцент" value={this.state.post} />
                            </div>
                            <div className="col form-group">
                                <label htmlFor="path-input">Справочник</label>
                                <input onChange={this.changeInput} type="text" className="form-control"
                                    name="path" id="path-input" placeholder="http://" value={this.state.path} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col form-group">
                                <label htmlFor="degree-input">Ученая степень</label>
                                <input onChange={this.changeInput} type="text" className="form-control"
                                    name="degree" id="degree-input" placeholder="кан. физ.-мат. наук" value={this.state.degree} />
                            </div>
                            <div className="col form-group">
                                <label htmlFor="rank-input">Ученое звание</label>
                                <input onChange={this.changeInput} type="text" className="form-control"
                                    name="rank" id="rank-input" placeholder="Профессор" value={this.state.rank} />
                            </div>
                        </div>
                        {this.state.worktime.length !== 0 &&
                            <Fragment>
                                <label>Консультации:</label>
                                {this.state.worktime.map((form, index) => {
                                    return (<div key={index} className="d-flex">
                                        <WorktimeForm time={form.time} place={form.place} week={form.week} />
                                        <button className="btn btn-danger ml-2"
                                            onClick={() => this.removeWorktime(form.week)}
                                            style={{ height: "50%" }}><Icon icon={trashAlt} size="lg" /></button>
                                    </div>)
                                })}
                            </Fragment>}
                        {this.state.worktime.length < 7 &&
                            <div className="w-100">
                                <div className="form-row">
                                    <div className="col form-group" style={{ marginBottom: 0 }}>
                                        <label htmlFor="week-input">День недели</label>
                                        <input onChange={this.changeInput} type="text" className="form-control"
                                            name="week" id="week-input" placeholder="Понедельник (нечетная неделя)" value={this.state.week} />
                                    </div>
                                    <div className="col form-group" style={{ marginBottom: 0 }}>
                                        <label htmlFor="time-input">Время консультации</label>
                                        <input onChange={this.changeInput} type="text" className="form-control"
                                            name="time" id="time-input" placeholder="12:00 - 15:00" value={this.state.time} />
                                    </div>
                                    <div className="col form-group" style={{ marginBottom: 0 }}>
                                        <label htmlFor="place-input">Место консультации</label>
                                        <input onChange={this.changeInput} type="text" className="form-control"
                                            name="place" id="place-input" placeholder="ауд. 406 ФЭТ" value={this.state.place} />
                                    </div>
                                    <button className="btn btn-info align-self-end" type="button" onClick={this.addWorktime}>Добавить консультацию</button>
                                </div>
                            </div>}
                        <div className="w-100 mt-2 text-right">
                            <button className="btn btn-success mr-0" type="submit"
                                disabled={isLoading}>{this.state.id ? "Обновить сотрудника" : "Добавить сотрудника"}</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    Staff: state.api.staff.CurrentStaff,
    info: state.info
})

export default withRouter(connect(
    mapStateToProps,
    { postStaff, closeNavbar, clearInfo, patchStaff, GetStaff }
)(StaffForm))

function WorktimeForm({ week, time, place }) {
    return (
        <div className="form-row w-100">
            <div className="col form-group">
                <input disabled type="text" className="form-control"
                    name="week" id="week-input" value={week} />
            </div>
            <div className="col form-group">
                <input disabled type="text" className="form-control"
                    name="time" id="time-input" value={time} />
            </div>
            <div className="col form-group">
                <input disabled type="text" className="form-control"
                    name="place" id="place-input" value={place} />
            </div>
        </div>
    )
}