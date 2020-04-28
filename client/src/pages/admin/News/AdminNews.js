import React, {Component} from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { GetNewsList } from '../../../redux/actions/newsActions'
import { connect } from 'react-redux'
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTrashAlt, faMapPin } from '@fortawesome/free-solid-svg-icons'
import { Link, withRouter } from 'react-router-dom'


export class AdminNews extends Component{

    state={
        type: 1,
        NewsList: [],
        page: 1,
        perPage: 12
    }

    componentWillUnmount(){
        this.props.closeNavbar()
    }

    componentDidMount(){
        document.title = this.props.title
        this.props.GetNewsList(1)
    }

    componentDidUpdate(prevProps) {

        const {NewsList} = this.props.news
        
        if (NewsList !== prevProps.news.NewsList) {
            this.setState({ NewsList });
        }
    }

    // delStaff=(id)=>{
    //     this.props.delStaff(id)
    //     this.props.GetStaffList()
    // }

    setNewsType = e => {
        const type = e.target.value
        
        this.setState({type})
        this.props.GetNewsList(type)
    }

    render(){
        const {NewsList} = this.state
        
        return(
            <div className="container-md container-fluid">
                <div className="row no-gutters justify-content-between">
                <h2>Новости кафедры</h2>
                <select onChange={this.setNewsType}>
                    <option name="Объявления кафедры" value={1}>Объявления кафедры</option>
                    <option name="Стипендии и гранты" value={2}>Стипендии и гранты</option>
                    <option name="Конференции" value={3}>Конференции</option>
                </select>
                <Link to="/admin/news/form">Добавить новость<Icon icon={faPlusCircle}/></Link>
                <div className="w-100"/>
                {this.state.type &&
                <table className="table table-hover table-sm-responsive">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Заголовок</th>
                            <th scope="col">Дата создания</th>
                            <th scope="col" style={{width:"50px", textAlign: "center"}}> <Icon icon={faMapPin}/> </th>
                            <th scope="col" style={{width:"50px", textAlign: "center"}}> <Icon icon={faTrashAlt}/> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {NewsList?
                            NewsList.map((item, index)=>{
                                return(<NewsRow key={index} 
                                    index={index}
                                    title={item.title} 
                                    datetime={item.created_at} 
                                    id={item._id}/>)
                            })
                        : <p>loading</p>}
                    </tbody>
                    </table>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    news: state.api.news.newslist,
    info: state.info
})
  
export default withRouter(connect(
    mapStateToProps,
    { closeNavbar, GetNewsList}
)(AdminNews))

function NewsRow({index, id, title, datetime}) {

    const date = new Date(datetime)

    const day = date.getDate()
    let month = date.getMonth()
    if (month<10){month = "0"+month}
    const year = date.getFullYear()
    const hour = date.getHours()
    const minute = date.getMinutes()

    const created_at = day+'.'+month+'.'+year+' '+hour+':'+minute

    return(
        <tr>
            <th scope="row">{index}</th>
            <td name="title"><Link to={`/admin/news/form/${id}`}>{title}</Link></td>
            <td name="date">{created_at}</td>
            <td name="pin">
                <button type="button" className="btn"><Icon icon={faMapPin}/></button>
            </td>
            <td name="del">
                <button type="button" className="btn"><Icon icon={faTrashAlt}/></button>
            </td>
        </tr>
    )
    
}