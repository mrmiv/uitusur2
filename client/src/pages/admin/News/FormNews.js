import React, {Component} from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { connect } from 'react-redux'
import { Editor } from '@tinymce/tinymce-react';
import {clearInfo} from '../../../redux/actions/infoActions'
import {ReadNews} from '../../../redux/actions/newsActions'
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Link, Prompt, withRouter } from 'react-router-dom'

export class NewsForm extends Component{

    state={
        id: null,

        title: '',
        body: '',
        type: null,
        site: '',
        city: '',
        deadline: '',
        users: '',
        period: '',
        grant: '',

        pin: false,
        send_to_email: false,
        
        blocked: false
        // msg: null,
        // loading: false
    }

    componentWillUnmount(){
        this.props.closeNavbar()
    }

    componentDidMount(){
        document.title = this.props.title
        const id = this.props.match.params.id
        if(id){
            this.props.ReadNews(id)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const id = this.props.match.params.id

        if(id){

            if(id !== prevState.id){
                this.setState({id})
            }
            const {News} = this.props.news
            
            if (News !== prevProps.news.News) {
                this.setState({ 
                    title: News.title,
                    body: News.body,
                    type: News.type,
                    site: News.site,
                    city: News.city,
                    deadline: News.deadline,
                    users: News.users,
                    grant: News.grant,
                    pin:News.pin,
                    period:News.period
                });
            }
        }
    }

    setNewsType = e => {
        const type = e.target.value
        this.setState({type})
    }

    changeInput = e =>{
        const field = e.target.name
        this.setState({[field]: e.target.value})
        if (!this.state.blocked){
            this.setState({blocked:true})
        }
    }
    changeBody = body => {
        this.setState({body})
        if (!this.state.blocked){
            this.setState({blocked:true})
        }
    }

    submitForm = e => {
        e.preventDefault()
        this.props.clearInfo()
        const id = this.state.id

        // const {firstname,
        // secondname,
        // lastname,
        // post,
        // degree,
        // path,
        // rank,
        // worktime} = this.state

        // const Staff = {firstname:firstname.trim(),
        //     secondname:secondname.trim(),
        //     lastname:lastname.trim(),
        //     post: post.trim(),
        //     degree:degree.trim(),
        //     rank:rank.trim(),
        //     path:path.trim(),
        //     worktime}

        // console.log(Staff);

        // if(id){
        //     this.props.patchStaff(id,Staff)
        // } else {
        //     this.props.postStaff(Staff)
        // }
    }

    render(){
        const {type} = this.state

        return(
            <div className="container-md container-fluid">
                <Prompt
                    when={this.state.blocked}
                    message={() =>
                    `Вы действительно хотите покинуть эту страницу?`
                    }
                />
                <div className="row no-gutters justify-content-between">
                <Link to="/admin/news"><Icon icon={faArrowAltCircleLeft} size="lg"/> Назад</Link>
                <form className="w-100 mt-3" onSubmit={this.submitForm}>
                    <div className="form-group">
                        <label htmlFor="title-input">Заголовок</label>
                        <input onChange={this.changeInput} type="text" className="form-control" 
                        name="title" id="title-input" placeholder="Иван Иванов вступил в профсоюз ТУСУРа" value={this.state.title}/>
                    </div>
                    <div className="form-row">
                        <div className="col form-group">
                            <label htmlFor="users-input">Для кого</label>
                            <input onChange={this.changeInput} type="text" className="form-control" 
                            name="users" id="users-input" placeholder="Бакалавриат, 057, РФ" value={this.state.users}/>
                        </div>
                        <div className="col form-group">
                            <label htmlFor="type-input">Категория</label>
                            <select onChange={this.changeInput} type="text" className="form-control" 
                            name="type" id="type-input">
                                {!type && <option selected>Выберите категорию...</option> }
                                <option name="Объявления кафедры" value={1}>Объявления кафедры</option>
                                <option name="Стипендии и гранты" value={2}>Стипендии и гранты</option>
                                <option name="Конференции" value={3}>Конференции</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col form-group">
                            <label htmlFor="deadline-input">Крайний срок</label>
                            <input onChange={this.changeInput} type="date" className="form-control" 
                            name="deadline" id="deadline-input" placeholder="21.02.2020 12:31" value={this.state.deadline}/>
                        </div>
                        <div className="col form-group">
                            <label htmlFor="doc-input">Вложения</label>
                            <input onChange={this.changeInput} type="file" multiple className="form-control-file" 
                            name="doc" id="doc-input" value={this.state.doc}/>
                        </div>
                    </div>
                    {type && type!==1 &&
                    <div className="form-row">
                        <div className="col form-group">
                            <label htmlFor="city-input">Место проведения</label>
                            <input onChange={this.changeInput} type="text" className="form-control" 
                            name="city" id="city-input" placeholder="Томск" value={this.state.city}/>
                        </div>
                        <div className="col form-group">
                            <label htmlFor="period-input">{type == 2? "Период действия" : "Сроки проведения"}</label>
                            <input onChange={this.changeInput} type="text" className="form-control" 
                            name="period" id="period-input" placeholder="дд.мм.ггг / Весенний семестр" value={this.state.period}/>
                        </div>
                        {type == 2 && 
                        <div className="col form-group">
                            <label htmlFor="grant-input">Сумма стипендии/гранта (₽)</label>
                            <input onChange={this.changeInput} type="text" className="form-control" 
                            name="grant" id="grant-input" placeholder="5000 ₽" value={this.state.grant}/>
                        </div> }
                        {type == 3 && 
                        <div className="col form-group">
                            <label htmlFor="site-input">Сайт конференции</label>
                            <input onChange={this.changeInput} type="text" className="form-control" 
                            name="site" id="site-input" placeholder="http://" value={this.state.site}/>
                        </div> }
                    </div>}
                    <div className="form-group">
                        <label htmlFor="body-input">Сообщение</label>
                        <Editor
                        initialValue={this.state.body}
                        init={{
                          height: 400,
                          menubar: false,
                          plugins: [
                            'advlist autolink lists link charmap print preview anchor',
                            'searchreplace visualblocks code',
                            'insertdatetime table paste code help wordcount'
                          ],
                          toolbar:
                            'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help'
                        }}
                        onEditorChange={this.changeBody}
                        id="body-input" placeholder="Иван Иванов вступил в профсоюз ТУСУРа"/>
                    </div>
                    <div className="w-100 mt-2 text-right">
                        <button className="btn btn-success mr-0" type="submit"
                        disabled={this.state.loading}>{this.state.id? "Обновить новость" :"Добавить новость"}</button>
                    </div>      
                </form>
                </div>
            </div>
        )
    }
} 

const mapStateToProps = state => ({
    news: state.api.news.news,
    info: state.info
})
  
export default withRouter(connect(
    mapStateToProps,
    { closeNavbar, clearInfo, ReadNews }
)(NewsForm))