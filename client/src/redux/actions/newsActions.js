import {
	LOADING_REQ,
	REQ_SUCCESS,
	REQ_FAIL,
	GET_NEWS,
	NEWS_LOADING,
	GET_NEWSLIST,
	MORE_NEWSLIST,
} from "./types";

import axios from "axios";
import { returnInfo } from "./infoActions";

export const GetNewsList = (type='', page = 1, perPage = 10) => (dispatch) => {
	// get /literature/?page=1&?perPage=12?category=all&?sort=asc

	dispatch({
	    type: LOADING_REQ
	})

	const url = `/api/news/?${type ? `type=${type}&` : ''}page=${page}&perpage=${perPage}`

	axios
		.get(url)
		.then((res) => {
			// console.log(res.data);

			dispatch({
				type: GET_NEWSLIST,
				payload: {
					NewsList: res.data.data,
					total: res.data.pages,
				},
			});
			return res.data;
		})
		.catch((err) => {
			dispatch(returnInfo(err.response.data, err.response.status, "REQ_FAIL"));
			dispatch({
				type: REQ_FAIL,
			});
		});
};

export const GetMoreNews = (type, page = 1, perPage = 10) => (dispatch) => {
	// get /literature/?page=1&?perPage=12?category=all&?sort=asc

	const url = `/api/news/${type ? type : ''}?page=${page}&perpage=${perPage}`

	axios
		.get(url)
		.then((res) => {
			// console.log(res.data);

			dispatch({
				type: MORE_NEWSLIST,
				payload: {
					NewsList: res.data.data,
					total: res.data.pages,
				},
			});
			return res.data;
		})
		.catch((err) => {
			dispatch(returnInfo(err.response.data, err.response.status, "REQ_FAIL"));
			dispatch({
				type: REQ_FAIL,
			});
		});
};

export const ReadNews = title => (dispatch) => {
	dispatch({
		type: NEWS_LOADING,
	});

	// get /literature/book/title
	axios
		.get(`/api/news/read/${title}`)
		.then((res) => {
			dispatch({
				type: GET_NEWS,
				payload: {
					News: res.data,
				},
			});
			return res.data;
		})
		.catch((err) => {
			dispatch(returnInfo(err.response.data, err.response.status, "REQ_FAIL"));
			dispatch({
				type: REQ_FAIL,
			});
		});
};

export const postNews = ({
	title,
	translit_title,
	annotation,
	site,
	type,
	deadline,
	body,
	city,
	users,
	doc,
	period,
	grant,
	pin,
	send_to_email,
}) => (dispatch) => {
	dispatch({
		type: LOADING_REQ,
	});

	const headers = {
		"content-type": "multipart/form-data",
		token: sessionStorage.getItem("token"),
	};

	const formdata = new FormData();

	formdata.append("title", title);
	formdata.append("translit_title", translit_title);
	formdata.append("body", body);
	formdata.append("type", type);

	if (site) {
		formdata.append("site", site);
	}
	if (deadline) {
		formdata.append("deadline", deadline);
	}
	if (city) {
		formdata.append("city", city);
	}
	if (users) {
		formdata.append("users", users);
	}
	if (period) {
		formdata.append("period", period);
	}
	if (grant) {
		formdata.append("grant", grant);
	}
	if (annotation) {
		formdata.append("annotation", annotation);
	}
	formdata.append("pin", pin);
	formdata.append("send_to_email", send_to_email);

	// console.log(doc);

	if (doc) {
		for (let i = 0; i < doc.length; i++) {
			// console.log(doc[i] + "ЭТО I ФАЙЛ");
			formdata.append("doc", doc[i]);
		}
	}

	// get /literature/book/id
	axios({
		url: "/api/news",
		method: "POST",
		headers,
		data: formdata,
	})
		.then((res) => {
			// console.log(res);
			dispatch(returnInfo(res.data, res.status, "REQ_SUCCESS"));
			dispatch({
				type: REQ_SUCCESS,
			});
		})
		.catch((err) => {
			dispatch(returnInfo(err.response.data, err.response.status, "REQ_FAIL"));
			dispatch({
				type: REQ_FAIL,
			});
		});
};

export const delNews = (id) => (dispatch) => {
	dispatch({
		type: LOADING_REQ,
	});

	const config = {
		headers: {
			token: sessionStorage.getItem("token"),
		},
	};

	axios
		.delete(`/api/news/read/${id}`, config)
		.then((res) => {
			dispatch(returnInfo(res.data, res.status, "REQ_SUCCESS"));
			dispatch({
				type: REQ_SUCCESS,
			});
		})
		.catch((err) => {
			dispatch(returnInfo(err.response.data, err.response.status, "REQ_FAIL"));
			dispatch({
				type: REQ_FAIL,
			});
		});
};

export const patchNews = (id, {
	title,
	translit_title,
	annotation,
	site,
	type,
	deadline,
	body,
	city,
	doc,
	users,
	period,
	grant,
	pin,
}) => (dispatch) => {
	dispatch({
		type: LOADING_REQ,
	});

	const headers = {
		"content-type": "multipart/form-data",
		token: sessionStorage.getItem("token"),
	};

	const formdata = new FormData();

	formdata.append("title", title);
	formdata.append("translit_title", translit_title);
	formdata.append("body", body);
	formdata.append("type", type);

	if (site) {
		formdata.append("site", site);
	}
	if (deadline) {
		formdata.append("deadline", deadline);
	}
	if (city) {
		formdata.append("city", city);
	}
	if (users) {
		formdata.append("users", users);
	}
	if (period) {
		formdata.append("period", period);
	}
	if (grant) {
		formdata.append("grant", grant);
	}
	formdata.append("pin", pin);

	if (doc) {
		formdata.append("doc", doc);
	}
	if (annotation) {
		formdata.append("annotation", annotation);
	}

	// get /literature/book/id
	axios({
		url: `/api/news/read/${id}`,
		method: "PATCH",
		headers,
		data: formdata,
	})
		.then((res) => {
			// console.log(res);
			dispatch(returnInfo(res.data, res.status, "REQ_SUCCESS"));
			dispatch({
				type: REQ_SUCCESS,
			});
		})
		.catch((err) => {
			dispatch(returnInfo(err.response.data, err.response.status, "REQ_FAIL"));
			dispatch({
				type: REQ_FAIL,
			});
		});
};

export const pinNews = id => dispatch => {

	dispatch({
		type: LOADING_REQ,
	});

	const config = {
		headers: {
			token: sessionStorage.getItem("token"),
		}
	};

	axios
		.put(`/api/news/read/pin/${id}`, null, config)
		.then((res) => {
			// console.log(res);
			dispatch(returnInfo(res.data, res.status, "REQ_SUCCESS"));
			dispatch({
				type: REQ_SUCCESS,
			});
		})
		.catch((err) => {
			dispatch(returnInfo(err.response.data, err.response.status, "REQ_FAIL"));
			dispatch({
				type: REQ_FAIL,
			});
		});
}