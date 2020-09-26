import React, {Fragment, memo, PureComponent} from 'react'

export class NewsLinksList extends PureComponent{

  state={
    isLoading: false,
    isVisible: this.props.isVisible || false,
    type: this.props.type || null
  }

  componentDidUpdate(prevProps){
  
    const {isVisible} = this.props

    if(isVisible!==prevProps.isVisible){
      this.setState({isVisible})
    }
  
  }

  renderNewsLinksList(){
    const {isVisible, isLoading} = this.state

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

    if(!isVisible){
      return <Fragment/>
    }

    if(isLoading){
      return <p>Загрузка ссылок</p>
    }

    const NewsLinksListMap = <div id="news-links-list-block">
      {links.map((link, index)=>{
        return <NewsLinkElement 
          key={index}
          index={index}
          name={link.name}
          path={link.path}
          />
      })}
    </div>

    return <section id="news-links-list" >
      {NewsLinksListMap}
    </section>

  }

  render(){return this.renderNewsLinksList()}
}

const NewsLinkElement = memo(({name, path})=>{
  return <a className="news-link-element" href={path}>{name}</a>
})