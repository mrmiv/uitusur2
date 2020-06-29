import React, { Component, Fragment } from 'react'
import store from '../store'
import { closeNavbar } from '../redux/actions/navbarActions'
import Fade from 'react-reveal/Fade'

import './styles/Student_BM.scss'

import lawyer_img from './img/lawyer.svg';
// import practic_img from './img/team_meeting.svg';
// import gpo_img from './img/gpo_bach.svg';
// import relax_img from './img/focused_working.svg';

// import { connect } from 'react-redux'
import ParamsList from './components/ParamsList'

export default class StudentBach extends Component {

    componentDidMount() {
        document.title = this.props.title
    }

    componentWillUnmount() {
        store.dispatch(closeNavbar())
    }

    render() {
        return (
            <Fragment>
                <Fade>
                    <section id="title_main" className="for_student student_bach">
                        <div className="container-lg container-fluid bg_th" style={{ height: "inherit" }}>
                            <div className="row no-gutters justify-content-around align-items-center" style={{ height: "inherit" }}>
                                <div className="col-md-4">
                                    <div className="title_text">
                                        <h1 className="title">Бакалавру</h1>
                                        <p>На данной странице собрана необходимая информация и ссылки для студентов бакалавриата ФИТ по таким темам, 
                                            как <u>практика</u>, <u>групповое проектное обучение</u> и <u>выпускная квалификационная работа</u>.
                                        </p>
                                    </div>
                                    <svg onClick={()=>{
                                            window.scrollTo({
                                                top: window.innerHeight - 80,
                                                behavior: "smooth"
                                            })
                                        }} style={{marginTop: "16px"}} xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="42" height="42" viewBox="0 0 56 56">
                                            <defs><filter id="a" x="0" y="0" width="56" height="56" filterUnits="userSpaceOnUse"><feOffset dy="3" input="SourceAlpha"/>
                                            <feGaussianBlur stdDeviation="3" result="b"/>
                                            <feFlood flood-opacity="0.161"/>
                                            <feComposite operator="in" in2="b"/>
                                            <feComposite in="SourceGraphic"/>
                                            </filter></defs>
                                            <g transform="translate(-655 -672)"><g transform="matrix(1, 0, 0, 1, 655, 672)" filter="url(#a)">
                                            <circle cx="19" cy="19" r="19" transform="translate(9 6)" fill="#fff"/></g>
                                            <g transform="translate(678.741 688.81)">
                                                <line y2="16.379" transform="translate(4.259)" fill="none" stroke="#354ED1" stroke-linecap="round" stroke-width="2"/>
                                                <line x1="4.259" y2="4.68" transform="translate(4.259 11.7)" fill="none" stroke="#354ED1" stroke-linecap="round" stroke-width="2"/>
                                                <line x2="4.259" y2="4.68" transform="translate(0 11.7)" fill="none" stroke="#354ED1" stroke-linecap="round" stroke-width="2"/>
                                                </g>
                                            </g>
                                        </svg>
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
                <ParamsList page="Бакалавриат"/>
            </Fragment>
        )
    }
}

// const mapStateToProps = state => ({
//     params_list: state.param.params_list
// })

// export default connect(
//     mapStateToProps,
//     {}
// )(StudentBach)