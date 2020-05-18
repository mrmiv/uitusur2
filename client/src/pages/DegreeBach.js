import React, { Component, Fragment } from 'react'
import store from '../store'
import { closeNavbar } from '../redux/actions/navbarActions'
import { GetDegreeList } from '../redux/actions/data_actions/HomeAction'
import Fade from 'react-reveal/Fade'
import { connect } from 'react-redux'
import { CardDegree } from './Home'
import './styles/Degree.scss'

import files_and_folder from './img/files_and_folder.svg';
import question_img from './img/question.svg';

export class DegreeBach extends Component {

  state = {
    Degree: [],
    param_podacha_docs: null,
    param_testing_degree: null
  }

  componentDidMount() {
    document.title = this.props.title
    const { params_list } = this.props

    if (this.state.Degree.length === 0) {
      this.props.GetDegreeList()
    }
    const param_podacha_docs = params_list.find(item => {
      return item.page === "Абитуриенту" && item.title === "Правила приема и подачи документов"
    })
    const param_testing_degree = params_list.find(item => {
      return item.page === "Абитуриенту" && item.title === "Вступительные испытания"
    })

    if (params_list.length !== 0) {
      if (param_podacha_docs && !this.state.param_podacha_docs) {
        this.setState({ param_podacha_docs })
      }
      if (param_testing_degree && !this.state.param_testing_degree) {
        this.setState({ param_testing_degree })
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { Degree, params_list } = this.props

    if (Degree !== prevProps.Degree) {
      this.setState({ Degree: Degree.filter(item => item.type === "Бакалавриат") })
    }

    const param_podacha_docs = params_list.find(item => {
      return item.page === "Абитуриенту" && item.title === "Правила приема и подачи документов"
    })
    const param_testing_degree = params_list.find(item => {
      return item.page === "Абитуриенту" && item.title === "Вступительные испытания"
    })

    if (params_list.length !== 0) {
      if (param_podacha_docs && !this.state.param_podacha_docs) {
        this.setState({ param_podacha_docs })
      }
      if (param_testing_degree && !this.state.param_testing_degree) {
        this.setState({ param_testing_degree })
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
    const { Degree, param_podacha_docs, param_testing_degree } = this.state
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
            <div className="container">
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
        {param_testing_degree &&
          <Fade>
            <section id="testing_degree">
              <div className="container">
                <div className="row no-gutters align-items-center">
                  <div className="col-md-6">
                    <div className="text-testing_degree" dangerouslySetInnerHTML={{ __html: param_testing_degree.text }} />
                  </div>
                  <div className="col-md-6">
                    <div className="image-testing_degree">
                      <img src={question_img} alt="Вступительные испытания" />
                    </div>
                  </div>
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