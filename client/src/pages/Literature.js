import React, { Component, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import store from '../store'
import { closeNavbar } from '../redux/actions/navbarActions'
import { GetLiteraturePerPage } from '../redux/actions/literatureActions'
import Pagination from "react-js-pagination";

import "./styles/Literature.scss"
import { useLocation, Link, useParams } from 'react-router-dom'
import BookView from './components/Book'
import { Modal } from '../components/Modal'

export class Literature extends Component {

    state = {
        page: 1,
        perPage: 12,

        sort: 1,
        category: null,
        keywords: [],

        keyword: '',
    }

    componentDidMount() {
        document.title = this.props.title
        const {page, perPage, category, sort, keywords} = this.state
        this.props.GetLiteraturePerPage(page, perPage, category, sort, keywords)
    }

    componentWillUnmount() {
        store.dispatch(closeNavbar())
    }

    componentDidUpdate(prevProps, prevState) {
        const { category, sort, page, keywords } = this.state
        if (category !== prevState.category || sort !== prevState.sort || page !== prevState.page || keywords!==prevState.keywords) {
            this.props.GetLiteraturePerPage(page, this.state.perPage, category, sort, keywords)
        }
    }

    Paginate(page) {
        window.scrollTo(0, 0);
        // console.log(page);
        const { perPage, category, sort, keywords } = this.state
        this.setState({ page })
        this.props.GetLiteraturePerPage(page, perPage, category, sort, keywords)
    }

    ChangeInput = e => {
        let query = {[e.target.name]: e.target.value}
        this.setState(query)
    }

    addKeyword(e) {
        e.preventDefault()
        const { keywords, keyword } = this.state
        let exists;

        // if (category) { this.setState({ category: null }) }
        keywords.forEach(word => {
            if (word === keyword) { exists = true }
        })
        if (keywords.length > 5) { this.setState({ keyword: '' }) }
        keyword.trim()
        if (keyword !== '' && !exists) { this.setState({ keywords: [...keywords, keyword], keyword: '' }) }
    }

    deleteKeyword(name) {
        const { keywords } = this.state

        this.setState({
            keywords: keywords.filter(el => el !== name)
        })
    }

    render() {
        const { Literature, isLoading } = this.props
        const { LiteratureList, categoryFields, total } = Literature

        const { page, perPage, keywords } = this.state
        // const {keywords} = this.state
        return (
            <div id="literature">
                <div className="container-lg container-fluid">
                    <div className="row no-gutters literature__nav">
                        {/* add col-sm-3 class if open keywords */}
                        <div className="col-6 col-sm-3">
                            <label htmlFor="Sort">Сортировка</label>
                            <select name="sort" id="Sort" onChange={this.ChangeInput}>
                                <option selected value={1}>По названию (А...Я)</option>
                                <option value={-1}>По названию (Я...А)</option>
                            </select>
                        </div>
                        {/* add col-sm-3 class if open keywords */}
                        <div className="col-sm-3 col-6">
                            <label htmlFor="Filter">Категория</label>
                            <select id="Filter" onChange={this.ChangeInput} name="category">
                                <option selected value="">Все</option>
                                {categoryFields && categoryFields.map((item, index) => {
                                    return (<option  key={index} value={item}>{item[0].toUpperCase() + item.substr(1)}</option>)
                                })}
                            </select>
                        </div>
                        {/* keywords form */}
                        <div className="col-12 col-sm-6">
                            <label htmlFor="Keywords">Ключевые слова</label>
                            <form onSubmit={(e) => this.addKeyword(e)}>
                                <input id="Keywords" placeholder="..." name="keyword" type="text"
                                    value={this.state.keyword}
                                    onChange={(e) => this.setState({ keyword: e.target.value })} />
                            </form>
                        </div>
                    </div>
                    {/* keywords list */}
                    {keywords.lenght !== 0 &&
                        <div className="keywords d-inline-flex">
                            {keywords.map(word => {
                                return (<div className="keyword"
                                    key={word}
                                    name={word}
                                    onClick={() => this.deleteKeyword(word)}>
                                    <p>{word} &times;</p>
                                </div>)
                            })}
                        </div>
                    }
                    {!isLoading ?
                        <Fragment>
                            <div className="row no-gutters literature__content">
                                {LiteratureList.map((book, index) => {
                                    return (
                                        <Book key={index}
                                            index={index}
                                            id={book._id}
                                            title={book.title}
                                            author={book.author}
                                            image={book.image}
                                            category={book.category}
                                        />
                                    )
                                })}
                            </div>
                            <div className="pagination">
                                {LiteratureList &&
                                    <Pagination
                                        activePage={page}
                                        itemsCountPerPage={perPage}
                                        totalItemsCount={total}
                                        pageRangeDisplayed={5}
                                        itemClass="more-link"
                                        hideFirstLastPages
                                        hideDisabled
                                        onChange={this.Paginate.bind(this)} //this.Paginate.bind(this)
                                    />}
                            </div>
                        </Fragment> : "Загрузка"}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    Literature: state.api.literature.literature,
    isLoading: state.api.literature.literature.isLoading
})

export default connect(
    mapStateToProps,
    { GetLiteraturePerPage }
)(Literature)

const Book = ({ title, author, image, category, id }) => {

    const len = title.length
    const start = 32
    const full = 64
    
    const [Title, setVisibilityTitle] = useState(len<=start);

    // console.log(Title);
    // len<=start ? title : title.substr(0,start-3) + "..."
    let location = useLocation()

    return (
        <div className="col-xl-3 col-md-4 col-sm-6 col-xs-12 p-2"
        onMouseEnter={()=>setVisibilityTitle(true)}
        onMouseLeave={()=>setVisibilityTitle(false)}>
            <div className="literature__bookInList" style={{ background: `url(${image}) no-repeat`, backgroundSize: "cover", backgroundPosition: "center" }}>
                {/* <div className="literature-list-image"  /> */}
                <p className="bookInList__info">
                    <span className="info__category">{category[0].toUpperCase() + category.substr(1)}</span>
                    <span className="info__title">{
                        Title 
                        ? (len<full ? title : title.substr(0,full-3)+"...")
                        : (len<start ? title : title.substr(0,start-3)+"...")
                    }</span>
                    <span className="info__author">{author}</span>
                <Link to={{
                    pathname: `/book/${id}`,
                    state: { background: location }
                }}>Подробнее</Link>
                </p>
            </div>
        </div>
    )
}

export function BookPage() {
    let { id } = useParams()
    return <div className="container-lg container-fluid">
        <BookView id={id} />
    </div>
}

export function BookModal() {
    let { id } = useParams()
    return <Modal>
        <BookView id={id} />
    </Modal>
}