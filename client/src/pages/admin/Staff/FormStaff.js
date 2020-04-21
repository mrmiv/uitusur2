import React, {Component} from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { connect } from 'react-redux'
import {clearInfo} from '../../../redux/actions/infoActions'
import {postStaff} from '../../../redux/actions/staffActions'
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


export class StaffForm extends Component{

    state={
        firstname: '',
        lastname: '',
        secondname: '',
        post: '',
        degree: '',
        rank: '',
        path: '',
        worktime: [],

        week:'',
        time:'',
        place:''

        // msg: null,
        // loading: false
    }

    componentWillUnmount(){
        this.props.closeNavbar()
    }

    componentDidMount(){
        document.title = this.props.title
    }

    changeInput = e =>{
        const field = e.target.name
        this.setState({[field]: e.target.value})
    }

    addWorktime = () => {
        const {week, time, place, worktime} = this.state

        let exists = worktime.filter(item=> item.week === week.trim())

        if(exists.length===0 && (week.trim()!=="") && (time.trim()!=="") && (place.trim()!=="")){
            this.setState({
                worktime: [...worktime, {week:week.trim(), time: time.trim(), place: place.trim()}],
                week: '',
                time: '',
                place: ''
            })
        }
    }

    removeWorktime = (week) => {
        const {worktime} = this.state

        let newworktime = []

        worktime.map(item => {
            if(item.week!==week){
                newworktime.push(item)
            }
        })

        console.log(newworktime + 'new');
        
        this.setState({worktime: newworktime})

    }

    submitForm = e => {
        e.preventDefault()
        this.props.clearInfo()

        const {firstname,
        secondname,
        lastname,
        post,
        degree,
        path,
        rank,
        worktime} = this.state

        const Staff = {firstname:firstname.trim(),
            secondname:secondname.trim(),
            lastname:lastname.trim(),
            post: post.trim(),
            degree:degree.trim(),
            rank:rank.trim(),
            path:path.trim(),
            worktime}

        // console.log(Staff);

        this.props.postStaff(Staff)
    }

    render(){

        return(
            <div className="container-md container-fluid">
                <div className="row no-gutters justify-content-between">
                <Link to="/admin/staff"><Icon icon={faArrowAltCircleLeft} size="lg"/> Назад</Link>
                <form className="w-100 mt-3" onSubmit={this.submitForm}>
                    <div className="form-row">
                        <div className="col form-group">
                            <label htmlFor="lastname-input">Фамилия</label>
                            <input onChange={this.changeInput} type="text" className="form-control" 
                            name="lastname" id="lastname-input" placeholder="Иванов" value={this.state.lastname}/>
                        </div>
                        <div className="col form-group">
                            <label htmlFor="firstname-input">Имя</label>
                            <input onChange={this.changeInput} type="text" className="form-control" 
                            name="firstname" id="firstname-input" placeholder="Иван" value={this.state.firstname}/>
                        </div>
                        <div className="col form-group">
                            <label htmlFor="secondname-input">Отчество</label>
                            <input onChange={this.changeInput} type="text" className="form-control" 
                            name="secondname" id="secondname-input" placeholder="Иванович" value={this.state.secondname}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col form-group">
                            <label htmlFor="post-input">Должность</label>
                            <input onChange={this.changeInput} type="text" className="form-control" 
                            name="post" id="post-input" placeholder="Доцент" value={this.state.post}/>
                        </div>
                        <div className="col form-group">
                            <label htmlFor="path-input">Справочник</label>
                            <input onChange={this.changeInput} type="text" className="form-control" 
                            name="path" id="path-input" placeholder="http://" value={this.state.path}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col form-group">
                            <label htmlFor="degree-input">Ученая степень</label>
                            <input onChange={this.changeInput} type="text" className="form-control" 
                            name="degree" id="degree-input" placeholder="кан. физ.-мат. наук" value={this.state.degree}/>
                        </div>
                        <div className="col form-group">
                            <label htmlFor="rank-input">Ученое звание</label>
                            <input onChange={this.changeInput} type="text" className="form-control" 
                            name="rank" id="rank-input" placeholder="Профессор" value={this.state.rank}/>
                        </div>
                    </div>
                    {this.state.worktime.length!==0 && 
                    <>
                    <label>Консультации:</label>
                    {this.state.worktime.map((form, index)=>{
                        return(<div key={index} className="d-flex">
                            <WorktimeForm time={form.time} place={form.place} week={form.week}/>
                            <button className="btn btn-danger ml-2"
                            onClick={()=>this.removeWorktime(form.week)}
                            style={{height: "50%"}}><Icon icon={faTrashAlt} size="lg"/></button>
                        </div>)
                    })}
                    </>}
                    {this.state.worktime.length<7 && 
                    <div className="w-100">
                        <div className="form-row">
                            <div className="col form-group" style={{marginBottom: 0}}>
                                <label htmlFor="week-input">День недели</label>
                                <input onChange={this.changeInput} type="text" className="form-control" 
                                name="week" id="week-input" placeholder="Понедельник (нечетная неделя)" value={this.state.week}/>
                            </div>
                            <div className="col form-group" style={{marginBottom: 0}}>
                                <label htmlFor="time-input">Время консультации</label>
                                <input onChange={this.changeInput} type="text" className="form-control" 
                                name="time" id="time-input" placeholder="12:00 - 15:00" value={this.state.time}/>
                            </div>
                            <div className="col form-group" style={{marginBottom: 0}}>
                                <label htmlFor="place-input">Место консультации</label>
                                <input onChange={this.changeInput} type="text" className="form-control" 
                                name="place" id="place-input" placeholder="ауд. 406 ФЭТ" value={this.state.place}/>
                            </div>
                            <button className="btn btn-info align-self-end" type="button" onClick={this.addWorktime}>Добавить консультацию</button>
                        </div>
                    </div>}
                    <div className="w-100 mt-2 text-right">
                        <button className="btn btn-success mr-0" type="submit"
                        disabled={this.state.loading}>Добавить Сотрудника</button>
                    </div>                 
                </form>
                </div>
            </div>
        )
    }
} 

const mapStateToProps = state => ({
    info: state.info
})
  
export default connect(
    mapStateToProps,
    { postStaff, closeNavbar, clearInfo }
)(StaffForm)

function WorktimeForm({week, time, place}){
    return(
        <div className="form-row w-100">
            <div className="col form-group">
                <input disabled type="text" className="form-control" 
                name="week" id="week-input"  value={week}/>
            </div>
            <div className="col form-group">
                <input disabled type="text" className="form-control" 
                name="time" id="time-input" value={time}/>
            </div>
            <div className="col form-group">
                <input disabled type="text" className="form-control" 
                name="place" id="place-input" value={place}/>
            </div>
        </div>
    )
}