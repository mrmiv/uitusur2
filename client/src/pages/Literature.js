import React, { Component, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import store from '../store'
import { closeNavbar } from '../redux/actions/navbarActions'
import { GetLiteraturePerPage } from '../redux/actions/literatureActions'
import Pagination from "react-js-pagination";

import "./styles/Literature.scss"
import { useLocation, Link, useParams, withRouter } from 'react-router-dom'
import BookView from './components/Book'
import { Modal } from '../components/Modal'

export class Literature extends Component {

    state = {
        page: Number(this.props.match.params.page) || 1,
        perPage: this.props.Literature.perPage,

        sort: this.props.Literature.sort || 1,
        filter: this.props.Literature.filter || null,
        search: this.props.Literature.search || '',

        input_search: ''
    }

    componentDidMount() {
        document.title = this.props.title
        const {perPage, filter, sort, search, page} = this.state
        if (Number(page) === 1 && this.props.location.pathname !== '/literature') {
            this.props.history.push('/literature')
        }
        this.props.GetLiteraturePerPage(Number(page), perPage, filter, sort, search)
    }

    componentWillUnmount() {
        store.dispatch(closeNavbar())
    }

    componentDidUpdate(prevProps, prevState) {
        const { filter, sort, page, perPage, search } = this.props.Literature
        const pp = prevProps.Literature
        const state = this.state
        const ps = prevState        
        if (
               filter !== state.filter
            || sort !== state.sort
            || page !== state.page
            || search !== state.search
            ){
                console.log(
                    "prevprops:", pp,
                    {ppage: page,
                    pperPage: perPage,
                    psort: sort,
                    pfilter: filter,
                    psearch: search},
                    "state:", state)
                this.props.GetLiteraturePerPage(Number(state.page), perPage, state.filter, state.sort, state.search)
            }
            
        // console.log(pl, filter, sort, page, perPage, search);
    }

    Paginate(page) {
        window.scrollTo(0, 0);
        // console.log(page);
        this.props.history.push(page !== 1 ? `/literature/page/${page}` : `/literature`)
    }

    ChangeInput = e => {
        let query = { [e.target.name]: e.target.value }
        this.setState(query)
    }

    SubmitSearch(e) {
        e.preventDefault()
        const search = this.state.input_search.trim()
        this.setState({search})
    }

    render() {
        const { Literature, isLoading } = this.props
        const { LiteratureList, categoryFields, total,
            page, perPage, sort, filter, search } = Literature
        // const {search} = this.state
        return (
            <div id="literature">
                <div className="container-lg container-fluid">
                    <h1>Литература кафедры</h1>
                    <div className="row no-gutters literature__nav">
                        {/* add col-sm-3 class if open search */}
                        <div className="col-6 col-sm-4">
                            <div className="form-group">
                                <label htmlFor="Sort">Сортировка</label>
                                <select name="sort" className="form-control" id="Sort" value={sort} onChange={this.ChangeInput}>
                                    <option selected value={1}>По названию (А...Я)</option>
                                    <option value={-1}>По названию (Я...А)</option>
                                </select>
                            </div>
                        </div>
                        {/* add col-sm-3 class if open search */}
                        <div className="col-sm-4 col-6">
                            <div className="form-group">
                                <label htmlFor="Filter">Категория</label>
                                <select id="Filter" className="form-control" onChange={this.ChangeInput} value={filter} name="filter">
                                    <option selected value="">Все</option>
                                    {categoryFields && categoryFields.map((item, index) => {
                                        return (<option key={index} value={item}>{item[0].toUpperCase() + item.substr(1)}</option>)
                                    })}
                                </select>
                            </div>
                        </div>
                        {/* search form */}
                        <div className="col-12 col-sm-4">
                            <form onSubmit={(e) => this.SubmitSearch(e)}>
                                <div className="form-group">
                                    <label htmlFor="search">Поиск</label>
                                    <input id="search" className="form-control"  type="text"
                                    placeholder="Введите поисковой запрос" name="input_search" 
                                        value={this.state.input_search}
                                        onChange={this.ChangeInput} />
                                </div>
                            </form>
                        </div>
                    </div>
                    {!isLoading ?
                        LiteratureList.length !== 0 ? <Fragment>
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
                                <Pagination
                                    activePage={page}
                                    itemsCountPerPage={perPage}
                                    totalItemsCount={total}
                                    pageRangeDisplayed={5}
                                    itemClass="more-link"
                                    hideFirstLastPages
                                    hideDisabled
                                    onChange={this.Paginate.bind(this)} //this.Paginate.bind(this)
                                />
                            </div>
                        </Fragment> : <p className="d-block mx-auto text-center mt-2">Книги не найдены :(</p>
                        : <p className="d-block mx-auto text-center mt-2">Загрузка</p>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    Literature: state.api.literature.literature,
    isLoading: state.api.literature.literature.isLoading,
})

export default withRouter(connect(
    mapStateToProps,
    { GetLiteraturePerPage }
)(Literature))

const Book = ({ title, author, image, category, id }) => {

    const len = title.length
    const start = 32
    const full = 64

    const [Title, setVisibilityTitle] = useState(len <= start);

    // console.log(Title);
    // len<=start ? title : title.substr(0,start-3) + "..."
    let location = useLocation()

    return (
        <div className="col-xl-3 col-md-4 col-sm-6 col-xs-12 p-2"
            onMouseEnter={() => setVisibilityTitle(true)}
            onMouseLeave={() => setVisibilityTitle(false)}>
            <Link to={{
                pathname: `/literature/book/${id}`,
                state: { background: location }
            }}>
                <div className="literature__bookInList" style={{ background: `url(${image}) no-repeat`, backgroundSize: "cover", backgroundPosition: "center" }}>
                    {/* <div className="literature-list-image"  /> */}
                    <p className="bookInList__info">
                        <span className="info__category">{category[0].toUpperCase() + category.substr(1)}</span>
                        <span className="info__title">{
                            Title
                                ? (len < full ? title : title.substr(0, full - 3) + "...")
                                : (len < start ? title : title.substr(0, start - 3) + "...")
                        }</span>
                        <span className="info__author">{author}</span>
                    </p>
                </div>
            </Link>
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