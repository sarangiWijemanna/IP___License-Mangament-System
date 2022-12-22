import {
  LICENSE_CREATE_FAIL,
  LICENSE_CREATE_REQUEST,
  LICENSE_CREATE_RESET,
  LICENSE_CREATE_SUCCESS,

  LICENSE_DELETE_FAIL,
  LICENSE_DELETE_REQUEST,
  LICENSE_DELETE_SUCCESS,

  LICENSE_DOWNLOAD_FAIL,
  LICENSE_DOWNLOAD_REQUEST,
  LICENSE_DOWNLOAD_SUCCESS,

  LICENSE_EDIT_FAIL,
  LICENSE_EDIT_REQUEST,
  LICENSE_EDIT_SUCCESS,

  LICENSE_LIST_FAIL,
  LICENSE_LIST_REQUEST,
  LICENSE_LIST_SUCCESS,

  LICENSE_UPDATE_FAIL,
  LICENSE_UPDATE_REQUEST,
  LICENSE_UPDATE_RESET,
  LICENSE_UPDATE_SUCCESS,
  
} from "../Constants/LicenseConstants";

// ALL LICENSES
export const licenseListReducer = (state = { licenses: [] }, action) => {
  switch (action.type) {
    case LICENSE_LIST_REQUEST:
      return { loading: true, licenses: [] };
    case LICENSE_LIST_SUCCESS:
      return { loading: false, licenses: action.payload };
    case LICENSE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// DELETE LICENSE
export const licenseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case LICENSE_DELETE_REQUEST:
      return { loading: true };
    case LICENSE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case LICENSE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// DOWNLOAD LICENSE
export const LICENSEDownloadReducer = (state = { licenses: [] }, action) => {
  switch (action.type) {
    case LICENSE_DOWNLOAD_REQUEST:
      return { loading: true, licenses: [] };
    case LICENSE_DOWNLOAD_SUCCESS:
      return { loading: false, licenses: action.payload };
    case LICENSE_DOWNLOAD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


// CREATE LICENSE
export const licenseCreateReducer = (state = { licenses: [] }, action) => {
  switch (action.type) {
    case LICENSE_CREATE_REQUEST:
      return { loading: true };
    case LICENSE_CREATE_SUCCESS:
      return { loading: false, success: true, license: action.payload };
    case LICENSE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case LICENSE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// EDIT LICENSE
export const licenseEditReducer = (
  state = { license: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case LICENSE_EDIT_REQUEST:
      return { ...state, loading: true };
    case LICENSE_EDIT_SUCCESS:
      return { loading: false, license: action.payload };
    case LICENSE_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPDATE LICENSE
export const licenseUpdateReducer = (state = { license: {} }, action) => {
  switch (action.type) {
    case LICENSE_UPDATE_REQUEST:
      return { loading: true };
    case LICENSE_UPDATE_SUCCESS:
      return { loading: false, success: true, license: action.payload };
    case LICENSE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case LICENSE_UPDATE_RESET:
      return { license: {} };
    default:
      return state;
  }
};
