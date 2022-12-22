import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { resetPassword } from "../Redux/Actions/userActions";
import Toast from "../components/LoadingError/Toast";
import { toast } from "react-toastify";

const ResetPassword = ({ history, match }) => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userResetPassword = useSelector((state) => state.userResetPassword);
  const { error, success, loading } = userResetPassword;

  useEffect(() => {
    if (success) {
      history.push("/");
    } else {
      toast.error(error);
    }
  }, [error, history, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password Does Not Matched");
    } else {
      if (password.length < 5) {
        toast.error("Password must be greater than or equal to 5..!");
      } else {
        dispatch(resetPassword(match.params.token, match.params.id, password));
      }
    }

    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <Toast />
      <div
        className="card shadow mx-auto"
        style={{ maxWidth: "400px", marginTop: "30px" }}
      >
        <div className="card-body">
          {error && <Message variant="alert-danger">{error}</Message>}
          {loading && <Loading />}

          <h4 className="card-title mb-4 text-center">Reset Password</h4>

          <form onSubmit={submitHandler}>
            <div
              className="card-center "
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                marginTop: "10px",
              }}
            >
              <div>
                <div className="mb-3">
                  <i className="ms-1 fa fa-unlock-alt "></i>
                  <label htmlFor="password" className="ms-2 form-label">
                    New Password
                  </label>
                  <input
                    className="form-control fst-italic mb-3"
                    placeholder="********"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <i className="ms-1 fa fa-unlock-alt "></i>
                  <label htmlFor="confirmPassword" className="ms-2 form-label">
                    Confirm Password
                  </label>
                  <input
                    className="form-control fst-italic mb-3"
                    placeholder="********"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className=" text-center text-primary">
                <p>
                  <button
                    className="btn btn-primary w-100"
                    disabled={!password || !confirmPassword}
                  >
                    Update
                  </button>
                </p>
              </div>

              <div className=" text-center text-primary">
                <p>
                  <Link to="/login">
                    <em>Go to</em> <strong>Login</strong>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;

