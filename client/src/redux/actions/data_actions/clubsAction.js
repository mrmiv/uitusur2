import { GET_CLUBS, GET_CLUB } from "./types";

import axios from "axios";
import { LOADING_REQ, REQ_FAIL, REQ_SUCCESS } from "../types";
import { returnInfo } from "../infoActions";

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
			})
			return res.data;
		})
		.catch((err) => {
			dispatch(returnInfo(err.response.data, err.response.status, "REQ_FAIL"))
			dispatch({
				type: REQ_FAIL,
			})
		})
}

export const delClub = (id) => (dispatch) => {
	dispatch({
		type: LOADING_REQ,
	});

	const config = {
		headers: { token: localStorage.getItem("token") },
	};

	axios
		.delete(`/api/clubs/${id}`, config)
		.then((res) => {
			dispatch(returnInfo(res.data, res.status, "REQ_SUCCESS"))
			dispatch({
				type: REQ_SUCCESS,
			})
		})
		.catch((err) => {
			dispatch(returnInfo(err.response.data, err.response.status, "REQ_FAIL"))
			dispatch({
				type: REQ_FAIL,
			})
		})
}

export const getOneClub = (id) => (dispatch) => {
	dispatch({
		type: LOADING_REQ,
	})

	axios
		.get(`/api/clubs/${id}`)
		.then((res) => {
			dispatch({
				type: GET_CLUB,
				payload: { Club: res.data }
			})
		})
		.catch((err) => {
			dispatch(returnInfo(err.response.data, err.response.status, "REQ_FAIL"))
			dispatch({
				type: REQ_FAIL,
			})
		})
}

export const postClub = ({ name, path, image }) => (dispatch) => {
	dispatch({
		type: LOADING_REQ,
	})

	const headers = {
		"Content-type": "multipart/form-data",
		token: localStorage.getItem("token"),
	}

	const formdata = new FormData()

	formdata.append("name", name)
	formdata.append("path", path)
	formdata.append("image", image)

	axios({
		url: "/api/clubs",
		method: "POST",
		headers,
		data: formdata,
	})
		.then((res) => {
			dispatch(returnInfo(res.data, res.status, "REQ_SUCCESS"))
			dispatch({
				type: REQ_SUCCESS,
			})
		})
		.catch((err) => {
			dispatch(returnInfo(err.response.data, err.response.status, "REQ_FAIL"))
			dispatch({
				type: REQ_FAIL,
			})
		})
}

export const patchClub = (id, Club) => (dispatch) => {
	dispatch({
		type: LOADING_REQ,
	});

	const headers = {
		"Content-type": "application/json",
		token: localStorage.getItem("token"),
	};

	const {name, path, image} = Club

	const formdata = new FormData()
	formdata.append("name", name)
	formdata.append("path", path)
	formdata.append("image", image)

	axios({
		url: `/api/clubs/${id}`,
		method: "PATCH",
		headers,
		data: formdata
	})
		.then((res) => {
			dispatch(returnInfo(res.data, res.status, "REQ_SUCCESS"))
			dispatch({
				type: REQ_SUCCESS,
			})
		})
		.catch((err) => {
			dispatch(returnInfo(err.response.data, err.response.status, "REQ_FAIL"))
			dispatch({
				type: REQ_FAIL,
			})
		})
}
