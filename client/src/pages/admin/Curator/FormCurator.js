import React, { Component, Fragment } from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { connect } from 'react-redux'
import { postCurator, patchCurator, GetCurator } from '../../../redux/actions/data_actions/curatorActions'
import { GetStaffList } from '../../../redux/actions/staffActions'
import { clearInfo } from '../../../redux/actions/infoActions'
import { Link, Prompt, withRouter } from 'react-router-dom'
import { MessageAlert } from '../components/MessageAlert'

export class FormCurator extends Component {

  state = {
    id: null,

    firstname: "",
    lastname: "",
    secondname: "",
    staff_url: "",
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
    const { curator } = this.props
    
    if (id && (id !== prevState.id)) {
      this.setState({ id })
    }

    if (id && (curator !== prevProps.curator)) {
      this.setState({
        firstname: curator.firstname,
        lastname: curator.lastname,
        secondname: curator.secondname,
        staff_url: curator.staff_url,
        group: curator.group,
        staff_id: curator.staff_id,
      })
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

    const array = field.value.split(",")
    const staff_id = array[0]
    const staff_url = array[1]
    const lastname = array[2]
    const firstname = array[3]
    const secondname = array[4] ? array[4] : null
    this.setState({ staff_id, staff_url, firstname, lastname, secondname })
  }

  submitForm = e => {
    e.preventDefault()
    window.scrollTo(0, 0)
    this.props.clearInfo()
    const id = this.state.id

    const {
      lastname,
      secondname,
      firstname,
      staff_url,
      staff_id,
      group } = this.state

    const Curator = {
      lastname,
      secondname: secondname ? secondname : null,
      firstname,
      staff_url,
      staff_id,
      group
    }

    if (id) {
      this.props.patchCurator(id, Curator)
    } else {
      this.props.postCurator(Curator)
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
        
        <MessageAlert msg={msg} id={this.props.info.id}/>

        <div className="row no-gutters justify-content-between">
          <Link to="/admin/curator"> Назад</Link>
          <form id="curator_form" className="w-100 mt-3" onSubmit={this.submitForm}>
            <div className="form-row">
              <div className="col form-group">
                <label htmlFor="select-staff">Сотрудник</label>
                {stafflist && <Fragment>
                  <select className="form-control" type="text" name="staff" id="select-staff"
                    onChange={this.setCurator} 
                    value={[this.state.staff_id, this.state.staff_url, this.state.lastname, this.state.firstname, this.state.secondname]}>
                    <option defaultValue>Выберите сотрудника</option>
                    {stafflist.map((staff, index) => {
                      return <option key={index}
                        value={[staff._id, staff.fullname_url, staff.lastname, staff.firstname, staff.secondname]} >
                        {`${staff.lastname} ${staff.firstname} ${staff.secondname ? staff.secondname : ''}`}
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