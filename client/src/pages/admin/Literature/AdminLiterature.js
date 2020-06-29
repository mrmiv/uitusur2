import React, {Component} from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { clearInfo } from '../../../redux/actions/infoActions'
import { GetLiteraturePerPage, delLiterature } from '../../../redux/actions/literatureActions'
import { connect } from 'react-redux'
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Pagination from 'react-js-pagination'

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
        window.scrollTo(0,0)
        this.props.clearInfo()
        this.props.delLiterature(id, this.state.page)
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
                <div className="row no-gutters justify-content-between">
                <h2>Литература кафедры</h2>
                <Link to="/admin/literature/add">Добавить книгу <Icon icon={faPlusCircle}/></Link>
                <div className="w-100"/>
                <table class="table table-hover">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Заголовок</th>
                            <th scope="col">Авторы</th>
                            <th scope="col">Категория</th>
                            <th scope="col" style={{width:"50px", textAlign: "center"}}><Icon icon={faTrashAlt}/></th>
                            {/* style={{width="50px"}} */}
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading && LiteratureList?
                            LiteratureList.map((item, index)=>{
                            return(
                                <tr key={index}>
                                    <th scope="row">{index+1}</th>
                                    <td name="title"><Link to={`/admin/literature/edit/${item._id}`}>{item.title}</Link></td>
                                    <td name="author">{item.author}</td>
                                    <td name="category">{item.category}</td>
                                    <td name="del">
                                        <button type="button" className="btn" onClick={()=>this.delLiterature(item._id)}><Icon icon={faTrashAlt}/></button>
                                    </td>
                                </tr>
                            )
                            })
                        : <p>loading</p>}
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
                </div>
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