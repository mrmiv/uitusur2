import React, { Component, Fragment } from 'react'
import store from '../store'
import { closeNavbar } from '../redux/actions/navbarActions'
import { GetDegreeList } from '../redux/actions/data_actions/HomeAction'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
import { CardDegree } from './Home'
import './styles/Degree.scss'

import files_and_folder from './img/files_and_folder.svg';
import steps_image from './img/calendar.svg';

export class DegreeBach extends Component {

  state = {
    param_podacha_docs: null,
    param_steps: null,
    Degree: []
  }

  componentDidMount() {
    document.title = this.props.title
    if (this.state.Degree.length === 0) {
      this.props.GetDegreeList()
    }
    const { params_list } = this.props
    const param_podacha_docs = params_list.find(item => {
      return item.page === "Абитуриенту" && item.title === "Правила приема и подачи документов"
    })

    const param_steps = params_list.find(item => {
      return item.page === "Поступающему Магистратура" && item.title === "Этапы зачисления"
    })

    const param_time = params_list.find(item => {
      return item.page === "Поступающему Магистратура" && item.title === "Сроки проведения вступительных испытаний"
    })


    if (params_list.length !== 0) {
      if (param_podacha_docs && !this.state.param_podacha_docs) {
        this.setState({ param_podacha_docs })
      }
      if (param_steps && !this.state.param_steps) {
        this.setState({ param_steps })
      }
      if (param_time && !this.state.param_time) {
        this.setState({ param_time })
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { Degree, params_list } = this.props

    if (Degree !== prevProps.Degree) {
      this.setState({ Degree: Degree.filter(item => item.type === "Магистратура") })
    }

    const param_podacha_docs = params_list.find(item => {
      return item.page === "Абитуриенту" && item.title === "Правила приема и подачи документов"
    })

    const param_steps = params_list.find(item => {
      return item.page === "Поступающему Магистратура" && item.title === "Этапы зачисления"
    })
    const param_time = params_list.find(item => {
      return item.page === "Поступающему Магистратура" && item.title === "Сроки проведения вступительных испытаний"
    })

    if (params_list.length !== 0) {
      if (param_podacha_docs && !this.state.param_podacha_docs) {
        this.setState({ param_podacha_docs })
      }
      if (param_steps && !this.state.param_steps) {
        this.setState({ param_steps })
      }
      if (param_time && !this.state.param_time) {
        this.setState({ param_time })
      }
    }
  }

  componentWillUnmount() {
    store.dispatch(closeNavbar())
  }

  render() {
    const { Degree, param_podacha_docs, param_steps, param_time } = this.state

    return (
      <Fragment>
        {/* ЗАГОЛОВОК */}
        <Fade>
          <section id="title_main" className="for_degree degree_mag">
            <div className="container-lg container-fluid bg_th" style={{ height: "inherit" }}>
              <div className="row no-gutters justify-content-around align-items-center" style={{ height: "inherit" }}>
                <div className="title_text text-center w-100" style={{ color: "#2a2a2a" }}>
                  <h1 className="title">Магистратура ФИТ</h1>
                  <p>Несколько простых шагов для поступления на магистратуру ФИТ</p>
                </div>
                <div className="degree_cards row no-gutters">
                  {Degree && Degree.map((item, index) => {
                    return (<div className="col-md-6 col-lg-4 col-sm-6"><Fade><CardDegree
                      num={item.num}
                      name={item.name}
                      type={item.type}
                      time={item.time}
                      profile={item.profile}
                      link={item.link}
                      bg={item.bg}
                      index={index}
                      key={index} /></Fade></div>)
                  })}
                </div>
              </div>
            </div>
          </section>
        </Fade>
        {param_podacha_docs && <Fade>
          <section id="rules_degree">
            <div className="container-lg container-fluid">
              <div className="row no-gutters align-items-center">
                <div className="col-md-6">
                  <div className="text-rules_degree" dangerouslySetInnerHTML={{ __html: param_podacha_docs.text }} />
                </div>
                <div className="col-md-6">
                  <img src={files_and_folder} className="rules_degree_image" alt="Правила приема и подачи документов" />
                </div>
              </div>
            </div>
          </section>
        </Fade>}
        {param_steps &&
          <Fade>
            <section id="steps__degree">
              <div className="container-lg container-fluid">
                <div className="text-steps" dangerouslySetInnerHTML={{ __html: param_steps.text }} />
                {/* <div className="col-lg-6 col-sm-12">
                    <div className="steps__image">
                      <img src={steps_image} alt="Этапы поступления" />
                    </div>
                  </div> */}
              </div>
            </section>
          </Fade >}
        {param_time &&
          <Fade>
            <section id="time_degree_mag">
              <div className="container-lg container-fluid">
                <div className="row no-gutters align-items-center">
                  <div className="col-md-6 col-sm-12">
                    <div className="text-time_degree" dangerouslySetInnerHTML={{ __html: param_time.text }} />
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <div className="image-time_degree">
                      <img src={steps_image} alt="Этапы поступления" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Fade >}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  Degree: state.api.degree.DegreeList,
  params_list: state.param.params_list
})

export default connect(
  mapStateToProps,
  { GetDegreeList }
)(DegreeBach)