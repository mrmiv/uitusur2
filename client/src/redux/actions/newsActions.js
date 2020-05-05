import {
	LOADING_REQ,
	REQ_SUCCESS,
	REQ_FAIL,
	GET_NEWS,
	NEWS_LOADING,
	GET_NEWSLIST,
} from "./types";

import axios from "axios";
import { returnInfo } from "./infoActions";

export const GetNewsList = (type, page = 1, perPage = null) => (dispatch) => {
	// get /literature/?page=1&?perPage=12?category=all&?sort=asc
	axios
		.get(`/api/news/${type}?page=${page}&perpage=${perPage || 10}`)
		.then((res) => {
			// console.log(res.data);

			dispatch({
				type: GET_NEWSLIST,
				payload: {
					NewsList: res.data.data,
					totalPage: res.data.pages,
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

export const ReadNews = (id) => (dispatch) => {
	dispatch({
		type: NEWS_LOADING,
	});

	// get /literature/book/id
	axios
		.get(`/api/news/read/${id}`)
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
	site,
	type,
	deadline,
	body,
	city,
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


	// if (doc) {
	// 	for (let i = 0; i < doc.length; i++) {
	// 		// console.log(doc[i] + "ЭТО I ФАЙЛ");
	// 		formdata.append("doc", doc[i]);
	// 	}
	// }

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