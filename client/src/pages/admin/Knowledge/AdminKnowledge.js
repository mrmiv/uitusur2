import React, { Component } from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { getKnowledgeList, deleteKnowledge, setMarks } from '../../../redux/actions/knowledgeActions'
import { clearInfo } from '../../../redux/actions/infoActions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { MessageAlert } from '../components/MessageAlert'

import { Icon } from '@iconify/react';
import plusCircle from '@iconify/icons-fa-solid/plus-circle';
import trashAlt from '@iconify/icons-fa-solid/trash-alt';
import bxsEdit from '@iconify/icons-bx/bxs-edit';
import { filterKnowledgeByMark, filterKnowledgeByType } from '../../knowledge/middleware/filterKnowledge'
import KnowledgeMarks from '../../knowledge/components/KnowledgeMarks'

export class AdminKnowledge extends Component {

  state = {
    marks:{
      uk: true,
      i:  true,
      rt: true,
      all:true 
    },
    types:{
      "Подкаст": true,
      "Курс": true,
      "Приложение": true,
      "Аудиокнига": true,
      "Другое": true
    },
    knowledgeList: {
      "Подкаст": [],
      "Курс" : [],
      "Приложение": [],
      "Аудиокнига": [],
      "Другое": []
    },
    msg: null
  }

  componentWillUnmount() {
    this.props.closeNavbar()
    this.props.setMarks({
      uk: true,
      i:  true,
      rt: true,
      all:true 
    })
  }

  componentDidMount() {
    document.title = this.props.title
    this.props.clearInfo()
    this.props.getKnowledgeList()
  }

  componentDidUpdate(prevProps) {
    const { msg } = this.props.info
    const {knowledgeList} = this.props
    if (msg !== prevProps.info.msg) {
      this.setState({ msg })
    }

    if(knowledgeList !== prevProps.knowledgeList){
      this.setState({knowledgeList})
    }
  }

  delKnowledge = (id, type) => {
    const areYouSure = window.confirm('Вы действительно хотите удалить этот элемент?')
    if(areYouSure){
      window.scrollTo(0, 0)
      this.props.clearInfo()
      this.props.deleteKnowledge(id, type)
    } else {
      console.log('Элемент не удален')
    }
  }

  render() {
    const { isLoading } = this.props
    const { knowledgeList, marks, types, msg } = this.state

    const knowledgeListByTypes = filterKnowledgeByType(knowledgeList, types)
    const fullKnowledgeList = filterKnowledgeByMark(knowledgeListByTypes, marks)

    return (
      <div className="container-md container-fluid">
          
        <MessageAlert msg={msg} id={this.props.info.id}/>
        
        <div className="d-flex align-items-center justify-content-between">
          <h1>База знаний</h1>
          <Link className="add_admin_button" to="/admin/knowledge/add">Добавить знания <Icon icon={plusCircle} /></Link>
        </div>
        {(!isLoading) ?
          (fullKnowledgeList && fullKnowledgeList.length !== 0) ?
        <table className="table table-sm table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col" style={{width: "50px", textAlign: "center"}}>#</th>
              <th scope="col">Название</th>
              <th scope="col" style={{width: "160px", textAlign: "center"}}>Тип</th>
              <th scope="col" style={{width: "160px", textAlign: "center"}} >Метки</th>
              <th scope="col" style={{ width: "50px", textAlign: "center" }}> <Icon icon={bxsEdit} /> </th>
              <th scope="col" style={{ width: "50px", textAlign: "center" }}><Icon icon={trashAlt} /></th>
            </tr>
          </thead>
          <tbody> 
            {fullKnowledgeList.map((item, index) => {
              return (
                <tr key={item._id}>
                  <th scope="row" >{index}</th>
                  <td name="title">{item.title}</td>
                  <td name="type">{item.type}</td>
                  <td name="marks" className="marks-column-admin"><KnowledgeMarks marks={item.marks}/></td>
                  <td name="edit">
                    <Link className="btn" title="Редактировать" to={`/admin/knowledge/edit/${item._id}`}> <Icon icon={bxsEdit} color="green" /></Link>
                  </td>
                  <td name="del">
                    <button className="btn" onClick={() => this.delKnowledge(item._id, item.type)}><Icon icon={trashAlt} color="red" /></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
          : <p>Знаний нет :(</p>
        : <p>Загрузка</p>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  knowledgeList: state.api.knowledge.knowledgeList,
  isLoading: state.api.knowledge.isLoading,
  info: state.info
})

export default connect(
    mapStateToProps,
    { closeNavbar, getKnowledgeList, deleteKnowledge, setMarks, clearInfo }
)(AdminKnowledge)