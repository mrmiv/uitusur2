import React, { PureComponent } from "react";
import { closeNavbar } from "../../../redux/actions/navbarActions";
import { connect } from "react-redux";
import { EditorArea } from '../components/Editor'
import { clearInfo } from "../../../redux/actions/infoActions";
import { ReadNews, postNews, patchNews } from "../../../redux/actions/newsActions";

import { Link, Prompt, withRouter } from "react-router-dom";
import { transliterate as tr, slugify } from 'transliteration';
import { toDate } from "../../components/NewsList";
import { FormatDateToPost, DateMaskInput } from "../components/DateField";
import { MessageAlert } from "../components/MessageAlert";
import { FileField } from "../components/FileField";

export class NewsForm extends PureComponent {
	state = {
		id: "",
		url: null,

		title: "",
		translit_title: "",
		annotation: "",
		body: "",
		type: null,
		site: "",
		city: "",
		deadline: "",
		users: "",
		period: "",
		grant: "",
		doc: null,

		oldDocs: null,

		pin: false,
		send_to_email: false,

		blocked: false,
		msg: null,
		isLoading: false,
	};

	componentWillUnmount() {
		this.props.closeNavbar();
	}

	componentDidMount() {
		document.title = this.props.title;
		const id = this.props.match.params.id;
		if (id) {
			this.props.ReadNews('id', id);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const url = this.props.match.params.id;
		const { msg } = this.props.info;
		// console.log(this.state.doc, this.state.oldDocs);
		if (url && url !== prevState.url) {
			this.setState({ url });
		}

		if (url && this.props.news.News !== prevProps.news.News) {

			const {News} = this.props.news

			this.setState({
				title: News.title,
				translit_title: News.translit_title,
				annotation: News.annotation,
				body: News.body,
				type: News.type,
				site: News.site,
				city: News.city,
				deadline: News.deadline ? toDate(News.deadline, false, "-") : "",
				users: News.users,
				oldDocs: News.docs,
				grant: News.grant,
				pin: News.pin,
				period: News.period,
				id: News._id
			});
		}
		if (msg !== prevProps.info.msg) {
			this.setState({ msg });
		}
	}

	setNewsType = (e) => {
		const type = e.target.value;
		this.setState({ type });
	}

	changeInput = e => {
		const field = e.target.name;
		const value = e.target.value
		this.setState({ [field]: value });
		if (!this.state.blocked) {
			this.setState({ blocked: true });
		}
	}

	changeTitleAndTranslit = e => {
		const value = e.target.value
		const translit_value = slugify(value, { replace: {' ' : '-', '<': '', '>' : ''}, allowedChars: 'a-zA-Z0-9-_'})

		this.setState({ 
			title: value,
			translit_title: translit_value
		})

		if (!this.state.blocked) {
			this.setState({ blocked: true });
		}
	}

	changeTranslitTitle = e => {
		const translit_title = e.target.value
		const regex = /^[a-z0-9-]+$/
		if(regex.test(translit_title)) {
			this.setState({translit_title})
		}
	}

	changeCheckbox = (e) => {
		const field = e.target.name;
		this.setState({ [field]: e.target.checked });
	};

	handeFile = (files) => {
		this.setState({ doc: files });
	};

	deleteOldFile = file => {
		this.setState(state => {return { oldDocs: state.oldDocs.filter(doc => doc !== file) }})
	}

	changeBody = (body) => {
		this.setState({ body });
		if (!this.state.blocked) {
			this.setState({ blocked: true });
		}
	}

	submitForm = (e) => {
		e.preventDefault();
		this.props.clearInfo();
		window.scrollTo(0, 0);

		const {
			title,
			translit_title,
			annotation,
			body,
			type,
			site,
			city,
			deadline,
			users,
			period,
			grant,
			doc,

			pin,
			oldDocs,
			url,
			id
		} = this.state;

		let News = {
			title,
			translit_title,
			annotation,
			users,
			doc,
			body,
			pin,
			type,
			deadline: deadline ? FormatDateToPost(deadline) : ''
		};

		if (type === "2") {
			News.city = city;
			News.grant = grant;
			News.period = period;
		} else if (type === "3") {
			News.city = city;
			News.site = site;
			News.period = period;
		}

		if (url) {
			this.props.patchNews(id, News, oldDocs)
		} else {
			this.props.postNews(News)
		}
	}

	render() {
		const { type, title, translit_title, body, msg } = this.state
		const {isLoading} = this.props.news
		const disabledButton = !title || !translit_title || !body || !type || isLoading

		return (
			<div className="container-md container-fluid">
				<Prompt
					when={this.state.blocked}
					message={() => `Вы действительно хотите покинуть эту страницу?`}
				/>
				<MessageAlert msg={msg} id={this.props.info.id}/>
				<div className="row no-gutters justify-content-between">
					<Link to="/admin/news">Назад</Link>
					<form className="w-100 mt-3" onSubmit={this.submitForm}>
						<div className="form-group">
							<label htmlFor="title-input">Заголовок *</label>
							<input
								required
								onChange={this.changeTitleAndTranslit}
								type="text"
								className="form-control"
								maxLength={128}
								name="title"
								id="title-input"
								placeholder="Иван Иванов вступил в профсоюз ТУСУРа"
								value={this.state.title}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="translit-title-input">URL *</label>
							<input
								required
								type="text"
								className="form-control"
								maxLength={128}
								name="translit_title"
								id="translit-title-input"
								placeholder="ivan-ivanon-vstupil-v-profsouz-tusura"
								onChange={this.changeTranslitTitle}
								value={this.state.translit_title}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="annotation-input">Аннотация</label>
							<textarea
								maxLength={255}
								onChange={this.changeInput}
								className="form-control"
								name="annotation"
								id="annotation-input"
								value={this.state.annotation}
							/>
						</div>
						<div className="form-row">
							<div className="col form-group">
								<label htmlFor="type-input">Категория *</label>
								<select
									required
									onChange={this.changeInput}
									type="text"
									value={this.state.type}
									className="form-control"
									name="type"
									id="type-input"
								>
									{!type && <option defaultValue>Выберите категорию...</option>}
									<option name="Объявления кафедры" value={1}>
										Объявления кафедры
									</option>
									<option name="Стипендии, конкурсы и гранты" value={2}>
										Стипендии, конкурсы и гранты
									</option>
									<option name="Конференции" value={3}>
										Конференции
									</option>
								</select>
							</div>
							<div className="col form-group">
								<label htmlFor="users-input">Для кого</label>
								<input
									onChange={this.changeInput}
									type="text"
									className="form-control"
									name="users"
									id="users-input"
									placeholder="Бакалавриат, 057, РФ"
									value={this.state.users}
								/>
							</div>
							<DateMaskInput id="deadline-input" name="deadline"
								changeParentInput={this.changeInput}
								value={this.state.deadline} label="Крайний срок" col />
						</div>
						{type && type !== "1" && (
							<div className="form-row">
								<div className="col form-group">
									<label htmlFor="city-input">Место проведения</label>
									<input
										onChange={this.changeInput}
										type="text"
										className="form-control"
										name="city"
										id="city-input"
										placeholder="Томск"
										value={this.state.city}
									/>
								</div>
								<div className="col form-group">
									<label htmlFor="period-input">
										{type === "2" ? "Период действия" : "Сроки проведения"}
									</label>
									<input
										onChange={this.changeInput}
										type="text"
										className="form-control"
										name="period"
										id="period-input"
										placeholder="дд.мм.гг / Весенний семестр"
										value={this.state.period}
									/>
								</div>
								{type === "2" && (
									<div className="col form-group">
										<label htmlFor="grant-input">
											Сумма стипендии/гранта (₽)
										</label>
										<input
											onChange={this.changeInput}
											type="text"
											className="form-control"
											name="grant"
											id="grant-input"
											placeholder="5000 ₽"
											value={this.state.grant}
										/>
									</div>
								)}
								{type === "3" && (
									<div className="col form-group">
										<label htmlFor="site-input">Сайт конференции</label>
										<input
											onChange={this.changeInput}
											type="text"
											className="form-control"
											name="site"
											id="site-input"
											placeholder="http://"
											value={this.state.site}
										/>
									</div>
								)}
							</div>
						)}
						<EditorArea value={this.state.body} changeParentBody={this.changeBody}/>

						<FileField handleParentFiles={this.handeFile} deleteOldFile={this.deleteOldFile} accept={"application/*, .doc, .docx, .xls, .xlsx, image/*"}
						id="docs" files={this.state.oldDocs} label="вложения" name="docs-input" multiple={true}/>

						<div className="mt-2 d-flex justify-content-end align-items-center">
								{/* <div className="form-group form-check">
									<input
										type="checkbox"
										className="form-check-input"
										id="sendemail"
										checked={this.state.send_to_email}
										name="send_to_email"
										onChange={this.changeCheckbox}
									/>
									<label className="form-check-label" htmlFor="sendemail">
										Уведомить по почте
									</label>
								</div> */}
							<div className="form-group form-check" style={{margin: "0 16px"}}>
								<input
									type="checkbox"
									className="form-check-input"
									id="pin"
									checked={this.state.pin}
									name="pin"
									onChange={this.changeCheckbox}
								/>
								<label className="form-check-label" htmlFor="pin">
									Закрепить новость
								</label>
							</div>
							<button
								className="btn btn-success"
								type="submit"
								disabled={disabledButton}
							>
								{this.state.url ? "Обновить новость" : "Добавить новость"}
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	news: state.api.news.news,
	info: state.info,
});

export default withRouter(connect(
	mapStateToProps, 
	{ closeNavbar, clearInfo, ReadNews, postNews, patchNews })
	(NewsForm)
)
