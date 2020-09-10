import React, { Component, Fragment } from 'react'
import store from '../store'
import { closeNavbar } from '../redux/actions/navbarActions'
import { setQuery, Search } from '../redux/actions/data_actions/SearchActions'
// import { getquiz } from '../redux/actions/data_actions/SearchActions'
import { connect } from 'react-redux'
import "./styles/Search.scss"
import { NewsListMap } from './News'

export class SearchPage extends Component {

    state = {
        query: "",
        first_submited: false,
        msg: null,
        
        clubs: [],
        docs: [],
        literature: [],
        news: [],
        params: [],
        staff: [],
    }

    componentDidMount() {
        document.title = this.props.title
        document.getElementById("search-input").focus()
    }

    componentDidUpdate(prevProps){
        // const {clubs, docs, literature, news, params, staff} = this.state
        const {result} = this.props

        if(result && (prevProps.result !== result)){
            this.setState({
                clubs:      result.clubData,
                docs:       result.docData,
                literature: result.literatureData,
                news:       result.newsData, 
                params:     result.paramData, 
                staff:      result.staffData
            })
        }
    }

    changeQuery = e => {
        const query = e.target.value
        this.setState({query})
    }

    componentWillUnmount() {
        store.dispatch(closeNavbar())
    }

    Search = e =>{
        e.preventDefault()
        const {query, first_submited} = this.state
        // console.log(query);

        if(!query.trim()){
            return
        }

        if (query.trim() !== this.props.query) {
            if (!first_submited) {
                this.setState({first_submited: true})
            }
            this.props.Search(query)
        }
    }

    returnResults = result => {

        const {
            query,
            clubs, 
            docs, 
            literature, 
            news, 
            params, 
            staff
        } = this.state

        const notFoundText = <p>К сожалению, по вашему запросу <code>{query}</code> ничего не найдено :(</p>

        if (
            clubs.length ===0 &&
            docs.length ===0 &&
            literature.length ===0 &&
            news.length ===0 &&
            params.length ===0 &&
            staff.length ===0
        ) {
            return notFoundText
        }

        return <Fragment>
            
{/* {params.map(param=>{
                ?
            })} */}

            {(news.length !== 0) && <section id="news">
                <NewsListMap NewsList={news}/>
            </section>}
            
            {(docs.length !==0) && <section id="docs">
            
            </section>}

            
        </Fragment>

    }

    render() {
        const { SearchIsLoading, result } = this.props
        const {first_submited, query} = this.state
        return (
            <Fragment>
                <div className="container">
                    <form id="search-form" onSubmit={this.Search}>
                        <input 
                            required
                            autofocus
                            maxLength={64}
                            id="search-input" 
                            name="search-query" 
                            value={query} 
                            onChange={this.changeQuery}
                            className="form-control-input"
                            placeholder="Что ищем?.."
                        />
                    </form>

                    {first_submited && 
                        (SearchIsLoading ? <p>Подождите, ваш запрос обрабатывается...</p>
                            : (result && this.returnResults(result))
                        )
                    }
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