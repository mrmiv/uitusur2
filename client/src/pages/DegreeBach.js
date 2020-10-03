import React, { Component, Fragment } from 'react'
import store from '../store'
import { closeNavbar } from '../redux/actions/navbarActions'
import { GetDegreeList } from '../redux/actions/data_actions/HomeAction'
import { connect } from 'react-redux'
import { CardDegree } from './Home'
import './styles/Degree.scss'

import ParamsList from './components/ParamsList'

export class DegreeBach extends Component {

  state = {
    Degree: [],
    params_list: null
  }

  componentDidMount() {
    document.title = this.props.title
    this.props.GetDegreeList()
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

  render() {
    const { Degree } = this.state
    return (
      <Fragment>
        <section id="title_main" className="for_degree degree_bach">
          <div className="container-lg container-fluid bg_th" style={{ height: "inherit" }}>
            <div className="row no-gutters justify-content-around align-items-center" style={{ height: "inherit" }}>
              <div className="title_text text-center w-100" style={{ color: "white", fontWeight: 500 }}>
                <h1 className="title">Абитуриенту</h1>
                <p>Несколько простых шагов для поступления на ФИТ</p>
              </div>
              <div className="degree_cards row no-gutters">
                {Degree && Degree.map((item, index) => {
                  return (<div className="col-md-6 col-lg-4 col-sm-6"><CardDegree
                    num={item.num}
                    name={item.name}
                    type={item.type}
                    time={item.time}
                    profile={item.profile}
                    link={item.link}
                    bg={item.bg}
                    index={index}
                    key={index} /></div>)
                })}
              </div>
            </div>
          </div>
        </section>
        
        <ParamsList page="Абитуриенту"/>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  Degree: state.api.degree.DegreeList,
})

export default connect(
  mapStateToProps,
  { GetDegreeList }
)(DegreeBach)