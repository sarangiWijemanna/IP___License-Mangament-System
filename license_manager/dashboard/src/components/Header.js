import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import $ from "jquery";
import { useDispatch } from "react-redux";
import { listLicenses } from "../Redux/Actions/LicenseActions";
import { logout } from "../Redux/Actions/userActions";

const Header = () => {
  const [keyword, setKeyword] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    $("[data-trigger]").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var offcanvas_id = $(this).attr("data-trigger");
      $(offcanvas_id).toggleClass("show");
    });

    $(".btn-aside-minimize").on("click", function () {
      if (window.innerWidth < 768) {
        $("body").removeClass("aside-mini");
        $(".navbar-aside").removeClass("show");
      } else {
        // minimize sidebar on desktop
        $("body").toggleClass("aside-mini");
      }
    });
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listLicenses(keyword));
  };

  const search = (keyword) => {
      dispatch(listLicenses(keyword));
  };

  return (
    <header className="main-header navbar">
      <div className="col-search">
        <form onSubmit={submitHandler} className="searchform">
          <div className="input-group">
            <input
              list="search_terms"
              type="text"
              className="form-control"
              placeholder="Search term"
              onChange={(e) => setKeyword(e.target.value)}
            />

            <button className="btn btn-light bg" type="button"
              onClick={() => search(keyword)}
              >
              <i className="far fa-search"></i>
            </button>

          </div>

        </form>
      </div>

      <div className="col-nav">
        <button
          className="btn btn-icon btn-mobile me-auto"
          data-trigger="#offcanvas_aside"
        >
          <i className="md-28 fas fa-bars"></i>
        </button>

        <ul className="nav">
          <li className="dropdown nav-item">
            <Link className="dropdown-toggle" data-bs-toggle="dropdown" to="#">
              <img
                className="img-xs rounded-circle"
                src="/images/favicon.png"
                alt="User"
              />
            </Link>

            <div className="dropdown-menu dropdown-menu-end">              
              <Link className="dropdown-item" to="/">             
              <NavLink
                activeClassName="active"
                //className="menu-link"
                to="/profile"
              >
                <i className="icon fas fa-user-circle"></i>
                <span>&nbsp; My profile</span>
                </NavLink>

              </Link>
              
              <Link
                onClick={logoutHandler}
                className="dropdown-item text-danger"
                to="#"
              >
                <i className="icon fas fa-sign-out"></i>
                &nbsp; Log Out
              </Link>
              
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
