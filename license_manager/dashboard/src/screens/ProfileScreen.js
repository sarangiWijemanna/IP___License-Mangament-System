import React, { useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Message from "../components/LoadingError/Error";
import Toast from "../components/LoadingError/Toast";
import Loading from "../components/LoadingError/Loading";
import { toast } from "react-toastify";

import { updateUserProfile } from "../Redux/Actions/userActions";
import moment from "moment";
import Sidebar from './../components/sidebar';


const ProfileScreen = () => {
  window.scrollTo(0, 0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toastId = React.useRef(null);

  const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading: updateLoading } = userUpdateProfile;
 
  

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, user]); 

  const submitHandler = (e) => {
    e.preventDefault();
    // Password match
    if (password !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Password does not match", Toastobjects);
      }
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Profile Updated", Toastobjects);
      }
    }
  };

  return (
    <>
      <Sidebar />
        <main className="main-wrap">
        <Header />
        
       
          <section className="content-main" >
            <Toast />
              {error && <Message variant="alert-danger">{error}</Message>}
              {loading && <Loading />}
              {updateLoading && <Loading />}
          
            <form onSubmit={submitHandler}>

              <div class="container">

                <div className="content-header"> 
                  <h2 className="content-title">Profile</h2>
                </div>

            <div className="card" >

              <div className="card-body">

              <div className="container-fluid">
                    <div className="row">
                      <div className="col">
                  
                        <div className="author-card-details col-md-7">                
                          <h5 className="author-card-name mb-4">
                            User:
                            <strong>&nbsp;{userInfo.name}</strong>
                          </h5>

                          <span className="author-card-position">
                            <>Joined: {moment(userInfo.createdAt).format("LLL")}</>
                          </span>
                            
                          
                        </div>


                      </div>  
                    

                    
                      <div className="col">

                        <div className="col-auto mb-4">
                          <div className="form">
                            <label for="account-fn">UserName</label>
                            <input
                              className="form-control"
                              type="text"
                              required
                              value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-auto mb-4">
                    <div className="form">
                      <label for="account-email">E-mail Address</label>
                      <input
                        className="form-control"
                        type="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-auto mb-4">
                    <div className="form">
                      <label for="account-pass">New Password</label>
                      <input
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-auto mb-4">
                    <div className="form">
                      <label for="account-confirm-pass">Confirm Password</label>
                      <input
                        className="form-control"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div
                  class="nav align-items-start flex-column col-12 nav-pills me-3 "
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button type="submit" class="nav-link active mb-4"
                    id="v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-home"
                    
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true">Update Profile</button>
                        
                      </div>  
                    </div>
                  </div>
                  </div>
          
          
          
                </div>
                
            

            </div>
          </div>
        </form>
      </section>
    </main>

                  
                  
                  


                  



            
            


    </>
  );
};

export default ProfileScreen;
