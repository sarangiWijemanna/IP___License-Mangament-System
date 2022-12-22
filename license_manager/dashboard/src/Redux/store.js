import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  FrogetPasswordReducer,
  ResetPasswordReducer,
} from "./Reducers/userReducers";

import {
  licenseCreateReducer,
  licenseDeleteReducer,
  licenseEditReducer,
  licenseListReducer,
  licenseUpdateReducer,
  LICENSEDownloadReducer,
} from "./Reducers/LicenseReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userFrogetPassword: FrogetPasswordReducer,
  userResetPassword: ResetPasswordReducer,

  licenseDelete: licenseDeleteReducer,
  licenseCreate: licenseCreateReducer,
  licenseEdit: licenseEditReducer,
  licenseUpdate: licenseUpdateReducer,
  licenseList: licenseListReducer,
  licenseDownload: LICENSEDownloadReducer,
});

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
