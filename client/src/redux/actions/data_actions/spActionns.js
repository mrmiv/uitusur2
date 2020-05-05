import { GET_STUDYPLAN, GET_ONE_STUDYPLAN, GET_COURSE_STUDYPLAN } from "./types";

import axios from "axios";
import { LOADING_REQ, REQ_FAIL, REQ_SUCCESS } from "../types";
import { returnInfo } from "../infoActions";

export const getSP = () => (dispatch) => {
  dispatch({
    type: LOADING_REQ,
  });

  axios
    .get("/api/studyplan")
    .then((res) => {
      dispatch({
        type: GET_STUDYPLAN,
        payload: { StudyPlans: res.data },
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

export const getCourseSP = (course) => dispatch => {
  dispatch({
    type: GET_COURSE_STUDYPLAN,
    course,
  });
}

export const delSP = id => (dispatch) => {

  dispatch({
    type: LOADING_REQ,
  });

  const config = {
    headers: { token: sessionStorage.getItem("token") },
  };

  axios.delete(`/api/studyplan/${id}`, config)
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

export const getOneSP = id => (dispatch) => {
  dispatch({
    type: LOADING_REQ,
  });

  axios.get(`/api/studyplan/${id}`)
    .then((res) => {
      dispatch({
        type: GET_ONE_STUDYPLAN,
        payload: { groupSP: res.data },
      });
      return res.data;
    })
};

export const postSP = ({ course, group, exam_from, exam_to, weekend_from, weekend_to, practic_from, practic_type, practic_to, gia_from, gia_to }) => (dispatch) => {
  dispatch({
    type: LOADING_REQ,
  });

  const config = {
    headers: {
      token: sessionStorage.getItem("token"),
    }
  };

  const data = {
    course, group, exam_from, exam_to, weekend_from, weekend_to, practic_from, practic_type, practic_to, gia_from, gia_to
  };

  // get /literature/book/id
  axios.post("/api/studyplan", data, config)
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

export const patchSP = (id, { course, group, exam_from, exam_to, weekend_from, weekend_to, practic_from, practic_type, practic_to, gia_from, gia_to }) => (dispatch) => {
  dispatch({
    type: LOADING_REQ,
  });

  const config = {
    headers: {
      token: sessionStorage.getItem("token"),
    }
  };

  const data = {};
  if (course) { data.course = course }
  if (exam_from) { data.exam_from = exam_from }
  if (exam_to) { data.exam_to = exam_to }
  if (weekend_from) { data.exam_to = exam_to }
  if (weekend_to) { data.weekend_to = weekend_to }
  if (practic_from) { data.practic_from = practic_from }
  if (practic_type) { data.practic_type = practic_type }
  if (practic_to) { data.practic_to = practic_to }
  if (gia_to) { data.gia_to = gia_to }
  if (gia_from) { data.gia_from = gia_from }
  if (group) { data.group = group }

  axios.patch(`/api/studyplan/${id}`, data, config)
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
