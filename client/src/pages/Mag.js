import React, { Component, Fragment } from 'react'
import store from '../store'
import { Link } from 'react-router-dom'
import { closeNavbar } from '../redux/actions/navbarActions'
import Fade from 'react-reveal/Fade'

import './styles/Student_BM.scss'

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faUniversity, faGraduationCap, faMicroscope } from '@fortawesome/free-solid-svg-icons'

import lawyer_img from './img/lawyer.svg';
import practic_img from './img/team_meeting.svg';
import step1_img from './img/step_1.svg';
import step2_img from './img/step_2.svg';
import step3_img from './img/step_3.svg';
import report_analysis_img from './img/report_analysis.svg';
import { connect } from 'react-redux'

export class StudentMag extends Component {

    state = {
        param_nir: null,
        param_practic: null
    }

    componentDidMount() {
        document.title = this.props.title
        const { params_list } = this.props

        if (params_list.length !== 0) {
            const param_practic = params_list.find(item => {
                return item.page === "Бакалавриат" && item.title === "Практика"
            })

            const param_nir = params_list.find(item => {
                return item.page === "Магистратура" && item.title === "НИР"
            })
            if (param_practic && !this.state.param_practic) {
                this.setState({ param_practic })
            }
            if (param_nir && !this.state.param_nir) {
                this.setState({ param_nir })
            }
        }
    }

    componentDidUpdate() {
        const { params_list } = this.props

        const param_practic = params_list.find(item => {
            return item.page === "Бакалавриат" && item.title === "Практика"
        })

        const param_nir = params_list.find(item => {
            return item.page === "Бакалавриат" && item.title === "НИР"
        })
        if (params_list.length !== 0) {
            if (param_practic && !this.state.param_practic) {
                this.setState({ param_practic })
            }
            if (param_nir && !this.state.param_nir) {
                this.setState({ param_nir })
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
        const { param_practic, param_nir } = this.state
        return (
            <Fragment>
                {/* ЗАГОЛОВОК */}
                <Fade>
                    <section id="title_main" className="for_student student_mag">
                        <div className="container-lg container-fluid bg_th" style={{ height: "inherit" }}>
                            <div className="row no-gutters justify-content-around align-items-center" style={{ height: "inherit" }}>
                                <div className="col-md-4">
                                    <div className="title_text">
                                        <h1 className="title">Магистранту</h1>
                                        <p>Всё, что нужно знать студенту магистратуры - это: </p>
                                    </div>
                                    <div className="types_for_student">
                                        <button type="button" className="btn" name="Практика" onClick={() => this.scrollTo('practic')}>
                                            <div className="btn-scroll-student"><Icon icon={faUniversity} /></div> <span>Практика</span>
                                        </button>
                                        <button type="button" className="btn" name="НИР" onClick={() => this.scrollTo('nir')}>
                                            <div className="btn-scroll-student"><Icon icon={faMicroscope} /></div> <span>НИР</span>
                                        </button>
                                        <button type="button" className="btn" name="ВКР" onClick={() => this.scrollTo('vkr')}>
                                            <div className="btn-scroll-student"><Icon icon={faGraduationCap} /></div> <span>ВКР</span>
                                        </button>
                                        {/* <img className="triple_helix_svg" src={lawyer_img}  alt="Бакалавру"/> */}
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="triple_helix img_block">
                                        <img className="triple_helix_svg" src={lawyer_img} alt="Магистранту" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Fade>
                {/* Практика */}
                {param_practic && <Fade>
                    <section id="practic">
                        <div className="container-lg container-md container-fluid">
                            <div className="row no-gutters justify-content-between align-items-center">
                                <div className="col-md-5 title_student practic_title" dangerouslySetInnerHTML={{ __html: param_practic.text }} />
                                {/* <h2>Практика</h2>
                                    <p>sometext here</p>
                                    <Link className="link-for-student">Перечень предприятий для прохождения практики</Link>
                                    <Link className="link-for-student">Правила оформления</Link>
                                </div> */}
                                <div className="col-md-5">
                                    <div className="practic_img img_block text-right">
                                        <img src={practic_img} alt="Практика" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Fade>}
                {/* Научная исследовательская работа */}
                {param_nir && <Fade>
                    <section id="nir">
                        <div className="container-md container-fluid">
                            <div className="row no-gutters justify-content-between align-items-center">
                                <div className="col-md-5 order-md-first order-last">
                                    <div className="nir_img img_block text-left">
                                        <img src={report_analysis_img} alt="Научная исследовательская работа" />
                                    </div>
                                </div>
                                <div className="col-md-6 title_student nir_title text-right" dangerouslySetInnerHTML={{ __html: param_nir.text }} />
                                {/* <h2>Научная исследовательская работа</h2>
                                    <p>sometext here</p>
                                    <Link className="link-for-student">Ссылка 1</Link>
                                    <Link className="link-for-student">Ссылка 2</Link>
                                    <Link className="link-for-student">Ссылка 3</Link>
                                </div> */}
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
)(StudentMag)