import React, {Component} from 'react'
import {connect} from 'react-redux'
import store from '../store'
import { closeNavbar } from '../redux/actions/navbarActions'
import { GetLiteraturePerPage } from '../redux/actions/literatureActions'
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import "./styles/Literature.scss"
import { useLocation, Link, useParams, NavLink } from 'react-router-dom'
import BookView from './components/Book'
import {Modal} from '../components/Modal'

export class Student extends Component{

    state={
        page: this.props.Literature.page,
        perPage: 12,
        totalPage: this.props.Literature.totalPage,

        sort: 1,
        category: null,
        keywords: [],

        keyword: '',

    }

    componentDidMount(){
        document.title = this.props.title
        this.props.GetLiteraturePerPage(this.state.page, this.state.perPage)
    }

    componentWillUnmount(){
        store.dispatch(closeNavbar())
    }

    Paginate(page){
        window.scrollTo(0, 0);
        this.props.GetLiteraturePerPage(page)
    }

    ChangeInput=e=>{
        this.setState({ [e.target.name] : e.target.value })
    }

    addKeyword(e){
        e.preventDefault()
        const {keywords, keyword} = this.state
        let exists;

        keywords.forEach(word => {
            if(word===keyword){
                exists=true
            }
        })

        if (keywords.length>5){
            this.setState({keyword: ''})
        }

        if (keyword!=='' && !exists){
            this.setState({keywords: [...keywords, keyword], keyword: '' })
        }
    }

    deleteKeyword(name){
        const {keywords} = this.state

        console.log(name);
        

        this.setState({
            keywords: keywords.filter(el => el !== name)
        })
    }

    render(){
        const {Literature} = this.props
        const {LiteratureList, isLoading} = Literature

        const {keywords} = this.state
        return(
            <div id="literature">
                <div className="container-lg container-fluid">
                    <div className="row no-gutters literature__nav">
                        <div  className="col-6 col-sm-3">
                            <label htmlFor="Sort">Сортировка</label>
                            <input id="Sort" disabled placeholder="По названию (От А до Я)" name="sort" type="text"/>
                        </div>
                        <div  className="col-6 col-sm-3">
                            <label htmlFor="Filter">Категория</label>
                            <input id="Filter" disabled placeholder="Все" name="filter" type="text"/>
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
                    <div className="literature__pagination d-inline">
                        {/* {!isLoading?
                            navPages.map(link => {
                            return <NavLink 
                                aria-current="page"
                                to={`/literature/${link}`}
                                className="more-link"
                                >{link}</NavLink >
                            })
                        :null} */}
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
)(Student)

const Book = ({title, author, image, category, id}) =>{
    
    let location = useLocation()

    return(
        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6">
             <Link to={{
                pathname: `/book/${id}`,
                state: {background: location}
            }}>
                <div className="literature__bookInList">
                    <img src={`/${image}`} alt={title}/>
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