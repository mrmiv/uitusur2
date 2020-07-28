import React, { Component, Fragment } from 'react'
import { closeNavbar } from '../redux/actions/navbarActions'
import { GetDocuments } from '../redux/actions/docsActions'
import Fade from 'react-reveal/Fade'
import documentwithtextIcon from '@iconify/icons-fxemoji/documentwithtext';
import { Icon } from "@iconify/react"
import { connect } from 'react-redux'
import './styles/Docs.scss'
import { toDate } from './components/NewsList'

export class Docs extends Component {

    componentDidMount() {
        document.title = this.props.title
        this.props.GetDocuments()
    }

    componentWillUnmount() {
        this.props.closeNavbar()
    }

    scrollTo = (cat) => {
        // console.log(cat);
        let el = document.getElementById(cat)
        let offsetTop = el.offsetTop
        window.scrollTo({
            top: offsetTop - 160,
            behavior: 'smooth'
        })
    }

    render() {
        const { docslist, categories, subcategories, isLoading } = this.props.Docs
        return (<Fragment>
            {/* ЗАГОЛОВОК */}
            <section id="documents_list">
                <div className="container">
                <h1>Регламентирующие документы</h1>
                <nav id="categories-scroll-list">
                    {!isLoading && categories && categories.map(cat => {
                        return <a key={cat} className="document-hash-link" onClick={() => this.scrollTo(cat)}> {cat[0].toUpperCase() + cat.substr(1)}</a>
                        })}
                </nav>
                <hr/>
                <div id="documents-scroll-list">
                    {!isLoading ? (categories && subcategories && docslist) &&
                        categories.map((cat, index) => {
                            return (
                                <Fragment key={index}>
                                    <h2 id={cat}>{cat[0].toUpperCase() + cat.substr(1)}</h2>
                                    {(docslist.find((doc) => {
                                        return doc.category === cat && !doc.subcategory
                                    })) ? <div className="row no-gutters">
                                            {docslist.map((doc) => {
                                                if (doc.category === cat && !doc.subcategory) {
                                                    return <div key={index} className="col-sm-6 col-12">
                                                        <Document cat title={doc.title} path={doc.path} document={doc.document} date={doc.date} />
                                                    </div>
                                                }
                                            })}</div>
                                        : null}
                                    {subcategories.map((subcat, index) => {
                                        if (docslist.find((item) => {
                                            return item.category === cat && item.subcategory === subcat
                                        })) {
                                            return (<Fragment key={index}>
                                                <h4>{subcat[0].toUpperCase() + subcat.substr(1)}</h4>
                                                <div className="row no-gutters">
                                                    {docslist.map((doc, index) => {
                                                        if (doc.category === cat && doc.subcategory === subcat) {
                                                            return <div key={index} className="col-sm-6 col-12">
                                                                <Document title={doc.title} path={doc.path} document={doc.document} date={doc.date} />
                                                            </div>
                                                        }
                                                    })}
                                                </div>
                                            </Fragment>
                                            )
                                        }
                                    })}
                                </Fragment>
                            )
                        }) : <p>Загрузка...</p>}  
                    </div>
                    {/* в цикле по категориям фильтровать дату по категории */}
                </div>
            </section>
        </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    Docs: state.api.docs.docslist,
})

export default connect(
    mapStateToProps,
    { closeNavbar, GetDocuments }
)(Docs)

const Document = connect(
    state=>({domain: state.location.domain})
    ,null
    )(({ title, cat, path, document, date, domain }) => {
    return (
        <a href={document ? `http://${domain}${document}` : path }
            className={`document-link ${cat ? 'w-cat' : ''}`}
            target="_blank" rel="noopener noreferrer"
        >
            <div className="text-indoc">
                <span style={{ fontWeight: "600" }}>{title}</span>
                {date && <small>Дата утверждения: {toDate(date)}</small>}
            </div>
        </a>
    )
})