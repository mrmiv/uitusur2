import React, { Component, Fragment } from 'react'
import store from '../store'
import { closeNavbar } from '../redux/actions/navbarActions'
import { setQuery, Search } from '../redux/actions/data_actions/SearchActions'
// import { getquiz } from '../redux/actions/data_actions/SearchActions'
import { connect } from 'react-redux'
import "./styles/Search.scss"

export class SearchPage extends Component {

    state = {
        query: "",
        submited: false,
        msg: null
    }

    componentDidMount() {
        document.title = this.props.title
        document.getElementById("search-input").focus()
    }

    changeQuery = e => {
        const query = e.target.value
        this.setState({submited: false, query})
    }

    componentWillUnmount() {
        store.dispatch(closeNavbar())
    }

    Search = e =>{
        e.preventDefault()
        const {query} = this.state
        // console.log(query);
        if (query !== this.props.query) {
            this.props.Search(query)
            this.setState({submited: true})
        }
    }

    render() {
        const { SearchIsLoading, result } = this.props
        const {submited, query} = this.state
        return (
            <Fragment>
                <div className="container">
                    <form id="search-form" onSubmit={this.Search}>
                        <input 
                            required
                            autofocus
                            maxLength={128}
                            id="search-input" 
                            name="search-query" 
                            value={query} 
                            onChange={this.changeQuery}
                            className="form-control-input"
                            placeholder="Что ищем?.."
                        />
                    </form>
                    {/* {query? <code>{query}</code> : <p>Запрос пустой :(</p>} */}
                    {(submited && !result) && 
                    (query ?
                        (!SearchIsLoading && !result) ? <p>К сожалению, по запросу <code>{query}</code> ничего не найдено :(</p>
                        : <p>Подождите, ваш запрос обрабатывается...</p>
                    : <p>Введите запрос</p>)}
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    query: state.search.query,
    SearchIsLoading: state.search.isLoading,
    result: state.search.result
})
export default connect(
    mapStateToProps,
    {setQuery, Search}
)(SearchPage)