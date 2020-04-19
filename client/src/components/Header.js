import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './styles/Header.scss'
import {openNavbar} from '../redux/actions/navbarActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import { faIndent, faUserCircle } from '@fortawesome/free-solid-svg-icons';

export class Header extends Component{

    static propTypes = {
        openNavbar: PropTypes.func.isRequired,
    }

    OpenNavbar = () => {
        this.props.openNavbar()
    }

    render(){
        return(
            <nav id="Header" className="navbar fixed-top navbar-light bg-light shadow-sm">
                <div className="container-md container-fluid">
                    <a
                    onClick={this.OpenNavbar}
                    style={{cursor:"pointer", fontSize:"24px"}}
                    >
                        <Icon icon={faIndent} />
                    </a>
                    <Link to="/" className="navbar-brand">
                        <img src="/svg/FIT_LOGO_NAV.svg"/>
                    </Link>
                    <Link to="/login"><Icon icon={faUserCircle} size="lg" style={{cursor:"pointer", color: "darkblue"}}/></Link>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => ({
  open: state.nav.open
})

export default connect(
  mapStateToProps,
  { openNavbar }
)(Header)