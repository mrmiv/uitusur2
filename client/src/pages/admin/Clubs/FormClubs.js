import React, { Component } from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { connect } from 'react-redux'
import { getOneClub, postClub, patchClub } from '../../../redux/actions/data_actions/clubsAction'
import { clearInfo } from '../../../redux/actions/infoActions'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Link, Prompt, withRouter } from 'react-router-dom'
import cyrillicToTranslit from 'cyrillic-to-translit-js'

export class ClubsForm extends Component {

    state = {
        id: null,

        name: "",
        image: null,
        path: "",

        blocked: false,
        msg: null
    }

    componentWillUnmount() {
        this.props.closeNavbar()
    }

    componentDidMount() {
        document.title = this.props.title
        const id = this.props.match.params.id
        if (id) {
            this.props.getOneClub(id)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const id = this.props.match.params.id
        const { msg } = this.props.info

        if (id) {
            console.log(this.props.Club);

            if (id !== prevState.id) {
                this.setState({ id })
            }
            const { Club } = this.props

            if (Club !== prevProps.Club) {

                this.setState({
                    name: Club.name,
                    path: Club.path
                });
            }
        }
        if (msg !== prevProps.info.msg) {
            this.setState({ msg })
        }
    }

    changeInput = e => {
        const field = e.target.name
        this.setState({ [field]: e.target.value })
        if (!this.state.blocked) {
            this.setState({ blocked: true })
        }
    }

    handleFile = e => {
        let file = e.target.files[0]
        console.log(file);

        Object.defineProperty(file, 'name', {
            writable: true,
            value: cyrillicToTranslit().transform(file["name"], "-")
        });
        this.setState({ image: file })
    }

    submitForm = e => {
        e.preventDefault()
        window.scrollTo(0, 0)
        this.props.clearInfo()
        const id = this.state.id

        const { name, image, path } = this.state

        const Club = {
            name: name.trim(),
            path: path.trim(),
            image
        }

        // console.log(Club);

        if (id) {
            this.props.patchClub(id, Club)
        } else {
            this.props.postClub(Club)
        }

        if (this.props.info.id === "REQ_SUCCESS") {
            document.getElementById("clubs_form").reset()
        }

    }

    render() {
        const { msg } = this.state
        const { isLoading } = this.props
        return (
            <div className="container-md container-fluid">
                <Prompt
                    when={this.state.blocked}
                    message={() =>
                        `Вы действительно хотите покинуть эту страницу?`
                    }
                />
                {msg ?
                    <div className={`alert 
                ${this.props.info.id === "REQ_FAIL" ? 'alert-danger' : null}
                ${this.props.info.id === "REQ_SUCCESS" ? 'alert-success' : null} alert-dismissible fade show`} role="alert">
                        {this.props.info.id === "REQ_FAIL" && <strong>Ошибка! </strong>}
                        {this.props.info.id === "REQ_SUCCESS" && <strong>Успех! </strong>}
                        {msg.message}.
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div> : null}
                <div className="row no-gutters justify-content-between">
                    <Link to="/admin/clubs"><Icon icon={faArrowAltCircleLeft} size="lg" /> Назад</Link>
                    <form id="clubs_form" className="w-100 mt-3" onSubmit={this.submitForm}>
                        <div className="form-group">
                            <label htmlFor="name-input">Название</label>
                            <input onChange={this.changeInput} type="text" className="form-control"
                                name="name" id="name-input" placeholder="Танцевальный клуб" value={this.state.name} />
                        </div>
                        <div className="form-row">
                            <div className="col form-group">
                                <label htmlFor="path-input">Ссылка</label>
                                <input onChange={this.changeInput} type="text" className="form-control"
                                    name="path" id="path-input" placeholder="http://..." value={this.state.path} />
                            </div>
                            <div className="col form-group">
                                <label htmlFor="image-input">Изображение</label>
                                <input onChange={this.handleFile} type="file" accept="image" className="form-control-file"
                                    name="image" id="image-input" />
                            </div>
                        </div>

                        <div className="w-100 mt-2 text-right">
                            <button className="btn btn-success mr-0" type="submit"
                                disabled={isLoading}>{this.state.id ? "Обновить клуб" : "Добавить клуб"}</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    Club: state.api.clubs.Club,
    isLoading: state.api.clubs.isLoading,
    info: state.info
})

export default withRouter(connect(
    mapStateToProps,
    { postClub, closeNavbar, clearInfo, getOneClub, patchClub }
)(ClubsForm))