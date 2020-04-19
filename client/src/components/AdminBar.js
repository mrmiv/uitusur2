import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {logout} from '../redux/actions/authActions'
import './styles/AdminBar.scss'
import { connect } from 'react-redux';

export class AdminBar extends Component{

    Logout = () => {
        this.props.logout()
    }

    render(){
        return(
            <div id="AdminPanel">
                <button className="btn btn-danger" onClick={this.Logout}>Выйти</button>
                <div className="admin__menu">
{/* Статистика */}
                    <div className="d-flex admin__menu__item">
                        <NavLink to="/admin" exact>Главная</NavLink>
                    </div>
{/* Конференции */}
                    <div className="d-flex admin__menu__item">
                        <NavLink to="/admin/conferences">Конференции</NavLink>
                        <span><NavLink to="/admin/conferences/add">+</NavLink></span>
                    </div>
{/* Объявления */}
                    <div className="d-flex admin__menu__item">
                        <NavLink to="/admin/announcement">Объявления кафедры</NavLink>
                        <span><NavLink to="/admin/announcement/add">+</NavLink></span>
                    </div>
{/* Гранты */}
                    <div className="d-flex admin__menu__item">
                        <NavLink to="/admin/grants">Стипендии и гранты</NavLink>
                        <span><NavLink to="/admin/grants/add">+</NavLink></span>
                    </div>
{/* Сотрудники */}
                    <div className="d-flex admin__menu__item">
                        <NavLink to="/admin/staff">Сотрудники</NavLink>
                        <span><NavLink to="/admin/staff/add">+</NavLink></span>
                    </div>
{/* Литература */}
                    <div className="d-flex admin__menu__item">
                        <NavLink to="/admin/literature">Литература кафедры</NavLink>
                        <span><NavLink to="/admin/literature/add">+</NavLink></span>
                    </div>
{/* Идеи */}
                    <div className="d-flex admin__menu__item">
                        <NavLink to="/admin/idea">Идеи</NavLink>
                        <span><NavLink to="/admin/idea/add">+</NavLink></span>
                    </div>
{/* Документы */}
                    <div className="d-flex admin__menu__item">
                        <NavLink to="/admin/docs">Регламентирующие документы</NavLink>
                        <span><NavLink to="/admin/docs/add">+</NavLink></span>
                    </div>
{/* Рассылка */}
                    <hr style={{borderColor:"white"}}/>
                    <div className="d-flex admin__menu__item">
                        <NavLink to="/admin/email">Рассылка</NavLink>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default connect(
  null,
  {logout}
)(AdminBar)