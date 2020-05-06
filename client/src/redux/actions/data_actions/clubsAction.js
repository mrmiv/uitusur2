import { GET_CLUBS, GET_CLUB } from "./types";

import axios from "axios";
import { LOADING_REQ, REQ_FAIL, REQ_SUCCESS } from "../types";
import { returnInfo } from "../infoActions";

// Клубы
export const getClubs = () => (dispatch) => {
	dispatch({
		type: LOADING_REQ,
	});

	axios
		.get("/api/clubs")
		.then((res) => {
			dispatch({
				type: GET_CLUBS,
				payload: { ClubsList: res.data },
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

// export const postClubs = () => dispatch => {
//     axios.post('/api/clubs')
//         .then(res => {
//             dispatch({
//                 type: GET_CLUBS,
//                 payload: {ClubsList: res.data}
//             })
//             return res.data})
//         .catch(err => {
//             console.error(err);
//     })
//     }

export const delClub = (id) => (dispatch) => {
	dispatch({
		type: LOADING_REQ,
	});

	const config = {
		headers: { token: sessionStorage.getItem("token") },
	};

	axios
		.delete(`/api/clubs/${id}`, config)
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

export const getOneClub = (id) => (dispatch) => {
	dispatch({
		type: LOADING_REQ,
	});

	axios
		.get(`/api/clubs/${id}`)
		.then((res) => {
			dispatch({
				type: GET_CLUB,
				payload: { Club: res.data }
			});
		})
		.catch((err) => {
			dispatch(returnInfo(err.response.data, err.response.status, "REQ_FAIL"));
			dispatch({
				type: REQ_FAIL,
			});
		});
};

export const postClub = ({ name, path, image }) => (dispatch) => {
	dispatch({
		type: LOADING_REQ,
	});

	const headers = {
		"Content-type": "multipart/form-data",
		token: sessionStorage.getItem("token"),
	};

	const formdata = new FormData();

	formdata.append("name", name);
	formdata.append("path", path);
	formdata.append("image", image);

	// get /literature/book/id
	axios({
		url: "/api/clubs",
		method: "POST",
		headers,
		data: formdata,
	})
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

export const patchClub = (id, { name, path }) => (dispatch) => {
	dispatch({
		type: LOADING_REQ,
	});

	const headers = {
		"Content-type": "application/json",
		token: sessionStorage.getItem("token"),
	};

	let data = {};
	if (name) {
		data.name = name;
	}
	if (path) {
		data.path = path;
	}

	axios({
		url: `/api/clubs/${id}`,
		method: "PATCH",
		headers,
		data: data,
	})
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