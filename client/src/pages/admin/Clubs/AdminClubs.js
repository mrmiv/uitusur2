import React, {Component} from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { clearInfo } from '../../../redux/actions/infoActions'
import { getClubs, delClub } from '../../../redux/actions/data_actions/clubsAction'
import { connect } from 'react-redux'
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export class AdminClubs extends Component{

    state={
        msg: null
    }

    componentWillUnmount(){
        this.props.closeNavbar()
    }

    componentDidMount(){
        this.props.clearInfo()
        document.title = this.props.title
        this.props.getClubs()
    }

    componentDidUpdate(prevProps){
        const {msg} = this.props.info
        if(msg!==prevProps.info.msg){
            this.setState({msg})
        }
    }

    delClub=(id)=>{
        window.scrollTo(0,0)
        this.props.clearInfo()
        this.props.delClub(id)
    }

    render(){
        const {Clubs} = this.props
        const {msg} = this.state
        return(
            <div className="container-md container-fluid">
                {msg ? 
                <div className={`alert 
                ${this.props.info.id === "REQ_FAIL"? 'alert-danger': null}
                ${this.props.info.id === "REQ_SUCCESS" ? 'alert-success': null} alert-dismissible fade show`} role="alert">
                    {this.props.info.id === "REQ_FAIL" && <strong>Ошибка! </strong> }
                    {this.props.info.id === "REQ_SUCCESS" && <strong>Успех! </strong>}
                    {msg.message}
                <button type="button" className="close" data-dismiss="alert" onClick={()=>this.props.clearInfo()} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div> : null}
                <div className="row no-gutters justify-content-between">
                <h2>Внеучебная деятельность</h2>
                <Link to="/admin/clubs/add">Добавить клуб<Icon icon={faPlusCircle}/></Link>
                <div className="w-100"/>
                <table class="table table-hover">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Название</th>
                            <th scope="col">Руководитель</th>
                            <th scope="col" style={{width:"50px", textAlign: "center"}}><Icon icon={faTrashAlt}/></th>
                            {/* style={{width="50px"}} */}
                        </tr>
                    </thead>
                    <tbody>
                        {Clubs ?
                            Clubs.map((item, index)=>{
                            return(
                                <tr key={index}>
                                    <th scope="row">{index+1}</th>
                                    <td name="title"><Link to={`/admin/clubs/edit/${item._id}`}>{item.name}</Link></td>
                                    <td name="author">{item.leader}</td>
                                    <td name="del">
                                        <button type="button" className="btn" onClick={()=>this.delClub(item._id)}><Icon icon={faTrashAlt}/></button>
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
    Clubs: state.api.clubs.ClubsList,
    info: state.info
})
  
export default connect(
    mapStateToProps,
    { closeNavbar, clearInfo, getClubs, delClub}
)(AdminClubs)