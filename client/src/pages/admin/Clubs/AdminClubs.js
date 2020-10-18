import React, {Component} from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { clearInfo } from '../../../redux/actions/infoActions'
import { getClubs, delClub } from '../../../redux/actions/data_actions/clubsAction'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Icon } from '@iconify/react';
import plusCircle from '@iconify/icons-fa-solid/plus-circle';
import bxsEdit from '@iconify/icons-bx/bxs-edit';
import trashAlt from '@iconify/icons-fa-solid/trash-alt';
import { MessageAlert } from '../components/MessageAlert'

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
        const areYouSure = window.confirm('Вы действительно хотите удалить этот элемент?')
        if(areYouSure){
            window.scrollTo(0, 0)
            this.props.clearInfo()
            this.props.delClub(id)
        } else {
            console.log('Элемент не удален')
        }
    }

    render(){
        const {Clubs} = this.props
        const {msg} = this.state
        return(
            <div className="container-md container-fluid">
                
                <MessageAlert msg={msg} id={this.props.info.id}/>

                <div className="d-flex align-items-center justify-content-between">
                    <h1>Внеучебная деятельность</h1>
                    <Link className="add_admin_button" to="/admin/clubs/add">Добавить клуб <Icon icon={plusCircle} /></Link>
                </div>
                <table class="table table-sm table-bordered table-hover">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Название</th>
                            <th scope="col">Ссылка</th>
                            <th scope="col" style={{width:"50px", textAlign: "center"}}><Icon icon={bxsEdit}/></th>
                            <th scope="col" style={{width:"50px", textAlign: "center"}}><Icon icon={trashAlt}/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Clubs ?
                            Clubs.map((item, index)=>{
                            return(
                                <tr key={index}>
                                    <th scope="row">{index+1}</th>
                                    <td name="title">{item.name}</td>
                                    <td name="path"><a href={item.path} target="_blank" ref="noopener norefferer">Ссылка</a></td>
                                    <td name="edit">
                                        <Link to={`/admin/clubs/edit/${item._id}`} className="btn text-center"><Icon icon={bxsEdit} color="green"/></Link>
                                    </td>
                                    <td name="del">
                                        <button className="btn text-center"  onClick={()=>this.delClub(item._id)}><Icon icon={trashAlt} color="red"/></button>
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
    Clubs: state.api.clubs.ClubsList,
    info: state.info
})
  
export default connect(
    mapStateToProps,
    { closeNavbar, clearInfo, getClubs, delClub}
)(AdminClubs)