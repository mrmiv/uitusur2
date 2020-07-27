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
    }

    search = () => {
        const {query} = this.state
        console.log(query)
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
                    <button className="btn btn-success" onClick={this.search}>ПОИСК</button>
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
    }
)(SearchField)