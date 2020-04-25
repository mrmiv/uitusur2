import React, {Component} from 'react'
import {connect} from 'react-redux'
import store from '../store'
import { closeNavbar } from '../redux/actions/navbarActions'
import { GetLiteraturePerPage } from '../redux/actions/literatureActions'
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import Pagination from "react-js-pagination";

import "./styles/Literature.scss"
import { useLocation, Link, useParams, NavLink } from 'react-router-dom'
import BookView from './components/Book'
import {Modal} from '../components/Modal'

export class Literature extends Component{

    state={
        page: 1,
        perPage: 12,
        total: this.props.Literature.total,

        sort: 1,
        category: null,
        keywords: [],
        isLoading: false,

        keyword: '',
    }

    componentDidMount(){
        document.title = this.props.title
        this.props.GetLiteraturePerPage(this.state.page, this.state.perPage)
    }

    componentWillUnmount(){
        store.dispatch(closeNavbar())
    }

    componentDidUpdate(prevProps, prevState){
        const {category, sort, page} = this.state
        
        if(category !== prevState.category || sort !==prevState.sort || page !== prevState.page){
            this.props.GetLiteraturePerPage(page, 12,category,sort)
        }

    }

    Paginate(page){
        window.scrollTo(0, 0);
        console.log(page);
        
        this.setState({page})
        this.props.GetLiteraturePerPage(page)
    }

    ChangeInput=e=>{

        const {keywords} = this.state
        let query = {}
        
        if (e.target.name === "category" && keywords!==[]){
            query={category: e.target.value, keywords: []}
        } else {
            query = {[e.target.name]: e.target.value}
        }

        this.setState(query)
    }

    addKeyword(e){
        e.preventDefault()
        const {keywords, keyword, category} = this.state
        let exists;

        if(category){this.setState({category: null})}
        keywords.forEach(word => {
            if(word===keyword){exists=true}
        })
        if (keywords.length>5){this.setState({keyword: ''})}
        keyword.trim()
        if (keyword!=='' && !exists){this.setState({keywords: [...keywords, keyword], keyword: '' })}
    }

    deleteKeyword(name){
        const {keywords} = this.state

        this.setState({
            keywords: keywords.filter(el => el !== name)
        })
    }

    render(){
        const {Literature} = this.props
        const {LiteratureList, isLoading, categoryFields} = Literature

        const {keywords, page, perPage, total} = this.state
        return(
            <div id="literature">
                <div className="container-lg container-fluid">
                    <div className="row no-gutters literature__nav">
                        <div  className="col-6 col-sm-3">
                            <label htmlFor="Sort">Сортировка</label>
                            <select name="sort" id="Sort" onChange={this.ChangeInput}>
                                <option selected value={1}>По названию (А...Я)</option>
                                <option value={-1}>По названию (Я...А)</option>
                            </select>
                        </div>
                        <div  className="col-6 col-sm-3">
                            <label htmlFor="Filter">Категория</label>
                            <select id="Filter" onChange={this.ChangeInput} name="category">
                                <option selected value={''}>Выберите категорию</option>
                                {categoryFields && categoryFields.map((item,index)=>{
                                    return (<option key={index} value={item}>{item[0].toUpperCase()+item.substr(1)}</option>)
                                })}
                            </select>
                        </div>
                        <div  className="col-12 col-sm-6">
                            <label htmlFor="Keywords">Ключевые слова</label>
                            <form onSubmit={(e)=>this.addKeyword(e)}>
                                <input id="Keywords" placeholder="..." name="keyword" type="text" 
                                    value={this.state.keyword}
                                    onChange={(e)=>this.setState({keyword: e.target.value})}/>
                            </form>
                        </div>
                    </div>
                    { keywords.lenght!==0 &&
                        <div className="keywords d-inline-flex">
                            {keywords.map(word=>{
                                return (<div className="keyword" 
                                key={word} 
                                name={word} 
                                onClick={()=>this.deleteKeyword(word)}>
                                    <p>{word} <Icon icon={faTimesCircle} className="ml-2"/></p>
                                </div>)
                            })}
                        </div>
                        }
                    <div className="row no-gutters literature__content">
                        {!isLoading?
                        LiteratureList.map((book, index) => {
                            return(
                                <Book key={index}
                                    index={index} 
                                    id={book._id}
                                    title={book.title}
                                    author={book.author}
                                    image={book.image}
                                    category={book.category}
                                />
                            )
                        })    
                        :<div style={{width: "100%", height: "100%"}}> Loading...
                            </div>}
                    </div>
                    <div className="pagination">
                        {(!isLoading && LiteratureList) &&
                            <Pagination
                            activePage={page}
                            itemsCountPerPage={perPage}
                            totalItemsCount={total}
                            pageRangeDisplayed={7}
                            itemClass="more-link"
                            hideFirstLastPages
                            hideDisabled
                            onChange={this.Paginate.bind(this)} //this.Paginate.bind(this)
                          />}
                    </div>
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
    { GetLiteraturePerPage }
)(Literature)

const Book = ({title, author, image, category, id}) =>{
    
    let location = useLocation()

    return(
        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6">
             <Link to={{
                pathname: `/book/${id}`,
                state: {background: location}
            }}>
                <div className="literature__bookInList">
                    <img src={`${image}`} alt={title}/>
                    <p>
                        <span>{category}</span>
                        <br/>
                        <strong>{title}</strong>
                        <br/>
                        {author}
                    </p>
                </div>
            </Link>
        </div>
    )
}

export function BookPage(){
    let {id} = useParams()
    return <div className="container-lg container-fluid">
        <BookView id={id}/>
    </div>
}

export function BookModal(){
    let {id} = useParams()
    return <Modal>
        <BookView id={id}/>
    </Modal>
}