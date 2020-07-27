import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux'

class SearchField extends Component{

    state={
        query: ''
    }

    changeQuery = e => {
        this.setState({query: e.target.value})
    }

    render(){
        return <Fragment>
            <form>
            <input 
                id="search-input" 
                name="search-query" 
                value={this.state.query} 
                onChange={this.changeQuery}
                class="form-control"
                />
            <button>ПОИСК</button>
            </form>
        </Fragment>
    }
}

const mapStateToProps = state => ({
    params_list: state.search
})

export default connect(
    mapStateToProps,
    {
        // post
    }
)(SearchField)