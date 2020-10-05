import React, { PureComponent } from "react";
import { closeNavbar } from "../../../redux/actions/navbarActions";
import { connect } from "react-redux";
import { EditorArea } from '../components/Editor'
import { clearInfo } from "../../../redux/actions/infoActions";
import { ReadNews, postNews, patchNews } from "../../../redux/actions/newsActions";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, Prompt, withRouter } from "react-router-dom";
import CyrillicToTranslit from "cyrillic-to-translit-js";
import { transliterate as slugify } from 'transliteration';
import { toDate } from "../../components/NewsList";
import { FormatDateToPost, DateMaskInput } from "../components/DateField";

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
		if (url) {
			if (url !== prevState.url) {
				this.setState({ url });
			}
			const { News } = this.props.news;

			if (News !== prevProps.news.News) {
				this.setState({
					title: News.title,
					translit_title: News.translit_title,
					annotation: News.annotation,
					body: News.body,
					type: String(News.type),
					site: News.site,
					city: News.city,
					deadline: toDate(News.deadline),
					users: News.users,
					grant: News.grant,
					pin: News.pin,
					period: News.period,
					id: News._id
				});
			}
		}
		if (msg !== prevProps.info.msg) {
			// console.log(msg);
			this.setState({ msg });
		}
	}

	setNewsType = (e) => {
		const type = e.target.value;
		this.setState({ type });
	};

	changeInput = e => {
		const field = e.target.name;
		const value = e.target.value
		console.log(field, value);
		this.setState({ [field]: value });
		if (!this.state.blocked) {
			this.setState({ blocked: true });
		}
	};

	changeTitleAndTranslit = e => {
		const value = e.target.value
		const translit_value = slugify(value)

		this.setState({ 
			title: value,
			translit_title: translit_value
		});
		if (!this.state.blocked) {
			this.setState({ blocked: true });
		}
	}

	changeCheckbox = (e) => {
		const field = e.target.name;
		this.setState({ [field]: e.target.checked });
	};

	handeFile = (e) => {
		let files = e.target.files;
		for (let i = 0; i < files.length; i++) {
			console.log(files[i]);
			Object.defineProperty(files[i], "name", {
				writable: true,
				value: CyrillicToTranslit().transform(files[i]["name"], "-"),
			});
		}
		this.setState({ doc: files });
	};

	changeBody = (body) => {
		this.setState({ body });
		if (!this.state.blocked) {
			this.setState({ blocked: true });
		}
	};

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
			send_to_email,

			url,
			id
		} = this.state;

		console.log(deadline);

		let fields = {
			title,
			translit_title,
			annotation,
			users,
			doc,
			body,
			pin,
			send_to_email,
			type,
			deadline: FormatDateToPost(deadline)
		};

		// console.log("this is docs",doc);

		if (type === "2") {
			// стипендии и гранты
			fields.city = city;
			fields.grant = grant;
			fields.period = period;
		} else if (type === "3") {
			// конференции
			fields.city = city;
			fields.site = site;
			fields.period = period;
		}

		// console.log(fields);
		const News = fields;
		// console.log(Staff);

		if (url) {
			// console.log(fields);
			this.props.patchNews(id, News)
		} else {
			this.props.postNews(News);
		}
	};

	render() {
		const { type, msg, isLoading } = this.state;
		return (
			<div className="container-md container-fluid">
				<Prompt
					when={this.state.blocked}
					message={() => `Вы действительно хотите покинуть эту страницу?`}
				/>
				{msg ? (
					<div
						className={`alert 
                ${this.props.info.id === "REQ_FAIL" ? "alert-danger" : null}
                ${
							this.props.info.id === "REQ_SUCCESS" ? "alert-success" : null
							} alert-dismissible fade show`}
						role="alert"
					>
						{this.props.info.id === "REQ_FAIL" && <strong>Ошибка! </strong>}
						{this.props.info.id === "REQ_SUCCESS" && <strong>Успех! </strong>}
						{msg.message}.
						<button
							type="button"
							className="close"
							data-dismiss="alert"
							aria-label="Close"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
				) : null}
				<div className="row no-gutters justify-content-between">
					<Link to="/admin/news">
						<Icon icon={faArrowAltCircleLeft} size="lg" /> Назад
					</Link>
					<form className="w-100 mt-3" onSubmit={this.submitForm}>
						<div className="form-group">
							<label htmlFor="title-input">Заголовок</label>
							<input
								onChange={this.changeTitleAndTranslit}
								type="text"
								className="form-control"
								name="title"
								id="title-input"
								placeholder="Иван Иванов вступил в профсоюз ТУСУРа"
								value={this.state.title}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="translit-title-input">Транслитом / URL</label>
							<input
								disabled
								type="text"
								className="form-control"
								name="translit_title"
								id="translit-title-input"
								placeholder="ivan-ivanon-vstupil-v-profsouz-tusura"
								value={this.state.translit_title}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="annotation-input">Аннотация</label>
							<textarea
								maxLength="255"
								onChange={this.changeInput}
								className="form-control"
								name="annotation"
								id="annotation-input"
								value={this.state.annotation}
							/>
						</div>
						<div className="form-row">
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
							<div className="col form-group">
								<label htmlFor="type-input">Категория</label>
								<select
									onChange={this.changeInput}
									type="text"
									value={this.state.type}
									className="form-control"
									name="type"
									id="type-input"
								>
									{!type && <option defaultValue>Выберите категорию...</option>}
									<option name="Объявления кафедры" value={"1"}>
										Объявления кафедры
									</option>
									<option name="Стипендии, конкурсы и гранты" value={"2"}>
										Стипендии, конкурсы и гранты
									</option>
									<option name="Конференции" value={"3"}>
										Конференции
									</option>
								</select>
							</div>
						</div>
						<div className="form-row">
							<DateMaskInput id="deadline-input" name="deadline"
								changeParentInput={this.changeInput}
								value={this.state.deadline} label="Крайний срок" col />
							<div className="col form-group">
								<label htmlFor="doc-input">Вложения</label>
								<input
									type="file"
									onChange={this.handeFile}
									multiple
									className="form-control-file"
									name="doc"
									id="doc-input"
								/>
							</div>
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
						<div className="w-100 mt-2 d-flex justify-content-between align-items-bottom">
							<div>
								<div className="form-group form-check">
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
								</div>
								<div className="form-group form-check">
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
							</div>
							<button
								className="btn btn-success mr-0 h-50"
								type="submit"
								disabled={isLoading}
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

export default withRouter(
	connect(mapStateToProps, { closeNavbar, clearInfo, ReadNews, postNews, patchNews })(
		NewsForm
	)
);
