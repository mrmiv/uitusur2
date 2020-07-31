import React, {Component, Fragment} from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { clearInfo } from '../../../redux/actions/infoActions'
import { GetLiteraturePerPage, delLiterature } from '../../../redux/actions/literatureActions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Pagination from 'react-js-pagination'

import { Icon } from '@iconify/react';
import plusCircle from '@iconify/icons-fa-solid/plus-circle';
import cogIcon from '@iconify/icons-fa-solid/cog';
import trashAlt from '@iconify/icons-fa-solid/trash-alt';

export class AdminLiterature extends Component{

    state={
        page: 1,
        perPage: 20,
        category: null,
        total: this.props.Literature.total,

        msg: null
    }

    componentWillUnmount(){
        this.props.closeNavbar()
    }

    componentDidMount(){
        this.props.clearInfo()
        document.title = this.props.title
        this.props.GetLiteraturePerPage(this.state.page, this.state.perPage)
    }

    componentDidUpdate(prevProps){
        const {msg} = this.props.info
        if(msg!==prevProps.info.msg){
            this.setState({msg})
        }
    }

    Paginate(page){
        this.props.clearInfo()
        window.scrollTo(0, 0);
        this.setState({page})
        this.props.GetLiteraturePerPage(page,this.state.perPage)
    }

    delLiterature=(id)=>{
        const areYouSure = window.confirm('Вы действительно хотите удалить этот элемент?')
        if(areYouSure){
            window.scrollTo(0, 0)
            this.props.clearInfo()
            this.props.delLiterature(id, this.state.page)

        } else {
            console.log('Элемент не удален')
        }
    }

    render(){
        const {Literature} = this.props
        const {LiteratureList, isLoading} = Literature
        const {page, perPage, total, msg} = this.state
        return(
            <div className="container-md container-fluid">
                {msg ? 
                <div className={`alert 
                ${this.props.info.id === "REQ_FAIL"? 'alert-danger': null}
                ${this.props.info.id === "REQ_SUCCESS" ? 'alert-success': null} alert-dismissible fade show`} role="alert">
                    {this.props.info.id === "REQ_FAIL" && <strong>Ошибка! </strong> }
                    {this.props.info.id === "REQ_SUCCESS" && <strong>Успех! </strong>}
                    {msg.message}
                <button type="button" className="close" data-dismiss="alert" onClick={()=>this.props.clearInfo()} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div> : null}
                <div className="row no-gutters align-items-center justify-content-between">
                    <h1> <Link to="/admin" style={{fontSize: "1em"}}><Icon icon={cogIcon} /></Link> Литература кафедры</h1>
                    <Link className="add_admin_button" to="/admin/literature/add">Добавить книгу <Icon icon={plusCircle}/></Link>
                </div >
                {!isLoading && LiteratureList?
                <Fragment>
                    <table class="table table-sm table-bordered table-hover">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Заголовок</th>
                            <th scope="col">Авторы</th>
                            <th scope="col">Категория</th>
                            <th scope="col" style={{width:"50px", textAlign: "center"}}><Icon icon={trashAlt}/></th>
                            {/* style={{width="50px"}} */}
                        </tr>
                    </thead>
                    <tbody>
                        {LiteratureList.map((item, index)=>{
                        return(
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td name="title"><Link to={`/admin/literature/edit/${item._id}`}>{item.title}</Link></td>
                                <td name="author">{item.author}</td>
                                <td name="category">{item.category}</td>
                                <td name="del">
                                    <button type="button" className="btn" onClick={()=>this.delLiterature(item._id)}><Icon icon={trashAlt} color="red"/></button>
                                </td>
                            </tr>
                        )
                        })}
                    </tbody>
                </table>
                <div className="pagination">
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={perPage}
                        totalItemsCount={total}
                        pageRangeDisplayed={7}
                        itemClass="more-link"
                        hideFirstLastPages
                        hideDisabled
                        onChange={this.Paginate.bind(this)} //this.Paginate.bind(this)
                    />
                </div>
                </Fragment>
                : <p>Загрузка</p>}
            </div>
        )
    }
} 

const mapStateToProps = state => ({
    Literature: state.api.literature.literature,
    info: state.info
})
  
export default connect(
    mapStateToProps,
    { closeNavbar, GetLiteraturePerPage, delLiterature, clearInfo}
)(AdminLiterature)