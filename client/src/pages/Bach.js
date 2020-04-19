import React, {Component} from 'react'
import store from '../store'
import { closeNavbar } from '../redux/actions/navbarActions'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import { faUniversity, faLightbulb, faGraduationCap } from '@fortawesome/free-solid-svg-icons'

import './styles/Student_BM.scss'

import lawyer_img from './img/lawyer.svg';
import practic_img from './img/team_meeting.svg';
import gpo_img from './img/gpo_bach.svg';
import step1_img from './img/step_1.svg';
import step2_img from './img/step_2.svg';
import step3_img from './img/step_3.svg';

export default class StudentBach extends Component{

    componentDidMount() {
        document.title = this.props.title
    }

    componentWillUnmount(){
        store.dispatch(closeNavbar())
    }

    scrollTo = (id) => {
        let el = document.getElementById(id)
        let offsetTop = el.offsetTop
        window.scrollTo({
            top: offsetTop-100,
            behavior: 'smooth'
        })
    }

    render(){
        return( 
            <>
{/* ЗАГОЛОВОК */}
<Fade>
<section id="title_main" className="for_student student_bach">
    <div className="container-lg container-fluid bg_th" style={{height:"inherit"}}>
    <div className="row no-gutters justify-content-around align-items-center" style={{height:"inherit"}}>
        <div className="col-md-4">
        <div className="title_text">
            <h1 className="title">Бакалавру</h1>
            <p>Всё, что нужно знать студенту бакалавриата - это: </p>
        </div>
        <div className="types_for_student">
            <button type="button" className="btn" name="Практика" onClick={()=>this.scrollTo('practic')}>
                <div className="btn-scroll-student"><Icon icon={faUniversity}/></div> <span>Практика</span>
            </button>
            <button type="button" className="btn" name="ГПО" onClick={()=>this.scrollTo('gpo_bach')}>
                <div className="btn-scroll-student"><Icon icon={faLightbulb}/></div> <span>ГПО</span>
            </button>
            <button type="button" className="btn" name="ВКР" onClick={()=>this.scrollTo('vkr')}>
                <div className="btn-scroll-student"><Icon icon={faGraduationCap}/></div> <span>ВКР</span>
            </button>
            {/* <img className="triple_helix_svg" src={lawyer_img}  alt="Бакалавру"/> */}
        </div>
        </div>
        <div className="col-md-4">
            <div className="triple_helix img_block">
                <img className="triple_helix_svg" src={lawyer_img}  alt="Бакалавру"/>
            </div>
        </div>
    </div>
    </div>
</section>
</Fade>
{/* Практика */}
<Fade>
<section id="practic">
    <div className="container-lg container-md container-fluid">
        <div className="row no-gutters justify-content-between align-items-center">
            <div className="col-md-5 title_student practic_title">
                <h2>Практика</h2>
                <p>sometext here</p>
                <Link className="link-for-student">Перечень предприятий для прохождения практики</Link>
                <Link className="link-for-student">Правила оформления</Link>
            </div>
            <div className="col-md-5">
                <div className="practic_img img_block text-right">
                    <img src={practic_img} alt="Практика"/>
                </div>
            </div>
        </div>
    </div>
</section>
</Fade>
{/* ГПО */}
<Fade>
<section id="gpo_bach">
    <div className="container-md container-fluid">
        <div className="row no-gutters justify-content-between align-items-center">
            <div className="col-md-6 order-md-first order-last">
                <div className="gpo_bach_img img_block text-left">
                    <img src={gpo_img} alt="Групповое проектное обучение"/>
                </div>
            </div>
            <div className="col-md-5 title_student gpo_bach_title text-right">
                <h2>Групповое проектное обучение</h2>
                <p>Проект, над которым работает команда из 3–5 человек, должен стать реализацией новой идеи и воплотиться в виде устройства, технологии или услуги.</p>
                <Link className="link-for-student">Проекты кафедры</Link>
                <Link className="link-for-student">Архив проектов</Link>
                <Link className="link-for-student">Правила оформления</Link>
            </div>
        </div>
    </div>
</section>
</Fade>
{/* ВКР */}
<Fade>
<section id="vkr" className="vkr_bach">
    <div className="container-md container-fluid">
        <h2 className="text-center">Выпускная квалификационная работа</h2>
        <div className="row no-gutters justify-content-between align-items-end">
            <div className="col-md-4 vkr-step step-1">
                <div className="row no-gutters">
                    <div className="info-step col-6 col-md-12 align-self-start">
                        <p>Выбери тему</p>
                    </div>
                    <div className="vkr-step_img col-6 col-md-12 order-first order-md-last">
                        <img src={step1_img} alt="Шаг первый"/>
                    </div>
                </div>
            </div>
            <div className="col-md-4 vkr-step step-2">
                <div className="row no-gutters">
                    <div className="info-step col-6 col-md-12 align-self-start">
                        <p>Выбери тему</p>
                    </div>
                    <div className="vkr-step_img col-6 col-md-12 order-first order-md-last">
                        <img src={step2_img} alt="Шаг второй"/>
                    </div>
                </div>
            </div>
            <div className="col-md-4 vkr-step step-3">
            <div className="row no-gutters">
                    <div className="info-step col-6 col-md-12 align-self-start">
                        <p>Выбери тему</p>
                    </div>
                    <div className="vkr-step_img col-6 col-md-12 order-first order-md-last">
                        <img src={step3_img} alt="Шаг третий"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</Fade>
            </>
        )
    }
}
