import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux'

class SearchField extends Component{

    state={
        query: ''
    }

    componentDidMount(){
        document.getElementById("search-input").focus()
    }

    changeQuery = e => {
        this.setState({query: e.target.value})
        // this.props.setQuery(query)
    }

    search = e => {
        e.preventDefault()
        const {query} = this.state
        console.log(query)
        window.location = '/search'
    }

    render(){
        return <Fragment>
            <form id="search-global-form">
                <div className="container">
                <div className="form-row">
                    <input 
                        id="search-input" 
                        name="search-query" 
                        value={this.state.query} 
                        onChange={this.changeQuery}
                        class="form-control col"
                        placeholder="Что ищем?.."
                    />
                    <button className="btn btn-success" type="submit" 
                    onClick={this.search}>ПОИСК</button>
                </div>
                </div>
            </form>
        </Fragment>
    }
}

const mapStateToProps = state => ({
    isLoading: state.search.isLoading,
    query: state.search.query
})

export default connect(
    mapStateToProps,
    {
        // post 
        // setQuery
    }
)(SearchField)