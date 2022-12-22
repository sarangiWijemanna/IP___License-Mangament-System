import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/LoadingError/Loading";
import Toast from "../components/LoadingError/Toast";
import { login } from "../Redux/Actions/userActions";
import Message from "./../components/LoadingError/Error";

import { Link } from "react-router-dom";

const Login = ({ location, history }) => {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;


  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };


  return (
    <>   
      <Toast />
      <div
        className="card shadow mx-auto"
        style={{ maxWidth: "400px", marginTop: "30px"}}
      >
        <div className="card-body">

          {error && <Message variant="alert-danger">{error}</Message>}
          {loading && <Loading />}

          <img
            className="img-md rounded-circle mx-auto d-block"
            src="images/favicon.png"
            alt="User pic"
          />
         
          <h4 className="card-title mb-2 text-center">Sign in </h4>
          <p className="text mb-4 text-center"> <em>To continue to LG&MS .. </em></p>

          <form onSubmit={submitHandler} >

          <div
            className="card-center "
            style={{ marginLeft: "10px",marginRight: "10px", marginTop: "10px" }}
          >
            <div className="mb-3">
	            <i className="ms-1 fa fa-envelope " ></i>
              <label htmlFor="company_name" className="ms-2 form-label text-left">
                  Email
              </label>
                <input
                  className="form-control fst-italic "
                  placeholder="user@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            
            <div className="mb-3">
 	            <i className="ms-1 fa fa-unlock-alt "></i>
              <label htmlFor="company_name" className="ms-2 form-label">
                    Password
                </label>
                <input
                  className="form-control fst-italic mb-3"
                  placeholder="********"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className=" text-center text">
              <p>Forgotten Password?  <em> <Link className="form-label text-decoration-underline color=#blue"
                   to="/forgotPassword">Reset it</Link></em>
              </p>
            </div>

            <div className="mb-4">
              <button type="submit" className="btn btn-primary w-100 mb-3">
                Sign In
              </button>
            </div>

            <div className=" text-center text-primary">
              <Link className="form-label text-decoration-underline color=#blue"
                   to={redirect ? `/register?redirect=${redirect}` : "/register"}>
                <p><em>Create a New Admin Account</em></p>
              </Link>
            </div>

          </div>

          <p class="copywrite">© 2022, .... Web Services. All rights reserved.</p>
 
          </form>

        </div>
      </div>
    </>
  );
};

export default Login;
