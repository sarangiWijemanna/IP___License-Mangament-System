import {
  LICENSE_CREATE_FAIL,
  LICENSE_CREATE_REQUEST,
  LICENSE_CREATE_SUCCESS,

  LICENSE_DELETE_FAIL,
  LICENSE_DELETE_REQUEST,
  LICENSE_DELETE_SUCCESS,

  LICENSE_EDIT_FAIL,
  LICENSE_EDIT_REQUEST,
  LICENSE_EDIT_SUCCESS,

  LICENSE_LIST_FAIL,
  LICENSE_LIST_REQUEST,
  LICENSE_LIST_SUCCESS,

  LICENSE_UPDATE_FAIL,
  LICENSE_UPDATE_REQUEST,
  LICENSE_UPDATE_SUCCESS,

  LICENSE_DOWNLOAD_FAIL,
  LICENSE_DOWNLOAD_REQUEST,
  LICENSE_DOWNLOAD_SUCCESS,
} from "../Constants/LicenseConstants";

import axios from "axios";
import { logout } from "./userActions";

//LICENSE LIST
export const listLicenses = (keyword = " ") => async (dispatch, getState) => {
  try {
    dispatch({ type: LICENSE_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    if (keyword.trim()) {
      const { data } = await axios.get(`/api/licenses/search/${keyword}`);
      dispatch({ type: LICENSE_LIST_SUCCESS, payload: data });
    } else {
      const { data } = await axios.get(`/api/licenses/all`, config);
      dispatch({ type: LICENSE_LIST_SUCCESS, payload: data });
    }
      
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: LICENSE_LIST_FAIL,
      payload: message,
    });
  }
};

// DELETE LICENSE
export const deleteLicense = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: LICENSE_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/licenses/${id}`, config);

    dispatch({ type: LICENSE_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: LICENSE_DELETE_FAIL,
      payload: message,
    });
  }
};


// DOWNLOAD LICENSE
export const downloadLicense = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: LICENSE_DOWNLOAD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // The folder path for the files
    const fileName = 'pq_license';

    const { data } = axios({
      url: `/api/licenses/download/${id}`,config,
      method: 'GET',
      responseType: 'blob', 
      })
      
      .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          console.log(data)
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName+'.json');
          document.body.appendChild(link);
          link.click();
      });
    dispatch({ type: LICENSE_DOWNLOAD_SUCCESS, payload: data });

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: LICENSE_DOWNLOAD_FAIL,
      payload: message,
    });
  }
};

// CREATE LICENSE
export const createLicense =
  (company_name, client_name,client_email, serial, decrypt_check_variable, product, speed, num_mgmt_iface, num_bridge_iface, mgmt_mac1, mgmt_mac2,inputFields, period_in_days, starting_date,description) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: LICENSE_CREATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/licenses/`,
        { company_name, client_name, client_email,serial, decrypt_check_variable, product, speed, num_mgmt_iface, num_bridge_iface, mgmt_mac1, mgmt_mac2,inputFields, period_in_days, starting_date,description },
        config
      );
      dispatch({ type: LICENSE_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: LICENSE_CREATE_FAIL,
        payload: message,
      });
    }
  };

// EDIT LICENSE
export const editLicense = (id) => async (dispatch) => {
  try {
    dispatch({ type: LICENSE_EDIT_REQUEST });

    const { data } = await axios.get(`/api/licenses/${id}`);
    dispatch({ type: LICENSE_EDIT_SUCCESS, payload: data });

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: LICENSE_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE LICENSE
export const updateLicense = (license) => async (dispatch, getState) => {
  try {
    dispatch({ type: LICENSE_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/licenses/${license._id}`,
      license,
      config
    );

    dispatch({ type: LICENSE_UPDATE_SUCCESS, payload: data });
    dispatch({ type: LICENSE_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: LICENSE_UPDATE_FAIL,
      payload: message,
    });
  }
};
