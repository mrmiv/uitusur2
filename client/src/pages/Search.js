import React, { Fragment, PureComponent } from 'react'
import store from '../store'
import { closeNavbar } from '../redux/actions/navbarActions'
import { setQuery, Search } from '../redux/actions/data_actions/SearchActions'
// import { getquiz } from '../redux/actions/data_actions/SearchActions'
import { connect } from 'react-redux'
import "./styles/Search.scss"
import { NewsListMap } from './News'
import { LiteratureList } from './Literature'
import { StaffListMap } from './About'
import { Link } from 'react-router-dom'

export class SearchPage extends PureComponent {

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

    returnResults = () => {

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

        return <section id="search-result">
            
            {(params.length !== 0) && this.returnParamPage(params)}

            {this.returnStaff(staff)}

            {this.returnNews(news)}
            
            {(docs.length !==0) && <section id="docs">
                <h2>Регламентирующие нашлись, но пока не отображаются)))))))))))))))</h2>
            </section>}

            {this.returnLiterature(literature)}

            
            
        </section>

    }

    returnParamPage = (params) => {

        const pageArray = Array.from(params, ({page}) => page);
    
        const uniqueParams = [...new Set(pageArray)];

        const element = (link, name) => <ParamLinkToPage link={link} name={name}/>

        return <Fragment>

            <h2 className="title-category-search" style={{color:"#B21F66"}}>
                Возможно, вы найдете то, что ищете, на предложенных страницах:
            </h2>

            {uniqueParams.map(page => {
            switch (page) {
                case 'Абитуриенту':
                    return element('/abiturient', page);
    
                case 'О кафедре':
                    return element('/about', page);;
                    
                case 'Бакалавриат':
                    return element('/bakalavriat', page);
    
                case 'Магистратура':
                    return element('/magistratura', page);
    
                case 'Поступающему Магистратура':
                    return element('/abiturient-mag', page);
    
                default:
                    break;
            }
        })}

        </Fragment>
    }

    returnNews = (news) => {
        if (news && news.length === 0){
            return
        }
        
        const color="#DE7128"

        return <section id="news" className="mt-2">
            <h2 style={{color}}>Новости</h2>
            <NewsListMap NewsList={news}/>
            {(news.length === 6) && <Link to="/news"
            style={{backgroundColor: color}} className="more-link">Перейти к новостям</Link>}
        </section>
    } 

    returnLiterature = (literature) => {
        if (literature && literature.length === 0){
            return
        }

        const color="#DE7128"

        return <section id="literature">
            <h2 style={{color}}>Литература</h2>
            <LiteratureList literatureList={literature}/>
            {(literature.length === 8) && <Link to="/literature" 
            style={{backgroundColor: color}} className="more-link">Перейти к литературе</Link>}
        </section>
    }

    returnStaff = (staff) => {
        if (staff && staff.length ===0){
            return
        }

        const color="#DE7128"

        return <section id="staff" className="mt-2">
            <h2 style={{color}}>Сотрудники кафедры</h2>
            <StaffListMap StaffList={staff}/>
            {(staff.length === 8) && <Link to={{pathname:"/about", state:"staff"}} 
            style={{backgroundColor: color}} className="more-link">Перейти к сотрудникам кафедры</Link>}
        </section>
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

const ParamLinkToPage = ({link, name}) => {

    return <div className="link-to-param-page">
        <Link to={link}>
            {name}
        </Link>
    </div>

}