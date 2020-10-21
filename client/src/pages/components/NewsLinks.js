import React, {Fragment, memo, PureComponent} from 'react'
import { connect } from 'react-redux'
import { getNewsLinksByType } from '../../redux/actions/newsLinksActions'

export class NewsLinksList extends PureComponent{

  state={
    isLoading: this.props.isLoading || false,
    isVisible: this.props.isVisible || false,
    type: this.props.type || null
  }

  componentDidUpdate(prevProps){
  
    const {isVisible, type} = this.props

    if( isVisible!==prevProps.isVisible ){
      this.setState({isVisible})
    }

    if(type !== prevProps.type){
      this.props.getNewsLinksByType(type)
    }
  
  }

  renderNewsLinksList(){

    const {isVisible, isLoading} = this.state

    const {newsLinks} = this.props    

    if(!isVisible || !newsLinks || newsLinks.length === 0){
      return <Fragment/>
    }

    if(isLoading){
      return <p>Загрузка</p>
    }

    const NewsLinksListMap = <div id="news-links-list-block">
      {newsLinks.map((link, index)=>{
        return <NewsLinkElement 
          key={link._id}
          index={index}
          link={link}
          />
      })}
    </div>

    return <section id="news-links-list" >
      {NewsLinksListMap}
    </section>

  }

  render(){return this.renderNewsLinksList()}
}

const NewsLinkElement = memo(({link})=>{

  const {name, path} = link

  return <a className="news-link-element" target="_blank" ref="noopener noreferrer"href={path}>{name}</a>
})

const mapStateToProps = state => ({
  type: state.api.news.newslist.type,
  newsLinks: state.api.news.newslinks.NewsLinksList,
  isLoading: state.api.news.newslinks.isLoading
})

export default connect(
  mapStateToProps,
  {getNewsLinksByType}
)(NewsLinksList)

const links = [
  {
      name: "РФФИ — активные конкурсы Российского фонда фундаментальных исследований",
      path: "http://www.rfbr.ru/rffi/ru/contest"
  },
  {
      name: "4science — актуальные гранты и конкурсы для ученых и предпринимателей",
      path: "https://4science.ru/"
  },
  {
      name: "Grantist — гранты, доступные для студентов, молодых ученых и преподавателей из стран СНГ",
      path: "http://grantist.com/scholarships/vse-stipendii/"
  },
  {
      name: "RSCI.RU (INTELICA) — актуальная деловая информация",
      path: "http://www.rsci.ru/grants/"
  },
  {
      name: "Инновационный центр \"Сколково\"",
      path: "https://sk.ru"
  },
  {
      name: "РНФ — конкурсы Российского научного фонда",
      path: "http://rscf.ru/ru/contests/"
  },
  {
      name: "РВК — Российская венчурная компания",
      path: "https://www.rvc.ru/"
  },
  {
      name: "Росмолодежь — Федеральное агенство по делам молодежи",
      path: "https://fadm.gov.ru/"
  },
]