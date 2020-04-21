import React, {Component} from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { GetLiteraturePerPage } from '../../../redux/actions/literatureActions'
import { connect } from 'react-redux'
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


export class AdminLiterature extends Component{

    state={
        page: 1,
        perPage: 12
    }

    componentWillUnmount(){
        this.props.closeNavbar()
    }

    componentDidMount(){
        document.title = this.props.title
        this.props.GetLiteraturePerPage(this.state.page, this.state.perPage)
    }

    render(){
        const {Literature} = this.props
        const {LiteratureList, isLoading} = Literature

        return(
            <div className="container-md container-fluid">
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
                            {/* style={{width="50px"}} */}
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading && LiteratureList?
                            LiteratureList.map((item, index)=>{
                                return(
                                    <tr key={index}>
                                        <th scope="row">{index}</th>
                                        <td name="title">{item.title}</td>
                                        <td name="author">{item.author}</td>
                                        <td name="category">{item.category}</td>
                                    </tr>
                                )
                            })
                        : <p>loading</p>}
                    </tbody>
                    </table>
                </div>
            </div>
        )
    }
} 

const mapStateToProps = state => ({
    Literature: state.api.literature.literature
})
  
export default connect(
    mapStateToProps,
    { closeNavbar, GetLiteraturePerPage}
)(AdminLiterature)