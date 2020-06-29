import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './styles/Header.scss'
import {openNavbar} from '../redux/actions/navbarActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import "./styles/Header.scss"

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
                    style={{cursor:"pointer"}}
                    >

                        <span>
                        <svg id="opennavbar_svgicon" width="36" height="22" viewBox="0 0 25 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5844 11H1.58441C1.03441 11 0.584412 10.5875 0.584412 10.0833C0.584412 9.57917 1.03441 9.16667 1.58441 
                            9.16667H12.5844C13.1344 9.16667 13.5844 9.57917 13.5844 10.0833C13.5844 10.5875 13.1344 11 12.5844 11ZM12.5844 6.41667H4.58441C4.03441 
                            6.41667 3.58441 6.00417 3.58441 5.5C3.58441 4.99583 4.03441 4.58333 4.58441 4.58333H12.5844C13.1344 4.58333 13.5844 4.99583 13.5844 
                            5.5C13.5844 6.00417 13.1344 6.41667 12.5844 6.41667ZM13.5844 0.916667C13.5844 1.42083 13.1344 1.83333 12.5844 1.83333H1.58441C1.03441 
                            1.83333 0.584412 1.42083 0.584412 0.916667C0.584412 0.4125 1.03441 0 1.58441 0H12.5844C13.1344 0 13.5844 0.4125 13.5844 0.916667Z" fill="#354ED1"/>
                            <path d="M18.172 5.58202L15.292 8.46202C14.902 8.85202 14.912 9.49202 15.292 9.88202C15.682 10.272 16.312 10.272 16.702 9.88202L20.292 
                                6.29202C20.3847 6.19951 20.4583 6.08962 20.5085 5.96865C20.5586 5.84767 20.5845 5.71799 20.5845 5.58702C20.5845 5.45605 20.5586 
                                5.32637 20.5085 5.2054C20.4583 5.08442 20.3847 4.97453 20.292 4.88202L16.702 1.29202C16.6094 1.19944 16.4995 1.126 16.3786 
                                1.07589C16.2576 1.02579 16.128 1 15.997 1C15.8661 1 15.7364 1.02579 15.6155 1.07589C15.4945 1.126 15.3846 1.19944 15.292 
                                1.29202C15.1994 1.3846 15.126 1.49451 15.0759 1.61548C15.0258 1.73644 15 1.86609 15 1.99702C15 2.12795 15.0258 2.2576 
                                15.0759 2.37856C15.126 2.49953 15.1994 2.60944 15.292 2.70202L18.172 5.58202Z" fill="#354ED1">
                                <animate attributeName="d" dur="0.2s" begin="opennavbar_svgicon.mouseenter" repeatCount="1" fill="freeze" 
                                to="M22.172 5.58202L19.292 8.46202C18.902 8.85202 18.912 9.49202 19.292 9.88202C19.682 10.272 20.312 10.272 20.702 9.88202L24.292 
                                6.29202C24.3847 6.19951 24.4582 6.08962 24.5084 5.96865C24.5586 5.84767 24.5844 5.71799 24.5844 5.58702C24.5844 5.45605 24.5586 5.32637 
                                24.5084 5.2054C24.4582 5.08442 24.3847 4.97453 24.292 4.88202L20.702 1.29202C20.6094 1.19944 20.4995 1.126 20.3785 1.07589C20.2575 1.02579 
                                20.1279 1 19.997 1C19.866 1 19.7364 1.02579 19.6154 1.07589C19.4945 1.126 19.3846 1.19944 19.292 1.29202C19.1994 1.3846 19.1259 1.49451 
                                19.0758 1.61548C19.0257 1.73644 18.9999 1.86609 18.9999 1.99702C18.9999 2.12795 19.0257 2.2576 19.0758 2.37856C19.1259 2.49953 19.1994 
                                2.60944 19.292 2.70202L22.172 5.58202Z"
                                from="M18.172 5.58202L15.292 8.46202C14.902 8.85202 14.912 9.49202 15.292 9.88202C15.682 10.272 16.312 10.272 16.702 9.88202L20.292 
                                6.29202C20.3847 6.19951 20.4583 6.08962 20.5085 5.96865C20.5586 5.84767 20.5845 5.71799 20.5845 5.58702C20.5845 5.45605 20.5586 
                                5.32637 20.5085 5.2054C20.4583 5.08442 20.3847 4.97453 20.292 4.88202L16.702 1.29202C16.6094 1.19944 16.4995 1.126 16.3786 
                                1.07589C16.2576 1.02579 16.128 1 15.997 1C15.8661 1 15.7364 1.02579 15.6155 1.07589C15.4945 1.126 15.3846 1.19944 15.292 
                                1.29202C15.1994 1.3846 15.126 1.49451 15.0759 1.61548C15.0258 1.73644 15 1.86609 15 1.99702C15 2.12795 15.0258 2.2576 
                                15.0759 2.37856C15.126 2.49953 15.1994 2.60944 15.292 2.70202L18.172 5.58202Z"/>
                                <animate attributeName="d" dur="0.2s" begin="opennavbar_svgicon.mouseleave" repeatCount="1" fill="freeze" 
                                from="M22.172 5.58202L19.292 8.46202C18.902 8.85202 18.912 9.49202 19.292 9.88202C19.682 10.272 20.312 10.272 20.702 9.88202L24.292 
                                6.29202C24.3847 6.19951 24.4582 6.08962 24.5084 5.96865C24.5586 5.84767 24.5844 5.71799 24.5844 5.58702C24.5844 5.45605 24.5586 5.32637 
                                24.5084 5.2054C24.4582 5.08442 24.3847 4.97453 24.292 4.88202L20.702 1.29202C20.6094 1.19944 20.4995 1.126 20.3785 1.07589C20.2575 1.02579 
                                20.1279 1 19.997 1C19.866 1 19.7364 1.02579 19.6154 1.07589C19.4945 1.126 19.3846 1.19944 19.292 1.29202C19.1994 1.3846 19.1259 1.49451 
                                19.0758 1.61548C19.0257 1.73644 18.9999 1.86609 18.9999 1.99702C18.9999 2.12795 19.0257 2.2576 19.0758 2.37856C19.1259 2.49953 19.1994 
                                2.60944 19.292 2.70202L22.172 5.58202Z"
                                to="M18.172 5.58202L15.292 8.46202C14.902 8.85202 14.912 9.49202 15.292 9.88202C15.682 10.272 16.312 10.272 16.702 9.88202L20.292 
                                6.29202C20.3847 6.19951 20.4583 6.08962 20.5085 5.96865C20.5586 5.84767 20.5845 5.71799 20.5845 5.58702C20.5845 5.45605 20.5586 
                                5.32637 20.5085 5.2054C20.4583 5.08442 20.3847 4.97453 20.292 4.88202L16.702 1.29202C16.6094 1.19944 16.4995 1.126 16.3786 
                                1.07589C16.2576 1.02579 16.128 1 15.997 1C15.8661 1 15.7364 1.02579 15.6155 1.07589C15.4945 1.126 15.3846 1.19944 15.292 
                                1.29202C15.1994 1.3846 15.126 1.49451 15.0759 1.61548C15.0258 1.73644 15 1.86609 15 1.99702C15 2.12795 15.0258 2.2576 
                                15.0759 2.37856C15.126 2.49953 15.1994 2.60944 15.292 2.70202L18.172 5.58202Z"/>
                            </path>
                        </svg>
                        </span>
                    </a>
                    <Link to="/" className="navbar-brand">
                    <svg id="triple-helix-header-logo" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32.185 8.927C28.961 13.538 17.634 17.927 14.208 21.08C10.108 24.851 13 28.5 13 28.5" stroke="white" stroke-width="4" stroke-linecap="round"/>
                        <path d="M13.5 35C15.433 35 17 33.433 17 31.5C17 29.567 15.433 28 13.5 28C11.567 28 10 29.567 10 31.5C10 33.433 11.567 35 13.5 35Z" fill="#98248F"/>
                        <path d="M13.5 35.25C15.5711 35.25 17.25 33.5711 17.25 31.5C17.25 29.4289 15.5711 27.75 13.5 27.75C11.4289 27.75 9.75 29.4289 9.75 31.5C9.75 33.5711 11.4289 35.25 13.5 35.25Z" stroke="white" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M32.185 8.927C28.961 13.538 17.634 17.927 14.208 21.08C10.108 24.851 13 28.5 13 28.5" stroke="#98248F" stroke-width="3" stroke-linecap="round"/>
                        <path d="M24.5 9C20.5 13 12.855 13.803 12.219 18.808C11.583 23.813 21.928 26.708 22.485 28.946" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M23.5 35.25C25.5711 35.25 27.25 33.5711 27.25 31.5C27.25 29.4289 25.5711 27.75 23.5 27.75C21.4289 27.75 19.75 29.4289 19.75 31.5C19.75 33.5711 21.4289 35.25 23.5 35.25Z" stroke="white" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M23.5 35C25.433 35 27 33.433 27 31.5C27 29.567 25.433 28 23.5 28C21.567 28 20 29.567 20 31.5C20 33.433 21.567 35 23.5 35Z" fill="#98248F"/>
                        <path d="M24.5 9C20.472 13.073 12.855 13.803 12.219 18.808C11.583 23.813 21.928 26.708 22.485 28.946" stroke="#98248F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M32.5 35.25C34.5711 35.25 36.25 33.5711 36.25 31.5C36.25 29.4289 34.5711 27.75 32.5 27.75C30.4289 27.75 28.75 29.4289 28.75 31.5C28.75 33.5711 30.4289 35.25 32.5 35.25Z" stroke="white" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14.093 9.22101C9.181 13.698 12.993 16.94 18.476 19.693C20.667 20.907 29.206 25.08 31.276 28.293" stroke="white" stroke-width="4" stroke-linecap="round"/>
                        <path d="M32.5 35C34.433 35 36 33.433 36 31.5C36 29.567 34.433 28 32.5 28C30.567 28 29 29.567 29 31.5C29 33.433 30.567 35 32.5 35Z" fill="#98248F"/>
                        <path d="M14.093 9.22101C9.181 13.698 12.993 16.94 18.476 19.693C20.667 20.907 29.206 25.08 31.276 28.293" stroke="#98248F" stroke-width="3" stroke-linecap="round"/>
                        <circle id="triple-helix-header-logo-circlebg" cx="22" cy="22" r="22" fill="#98248F" fillOpacity="0">
                            <animate id="triple-helix-header-logo-circlebg-start-opacity" repeatCount="1" dur="0.3s" attributeName="fill-opacity" fill="freeze" from="0" to="0.25" begin="mouseenter"/>
                            <animate id="triple-helix-header-logo-circlebg-end-opacity"  repeatCount="1" dur="0.3s" attributeName="fill-opacity" fill="freeze" from="0.25" to="0" begin="mouseleave"/>
                            <animate repeatCount="indefinite" dur="3.5s" attributeName="r" values="22;20;22;19;22"/>
                        </circle>
                    </svg>



                        {/* <img src="/svg/FIT_LOGO_NAV.svg"/> */}
                    </Link>
                    <Link to="/search">
                    <svg id="search_button" width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="9" stroke="#354ED1" stroke-width="2.4">
                            <animate attributeName="cx" begin="search_button.mouseenter" fill="freeze" from="10" to="12" dur="0.3s"/>
                            <animate attributeName="cx" begin="search_button.mouseleave" fill="freeze" from="12" to="10" dur="0.3s"/>
                            
                            <animate attributeName="cy" begin="search_button.mouseenter" fill="freeze" from="10" to="12" dur="0.3s"/>
                            <animate attributeName="cy" begin="search_button.mouseleave" fill="freeze" from="12" to="10" dur="0.3s"/>

                            <animate attributeName="r" begin="search_button.mouseenter" fill="freeze" from="9" to="11" dur="0.3s"/>
                            <animate attributeName="r" begin="search_button.mouseleave" fill="freeze" from="11" to="9" dur="0.3s"/>
                        </circle>
                        <line x1="16.4142" y1="17" x2="27" y2="27.5858" stroke="#354ED1" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                            <animate attributeName="x1" from="16.4142" to="20.4142" begin="search_button.mouseenter" fill="freeze" dur="0.3s"/>
                            <animate attributeName="x1" to="16.4142" from="20.4142" begin="search_button.mouseleave" fill="freeze" dur="0.3s"/>
                            <animate attributeName="y1" from="17" to="21" begin="search_button.mouseenter" fill="freeze" dur="0.3s"/>
                            <animate attributeName="y1" to="17" from="21" begin="search_button.mouseleave" fill="freeze" dur="0.3s"/>
                        </line>
                    </svg>
                        {/* <Icon icon={faUserCircle} size="lg" style={{cursor:"pointer", color: "darkblue"}}/> */}
                    </Link>
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