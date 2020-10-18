import React, { Component, Fragment } from 'react'
import { closeNavbar } from '../redux/actions/navbarActions'
import { GetDocuments } from '../redux/actions/docsActions'
import { connect } from 'react-redux'
import './styles/Docs.scss'
import { toDate } from './components/NewsList'
import ScrollContainer from 'react-indiana-drag-scroll'

export class Docs extends Component {

    componentDidMount() {
        document.title = this.props.title
        this.props.GetDocuments()
    }

    componentWillUnmount() {
        this.props.closeNavbar()
    }

    scrollTo = (cat) => {
        let el = document.getElementById(cat)
        let offsetTop = el.offsetTop
        window.scrollTo({
            top: offsetTop - 150,
            behavior: 'smooth'
        })

        el.style.backgroundColor = '#ccd'
        setTimeout(() => {
            el.style.backgroundColor = '#fff'
        }, 1000);
    }

    returnCategories(){

        const {isLoading, categories} = this.props

        if(isLoading || categories.length === 0){
            return <Fragment/>
        }

        const categoryHashLink = (category, index) => <a key={index} className="document-hash-link" 
            onClick={() => this.scrollTo(category)}> {`${category[0].toUpperCase()}${category.substr(1)}`}</a>

        return categories.map((cat, index) => {
            return categoryHashLink(cat, index)
        })

    }

    returnDocumentByCategory(category){

        const {docslist} = this.props

        const docsByCat = docslist.filter((doc) => {
            return doc.category === category
        })

        let docsBySubcategory = {
            "Без подкатегории": []
        }

        docsByCat.map((doc) => {

            const s = doc.subcategory

            if (!s){
                docsBySubcategory["Без подкатегории"].push(doc)
                return
            }

            if(docsBySubcategory.hasOwnProperty(s)){
                docsBySubcategory[s].push(doc)
            } else {
                docsBySubcategory[s] = [doc]
            }

            return 

        })

        const subcategories = Object.keys(docsBySubcategory)

        return subcategories.map((key, index) => {

            const docsArray = docsBySubcategory[key]
            const subcategory_name = key === "Без подкатегории" ? null : <h4>{`${key[0].toUpperCase()}${key.substr(1)}`}</h4>

            if (docsArray.length === 0){
                return <Fragment key={index}/>
            }
            
            return <Fragment key={index} index={index}>
                {subcategory_name}
                <div className="row no-gutters">
                    {docsArray.map((doc, index) => {
                        return <Document doc={doc} key={index} index={index}/>
                    })}
                </div>
            </Fragment>
        })

    }

    returnDocumentsList(){

        const {isLoading, categories, docslist} = this.props

        const LoadingElement = <p>Загрузка</p>

        if(isLoading || categories.length === 0){
            return LoadingElement
        }

        if(docslist.length === 0){
            return <p>Регламентирующие документы не найдены</p>
        }

        return categories.map((category, index) => {
            return <div id={category} key={index} index={index} class="scroll-container">
                <h2>{`${category[0].toUpperCase()}${category.substr(1)}`}</h2>
                {this.returnDocumentByCategory(category)}
            </div>
        })

    }

    render() {
        return (<Fragment>
            <section id="documents_list">
                <div className="container">
                    <h1 class="h1">Регла&shy;мен&shy;ти&shy;рующие доку&shy;менты</h1>
                    <nav id="categories-scroll-list">
                        <ScrollContainer vertical={false}>
                            <div className="d-flex p-2">{this.returnCategories()}</div>
                        </ScrollContainer>
                    </nav>
                    <hr/>
                    <div id="documents-scroll-list">
                        {this.returnDocumentsList()}
                    </div>
                </div>
            </section>
        </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.api.docs.docslist.isLoading,
    categories: state.api.docs.docslist.categories,
    docslist: state.api.docs.docslist.docslist,
})

export default connect(
    mapStateToProps,
    { closeNavbar, GetDocuments }
)(Docs)

export const Document = connect(
    state=>({domain: state.location.domain})
    ,null
    )(({doc, index, domain}) => {

    const { title, subcategory, path, document, date } = doc

    return <div className="col-sm-6 col-12">
        <a index={index} href={document ? `http://${domain}${document}` : path }
            className={`document-link ${subcategory ? '' : 'w-cat'}`}
            target="_blank" rel="noopener noreferrer"
        >
            <div className="text-indoc">
                <span style={{ fontWeight: "600" }}>{title}</span>
                {date && <small>Дата утверждения: {toDate(date)}</small>}
            </div>
        </a>
    </div>
})