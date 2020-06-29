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
            top: offsetTop - 100,
            behavior: 'smooth'
        })
    }

    render() {
        const { docslist, categories, subcategories, isLoading } = this.props.Docs
        return (<Fragment>
            {/* ЗАГОЛОВОК */}
            <Fade>
                <section id="title_main" className="documents">
                    <div className="container-lg container-fluid" style={{ height: "inherit" }}>
                        <div className="row no-gutters pb-2">
                            <div className="title_text mt-4 w-100" >
                                <h1 className="title">Ре&shy;гла&shy;мен&shy;ти&shy;ру&shy;ю&shy;щие до&shy;ку&shy;мен&shy;ты</h1>
                                {!isLoading ? categories.length !== 0 && <h6>Выберите интересующую Вас категорию:</h6> : <h6>Пожалуйста подождите...</h6>}
                            </div>
                            {!isLoading && categories && categories.map(cat => {
                                return (
                                    <a key={cat} className="btn col-md-4 col-sm-6 col-xs-12"
                                        style={{ color: "white" }} onClick={() => this.scrollTo(cat)}>
                                        <div className="category-doc-btn">
                                            <Icon icon={documentwithtextIcon} height="24" style={{ marginBottom: "5px", marginRight: "5px" }} />{cat[0].toUpperCase() + cat.substr(1)}
                                        </div>
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                    {!isLoading && <img className="arrow_down" onClick={()=>{
                    window.scrollTo({top: window.innerHeight-80, behavior: 'smooth'})
                }} src="/svg/DOWN_ARROW.svg" alt="Листать вниз"/>}
                </section>
            </Fade>
            <section id="documents_list">
                <div className="container">
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
                        }) : <h1>Загрузка</h1>}
                    {/* в цикле по категориям фильтровать дату по категории */}
                </div>
            </section>
        </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    Docs: state.api.docs.docslist
})

export default connect(
    mapStateToProps,
    { closeNavbar, GetDocuments }
)(Docs)

const Document = ({ title, cat, path, document, date }) => {
    return (
        <a href={`${document || path}`}
            className={`document-link ${cat ? 'w-cat' : ''}`}
            target="_blank" rel="noopener noreferrer"
        >
            <div className="text-indoc">
                <span style={{ fontWeight: "600" }}>{title}</span>
                {date && <small>Дата утверждения: {toDate(date)}</small>}
            </div>
        </a>
    )
}