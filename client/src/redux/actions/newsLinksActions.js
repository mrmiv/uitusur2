import {
	REQ_SUCCESS,
	REQ_FAIL,
	GET_NEWS_LINKS,
	GET_ONE_NEWS_LINK,
	NEWS_LINKS_LOADING
} from "./types";

import axios from "axios";
import { returnInfo } from "./infoActions";

export const getNewsLinksByType = (type) => (dispatch) => {

	dispatch({
      type: NEWS_LINKS_LOADING
	})

	const url = `/api/newslinks${type ? `?type=${type}` : ''}`

	axios
		.get(url)
		.then((res) => {
      console.log(res.data);
			dispatch({
				type: GET_NEWS_LINKS,
				payload: {
					NewsLinksList: res.data
				},
			});
			return res.data;
		})
		.catch((err) => {
			dispatch(returnInfo(err.response.data || "Что-то пошло не так", err.response.status || 400, "REQ_FAIL"));
			dispatch({
				type: REQ_FAIL,
			});
		});
};

export const getOneNewsLink = id => dispatch => {

	dispatch({
		type: NEWS_LINKS_LOADING,
	});

  const config = {
		headers: {
			token: localStorage.getItem("token"),
		},
	}

	axios
		.get(`/api/newslinks/${id}`, config)
		.then((res) => {
			dispatch({
				type: GET_ONE_NEWS_LINK,
				payload: {
					NewsLink: res.data,
				},
			});
			return res.data;
		})
		.catch((err) => {
			dispatch(returnInfo(err.response.data || "Что-то пошло не так", err.response.status || 400, "REQ_FAIL"));
			dispatch({
				type: REQ_FAIL,
			});
		});
};

export const postNewsLink = data => dispatch => {
	dispatch({
		type: NEWS_LINKS_LOADING,
	});

	const config = {
		headers: {
			token: localStorage.getItem("token"),
		},
	}
  
  axios
    .post("/api/newslinks", data, config)
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

export const delNewsLink = id => dispatch => {

	const config = {
		headers: {
			token: localStorage.getItem("token"),
		},
	}

	axios
		.delete(`/api/newslinks/${id}`, config)
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

export const patchNewsLink = (id, data) => dispatch => {
  
  dispatch({
		type: NEWS_LINKS_LOADING,
	});

	const config = {
		headers: {
			token: localStorage.getItem("token"),
		},
	}

  axios
    .patch(`/api/newslinks/${id}`, data, config)
		.then((res) => {
			dispatch(returnInfo(res.data, res.status, "REQ_SUCCESS"));
			dispatch({
				type: REQ_SUCCESS,
			});
		})
		.catch((err) => {
			dispatch(returnInfo(err.response.data || "Что-то пошло не так", err.response.status || 400, "REQ_FAIL"));
			dispatch({
				type: REQ_FAIL,
			});
		});
};
