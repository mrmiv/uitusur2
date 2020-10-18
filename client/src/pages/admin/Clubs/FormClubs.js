import React, { Component } from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { connect } from 'react-redux'
import { getOneClub, postClub, patchClub } from '../../../redux/actions/data_actions/clubsAction'
import { clearInfo } from '../../../redux/actions/infoActions'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { Link, Prompt, withRouter } from 'react-router-dom'
import cyrillicToTranslit from 'cyrillic-to-translit-js'
import { MessageAlert } from '../components/MessageAlert'
import { FileField } from '../components/FileField'

export class ClubsForm extends Component {

    state = {
        id: null,

        name: "",
        image: null,
        oldImage: null,
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
        const { Club } = this.props
        
        if (id && (id !== prevState.id)) {
            this.setState({ id })
        }

        if (id && Club !== prevProps.Club) {
            this.setState({
                name: Club.name,
                path: Club.path,
                oldImage: Club.image
            })
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

    handleFile = files => {
        this.setState({ image: files[0], oldImage: null })
    }

    deleteOldFile = () => {
        this.setState({oldImage: null})
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
        const { msg, name, image, oldImage, path } = this.state
        const { isLoading } = this.props

        const buttonDisabled = isLoading || !(name && (image || oldImage) && path)

        return (
            <div className="container-md container-fluid">
                <Prompt
                    when={this.state.blocked}
                    message={() =>
                        `Вы действительно хотите покинуть эту страницу?`
                    }
                />
                
                <MessageAlert msg={msg} id={this.props.info.id}/>

                <Link to="/admin/clubs"><Icon icon={faArrowAltCircleLeft} size="lg" /> Назад</Link>
                <form id="clubs_form" className="mt-3" onSubmit={this.submitForm}>
                    <div className="form-row">
                        <div className="col form-group">
                            <label htmlFor="name-input">Название *</label>
                            <input onChange={this.changeInput} type="text" className="form-control"
                                name="name" id="name-input" placeholder="Танцевальный клуб" value={this.state.name} />
                        </div>
                        <div className="col form-group">
                            <label htmlFor="path-input">Ссылка *</label>
                            <input onChange={this.changeInput} type="text" className="form-control"
                                name="path" id="path-input" placeholder="http://..." value={this.state.path} />
                        </div>
                    </div>

                    <FileField handleParentFiles={this.handleFile} deleteOldFile={this.deleteOldFile} width="100%" 
                        accept="image/*"
                        id="imageFileInput" files={this.state.oldImage ? [this.state.oldImage] : []} label="изображение" 
                        undefinedFileName={this.state.title} name="image-input" multiple={false}/>

                    <div className="d-flex justify-content-end mt-2">
                        <button className="btn btn-success" type="submit"
                            disabled={buttonDisabled}>{this.state.id ? "Обновить клуб" : "Добавить клуб"}</button>
                    </div>
                </form>
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