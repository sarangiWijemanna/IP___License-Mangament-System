import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { register } from "../Redux/Actions/userActions";


const RegisterScreen = ({ location, history }) => {
  window.scrollTo(0, 0);
  const [name, setName] = useState("");
  const [email] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  return (

    <>   
    
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
       
        <h4 className="card-title mb-2 text-center">Sign Up </h4>
        
        <form onSubmit={submitHandler} >

        <div
          className="card-center "
          style={{ marginLeft: "10px",marginRight: "10px", marginTop: "10px" }}
        >

          
          <div className="mb-3">
            <i className="ms-1 fa fa-user " ></i>
            <label htmlFor="Username" className="ms-2 form-label text-left">
              Username
            </label>
              <input
                className="form-control fst-italic "
                placeholder="Username"
                type="email"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
          </div>

          <div className="mb-3">
            <i className="ms-1 fa fa-envelope " ></i>
            <label htmlFor="email" className="ms-2 form-label text-left">
                Email
            </label>
              <input
                className="form-control fst-italic "
                placeholder="user@example.com"
                type="email"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
          </div>
          
          <div className="mb-3">
             <i className="ms-1 fa fa-unlock-alt "></i>
            <label htmlFor="password" className="ms-2 form-label">
                  Password
              </label>
              <input
                className="form-control fst-italic mb-4"
                placeholder="********"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
          </div>


          <div className="mb-3">
              <button type="submit" className="btn btn-primary w-100">
                 Register
              </button>
          </div>

          <div className=" text-center text-primary">
              <p>
                <Link to={redirect ? `/login?redirect=${redirect}` : "/login" }>
                  <em>I Have Account</em> <strong>Login</strong>
                </Link>
              </p>
          </div>

         
              
          

          

        </div>

        <p class="copywrite">© 2022, ..... Web Services. All rights reserved.</p>

        </form>

      </div>
    </div>
  </>
 
  );
};

export default RegisterScreen;
