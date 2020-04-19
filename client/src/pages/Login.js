import React, {Component} from 'react'
import { closeNavbar } from '../redux/actions/navbarActions'

import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {clearInfo} from '../redux/actions/infoActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {login} from '../redux/actions/authActions'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'

export class Login extends Component{

    state={
        email: '',
        password: '',
        msg: null,
        loading: false
    }
    
    componentDidMount() {
        document.title = this.props.title
    }

    componentWillUnmount(){
        this.props.closeNavbar()
    }
    
    static propTypes = {
    isAuthenticated: PropTypes.bool,
    info: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearInfo: PropTypes.func.isRequired
    }
    
    componentDidUpdate(prevProps){
        const {info, loading} = this.props
        // debugger;
        if(info !== prevProps.info || loading !==  prevProps.loading){

            // check for login error
            if(info.id === "LOGIN_FAIL"){
                this.setState({
                    msg: info.msg,
                    loading: loading
                })
                } else {
                this.setState({
                    msg:null,
                    loading: loading
                })
            }
        }
    }
    
    onChange = e =>{
        this.setState({ [e.target.name] : e.target.value })
    }

    onSubmit = e =>{
        e.preventDefault()
        this.props.clearInfo()
        const {email, password} = this.state
            
        //   login user
        const User = {
            email,
            password
        }

        this.props.login(User)
    }

    render(){
        return( 
            <div className="container-md container-fluid">
                <h2 className="text-center mb-3">Вход в систему</h2>
                <div className="row no-gutters justify-content-center">
                    { this.state.msg && 
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <span> { this.state.msg } </span>
                    </div> }
                    <div className="w-100"/>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group row">
                            <label for="inputEmail" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input 
                                type="email" 
                                className="form-control" 
                                id="inputEmail" 
                                placeholder="Введите email"
                                name="email"
                                onChange={this.onChange}
                                suggested= "current-password"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="inputPassword" className="col-sm-2 col-form-label">Пароль</label>
                            <div className="col-sm-10">
                                <input 
                                type="password" 
                                className="form-control" 
                                id="inputPassword" 
                                placeholder="Введите пароль"
                                name="password"
                                onChange={this.onChange}/>
                            </div>
                        </div>
                        <div style={{display:"flex", justifyContent: "space-between"}}>
                            <button 
                            className="btn btn-info" 
                            type="submit"
                            disabled={this.state.loading}
                            >
                                {this.state.loading?
                                    <div className="spinner-border spinner-border-sm" role="status">
                                        <span className="sr-only">Загрузка...</span>
                                    </div>
                                :<>Войти <FontAwesomeIcon icon={faSignInAlt} /></>}
                                </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.isLoading,
  info: state.info 
})

export default connect(
  mapStateToProps,
  { login, clearInfo, closeNavbar }
)(Login)