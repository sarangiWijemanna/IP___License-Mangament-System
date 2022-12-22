import React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import Toast from "../components/LoadingError/Toast";
import { useDispatch, useSelector } from "react-redux";
import { sendLink } from "../Redux/Actions/userActions";
import { toast } from 'react-toastify';


const FrogetPassword = ( ) => {
  window.scrollTo(0, 0);

  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const userFrogetPassword = useSelector((state) => state.userFrogetPassword);
  
  const {error, message, loading } = userFrogetPassword;

  useEffect(() => {
    
    if (message) {
      toast.success(message);
      
    }else{
        toast.error(error); 
    }
  }, [dispatch, error, message]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(sendLink(email));
    setEmail(''); 
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
 
        <h4 className="card-title mb-4 text-center">Frogot Password </h4>

        <form onSubmit={submitHandler}>

        <div
          className="card-center "
          style={{ marginLeft: "10px",marginRight: "10px", marginTop: "10px" }}
        >

        <div>
          <div className="mb-4">
            <i className="ms-1 fa fa-envelope " ></i>
            <label htmlFor="email" className="ms-2 form-label text-left">
                Enter Email Address
            </label>
              <input
                className="form-control fst-italic "
                placeholder="user@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
          </div>
        </div>  

        <div className=" text-center text-primary">
            <p>
              <button 
                className="btn btn-primary w-100"
                disabled={!email}>
                Submit
              </button>
            </p>
        </div>

          <div className=" text-center text-primary">
              <p>
                <Link to="/login" >
                  <em>Go to</em> <strong>Login</strong>
                </Link>
              </p>
          </div>

          <img
            className="img-lg rounded mx-auto d-block"
            src="images/f.png"
            alt="User pic"
          />

        </div>
        </form>

      </div>
    </div>
  </>
 
  );
};

export default FrogetPassword;


