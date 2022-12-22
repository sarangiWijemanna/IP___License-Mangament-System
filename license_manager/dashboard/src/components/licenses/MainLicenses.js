import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import License from "./License";
import { useDispatch, useSelector } from "react-redux";
import { listLicenses } from "../../Redux/Actions/LicenseActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const MainLicenses = (props) => {
  const { keyword } = props;
  const dispatch = useDispatch();

  const licenseList = useSelector((state) => state.licenseList);
  const { loading, error, licenses } = licenseList;

  const licenseDelete = useSelector((state) => state.licenseDelete);
  const { error: errorDelete, success: successDelete } = licenseDelete;

  const licensetDownload = useSelector((state) => state.licenseDownload);
  const { error: errorDownload, success: successDownload} = licensetDownload;

  useEffect(() => {
    dispatch(listLicenses(keyword));
  }, [dispatch, keyword, successDelete, successDownload]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">License</h2>
        <div>
          <Link to="/addlicense" className="btn btn-primary">
            Create New License
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">

          </div>
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}

          {errorDownload && (
            <Message variant="alert-danger">{errorDownload}</Message>
          )}

          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row">
              {/* Licenses */}
              {licenses.map((license) => (
                <License license={license} key={license._id} />
              ))}
            </div>
          )}

          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Previous
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default MainLicenses;
