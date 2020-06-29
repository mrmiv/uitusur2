import React, { Component, Fragment } from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { connect } from 'react-redux'
import { postCurator, patchCurator, GetCurator } from '../../../redux/actions/data_actions/curatorActions'
import { GetStaffList } from '../../../redux/actions/staffActions'
import { clearInfo } from '../../../redux/actions/infoActions'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { Link, Prompt, withRouter } from 'react-router-dom'

export class FormCurator extends Component {

  state = {
    id: null,

    firstname: "",
    lastname: "",
    secondname: "",
    group: "",
    staff_id: "",

    blocked: false,
    msg: null
  }

  componentWillUnmount() {
    this.props.closeNavbar()
  }

  componentDidMount() {
    document.title = this.props.title
    this.props.GetStaffList()
    const id = this.props.match.params.id
    if (id) {
      this.props.GetCurator(id)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const id = this.props.match.params.id
    const { msg } = this.props.info

    if (id) {
      if (id !== prevState.id) {
        this.setState({ id })
      }
      const { curator } = this.props

      if (curator !== prevProps.curator) {

        this.setState({
          firstname: curator.firstname,
          lastname: curator.lastname,
          secondname: curator.secondname,
          group: curator.group,
          staff_id: curator.staff_id,
        });
      }
    }
    if (msg !== prevProps.info.msg) {
      this.setState({ msg })
    }
  }

  changeInput = e => {
    const field = e.target.name

    this.setState({ [field]: e.target.value })
    if (!this.state.blocked) {
      this.setState({ blocked: true })
    }
  }

  setCurator = e => {
    const field = e.target;
    // this.setState({ [field]: e.target.value })
    const array = field.value.split(",")
    const staff_id = array[0]
    const lastname = array[1]
    const firstname = array[2]
    let secondname = ""
    if (array[3]) {
      secondname = array[3]
    }

    this.setState({ staff_id, firstname, lastname, secondname })
  }

  submitForm = e => {
    e.preventDefault()
    window.scrollTo(0, 0)
    this.props.clearInfo()
    const id = this.state.id

    const {
      lastname,
      secondname,
      staff_id,
      firstname,
      group } = this.state

    const Curator = {
      lastname,
      secondname,
      staff_id,
      firstname,
      group
    }

    if (id) {
      this.props.patchCurator(id, Curator)
    } else {
      this.props.postCurator(Curator)
    }

    if (this.props.info.id === "REQ_SUCCESS") {
      this.setState({ blocked: false })
      document.getElementById("curator_form").reset()
    }
  }

  render() {
    const { msg } = this.state
    const { isLoading, stafflist } = this.props
    return (
      <div className="container-md container-fluid">
        <Prompt
          when={this.state.blocked}
          message={() =>
            `Вы действительно хотите покинуть эту страницу?`
          }
        />
        {msg ?
          <div className={`alert 
                ${this.props.info.id === "REQ_FAIL" ? 'alert-danger' : null}
                ${this.props.info.id === "REQ_SUCCESS" ? 'alert-success' : null} alert-dismissible fade show`} role="alert">
            {this.props.info.id === "REQ_FAIL" && <strong>Ошибка! </strong>}
            {this.props.info.id === "REQ_SUCCESS" && <strong>Успех! </strong>}
            {msg.message}.
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div> : null}
        <div className="row no-gutters justify-content-between">
          <Link to="/admin/curator"><Icon icon={faArrowAltCircleLeft} size="lg" /> Назад</Link>
          <form id="curator_form" className="w-100 mt-3" onSubmit={this.submitForm}>
            <div className="form-row">
              <div className="col form-group">
                <label htmlFor="select-staff">Сотрудник</label>
                {stafflist && <Fragment>
                  <select className="form-control" type="text" name="staff" id="select-staff"
                    onChange={this.setCurator} value={[this.state.staff_id, this.state.lastname, this.state.firstname, this.state.secondname]}>
                    <option defaultValue>Выберите сотрудника</option>
                    {stafflist.map((staff, index) => {
                      return <option key={index}
                        value={[staff._id, staff.lastname, staff.firstname, staff.secondname]} >
                        {staff.lastname + " " + staff.firstname + " " + staff.secondname}
                      </option>
                    })}}
              </select>
                </Fragment>}
              </div>
              <div className="col form-group">
                <label htmlFor="group-input">Группа</label>
                <input id="group-input" value={this.state.group} onChange={this.changeInput}
                  className="form-control" name="group" placeholder="057" type="text" />
              </div>
            </div>
            <div className="w-100 mt-2 text-right">
              <button className="btn btn-success mr-0" type="submit"
                disabled={isLoading}>{this.state.id ? "Обновить куратора" : "Добавить куратора"}</button>
            </div>
          </form>
        </div>
      </div >
    )
  }
}

const mapStateToProps = state => ({
  curator: state.api.curators.Curator,
  stafflist: state.api.staff.StaffList.StaffList,
  isLoading: state.api.curators.isLoading,
  info: state.info
})

export default withRouter(connect(
  mapStateToProps,
  {
    postCurator,
    closeNavbar,
    clearInfo,
    patchCurator,
    GetCurator,
    GetStaffList
  }
)(FormCurator))