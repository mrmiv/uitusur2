import React, { Component, Fragment } from 'react'
import store from '../store'
import { closeNavbar } from '../redux/actions/navbarActions'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faUniversity, faLightbulb, faGraduationCap } from '@fortawesome/free-solid-svg-icons'

import './styles/Student_BM.scss'

import lawyer_img from './img/lawyer.svg';
import practic_img from './img/team_meeting.svg';
import gpo_img from './img/gpo_bach.svg';
import step1_img from './img/step_1.svg';
import step2_img from './img/step_2.svg';
import step3_img from './img/step_3.svg';
import { connect } from 'react-redux'

export class StudentBach extends Component {

    state = {
        param_practic: null,
        param_gpo: null,
        param_vkr: null
    }

    componentDidMount() {
        document.title = this.props.title

        const { params_list } = this.props

        if (params_list.length !== 0) {
            const param_practic = params_list.find(item => {
                return item.page === "Бакалавриат" && item.title === "Практика"
            })

            const param_gpo = params_list.find(item => {
                return item.page === "Бакалавриат" && item.title === "ГПО"
            })

            if (param_practic && !this.state.param_practic) {
                this.setState({ param_practic })
            }
            if (param_gpo && !this.state.param_gpo) {
                this.setState({ param_gpo })
            }
        }
    }

    componentDidUpdate(prevProps) {
        const { params_list } = this.props

        if (params_list.length !== 0) {
            const param_practic = params_list.find(item => {
                return item.page === "Бакалавриат" && item.title === "Практика"
            })

            const param_gpo = params_list.find(item => {
                return item.page === "Бакалавриат" && item.title === "ГПО"
            })
            if (param_practic && !this.state.param_practic) {
                this.setState({ param_practic })
            }
            if (param_gpo && !this.state.param_gpo) {
                this.setState({ param_gpo })
            }
        }
    }

    componentWillUnmount() {
        store.dispatch(closeNavbar())
    }

    scrollTo = (id) => {
        let el = document.getElementById(id)
        if (el) {
            let offsetTop = el.offsetTop
            window.scrollTo({
                top: offsetTop - 100,
                behavior: 'smooth'
            })
        }
    }

    render() {

        let { param_gpo, param_vkr } = this.state

        return (
            <Fragment>
                <Fade>
                    <section id="title_main" className="for_student student_bach">
                        <div className="container-lg container-fluid bg_th" style={{ height: "inherit" }}>
                            <div className="row no-gutters justify-content-around align-items-center" style={{ height: "inherit" }}>
                                <div className="col-md-4">
                                    <div className="title_text">
                                        <h1 className="title">Бакалавру</h1>
                                        <p>Всё, что нужно знать студенту бакалавриата - это: </p>
                                    </div>
                                    <div className="types_for_student">
                                        <button type="button" className="btn" name="Практика" onClick={() => this.scrollTo('practic')}>
                                            <div className="btn-scroll-student"><Icon icon={faUniversity} /></div> <span>Практика</span>
                                        </button>
                                        <button type="button" className="btn" name="ГПО" onClick={() => this.scrollTo('gpo_bach')}>
                                            <div className="btn-scroll-student"><Icon icon={faLightbulb} /></div> <span>ГПО</span>
                                        </button>
                                        <button type="button" className="btn" name="ВКР" onClick={() => this.scrollTo('vkr')}>
                                            <div className="btn-scroll-student"><Icon icon={faGraduationCap} /></div> <span>ВКР</span>
                                        </button>
                                        {/* <img className="triple_helix_svg" src={lawyer_img}  alt="Бакалавру"/> */}
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="triple_helix img_block">
                                        <img className="triple_helix_svg" src={lawyer_img} alt="Бакалавру" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Fade>
                {/* Практика */}
                {this.state.param_practic && <Fade>
                    <section id="practic">
                        <div className="container-lg container-md container-fluid">
                            <div className="row no-gutters justify-content-between align-items-center">
                                <div className="col-md-5 title_student practic_title"
                                    dangerouslySetInnerHTML={{ __html: this.state.param_practic.text }} />
                                <div className="col-md-5">
                                    <div className="practic_img img_block text-center">
                                        <img src={practic_img} alt="Практика" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Fade>
                }
                {/* ГПО */}
                {param_gpo && <Fade>
                    <section id="gpo_bach">
                        <div className="container-md container-fluid">
                            <div className="row no-gutters justify-content-between align-items-center">
                                <div className="col-md-6 order-md-first order-last">
                                    <div className="gpo_bach_img img_block text-center">
                                        <img src={gpo_img} alt="Групповое проектное обучение" />
                                    </div>
                                </div>
                                <div className="col-md-5 title_student gpo_bach_title text-right"
                                    dangerouslySetInnerHTML={{ __html: param_gpo.text }} />
                            </div>
                        </div>
                    </section>
                </Fade>}
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
                                            <img src={step1_img} alt="Шаг первый" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 vkr-step step-2">
                                    <div className="row no-gutters">
                                        <div className="info-step col-6 col-md-12 align-self-start">
                                            <p>Выбери тему</p>
                                        </div>
                                        <div className="vkr-step_img col-6 col-md-12 order-first order-md-last">
                                            <img src={step2_img} alt="Шаг второй" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 vkr-step step-3">
                                    <div className="row no-gutters">
                                        <div className="info-step col-6 col-md-12 align-self-start">
                                            <p>Выбери тему</p>
                                        </div>
                                        <div className="vkr-step_img col-6 col-md-12 order-first order-md-last">
                                            <img src={step3_img} alt="Шаг третий" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Fade>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    params_list: state.param.params_list
})

export default connect(
    mapStateToProps,
    {}
)(StudentBach)