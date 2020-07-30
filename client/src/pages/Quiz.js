import React, { Component } from 'react'
import store from '../store'
import { closeNavbar } from '../redux/actions/navbarActions'
import { getquiz } from '../redux/actions/data_actions/quizActions'
import { connect } from 'react-redux'

export class Quiz extends Component {
    componentDidMount() {
        document.title = this.props.title
        this.props.getquiz()
    }

    componentWillUnmount() {
        store.dispatch(closeNavbar())
    }
    render() {
        const { isLoading } = this.props
        return (
            <div className="container-md container-fluid">
                <h1>Опросы для студентов</h1>
                {!isLoading ? (this.props.quiz && <iframe
                    src={`${this.props.quiz}`}
                    width="100%" height={window.innerHeight - 100} frameBorder="0" marginHeight="0" marginWidth="0" />) || <h2 className="w-100 mt-2 text-center">Опросов нет :)</h2> :
                    <p className="w-100 text-center">Загрузка</p>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    quiz: state.api.quiz.quiz,
    isLoading: state.api.quiz.isLoading,
})
export default connect(
    mapStateToProps,
    { getquiz }
)(Quiz)