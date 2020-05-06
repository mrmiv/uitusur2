import React, { Component, Fragment } from 'react'
import store from '../store'
import { closeNavbar } from '../redux/actions/navbarActions'
import { GetDegreeList } from '../redux/actions/data_actions/HomeAction'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faUniversity, faLightbulb, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { CardDegree } from './Home'
import './styles/Degree.scss'

import step1_img from './img/step_1.svg';
import step2_img from './img/step_2.svg';
import step3_img from './img/step_3.svg';

export class DegreeBach extends Component {

  state = {
    Degree: [],
    param_podacha_docs: null
  }

  componentDidMount() {
    document.title = this.props.title
    if (this.state.Degree.length === 0) {
      this.props.GetDegreeList()
    }

    if (this.props.params_list) {
      this.setState({
        param_podacha_docs: this.props.params_list.find(item => {
          return item.page === "Абитуриенту" && item.title === "Правила приема и подачи документов"
        })
      })
    }

  }

  componentDidUpdate(prevProps) {
    const { Degree } = this.props

    if (Degree !== prevProps.Degree) {
      this.setState({ Degree: Degree.filter(item => item.type === "Бакалавриат") })
    }

  }

  componentWillUnmount() {
    store.dispatch(closeNavbar())
  }

  scrollTo = (id) => {
    let el = document.getElementById(id)
    let offsetTop = el.offsetTop
    window.scrollTo({
      top: offsetTop - 100,
      behavior: 'smooth'
    })
  }

  render() {
    const { Degree, param_podacha_docs } = this.state
    return (
      <Fragment>
        {/* ЗАГОЛОВОК */}
        <Fade>
          <section id="title_main" className="for_degree degree_bach">
            <div className="container-lg container-fluid bg_th" style={{ height: "inherit" }}>
              <div className="row no-gutters justify-content-around align-items-center" style={{ height: "inherit" }}>
                <div className="title_text text-center w-100" style={{ color: "#2a2a2a" }}>
                  <h1 className="title">Абитуриенту</h1>
                  <p>Несколько простых шагов для поступления на ФИТ</p>
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
            <div className="container-md container-fluid">
              <div className="row no-gutters">
                <div className="col-md-6">
                  <div className="text-rules_degree" dangerouslySetInnerHTML={{ __html: param_podacha_docs.text }} />
                </div>
                <div className="col-md-6">image here</div>
              </div>
            </div>
          </section>
        </Fade>}
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