import React, { useState, useEffect } from "react";
import Toast from "../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  editLicense,
  updateLicense,
} from "./../../Redux/Actions/LicenseActions";

import { LICENSE_UPDATE_RESET } from "../../Redux/Constants/LicenseConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditLicenseMain = (props) => {
  const { licenseId } = props;
  const [company_name, setCompany_name] = useState("");
  const [client_name, setClient_name] = useState("");
  const [client_email, setClient_email] = useState("");

  const [serial, setSerial] = useState("");
  const [decrypt_check_variable, setDecrypt_check_variable] = useState("");
  const [product, setProduct] = useState("");
  const [speed, setSpeed] = useState("");
  const [num_mgmt_iface, setNum_mgmt_iface] = useState("");
  const [num_bridge_iface, setNum_bridge_iface] = useState("");
  const [mgmt_mac1, setMgmt_mac1] = useState("");
  const [mgmt_mac2, setMgmt_mac2] = useState("");
  const [inputFields, setInputFields] = useState([
    {
      id: 1,
      br_internal_mac: "",
      br_external_mac: "",
    },
  ]);
  const [period_in_days, setPeriod_in_days] = useState("");
  const [starting_date, setStarting_date] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const licenseEdit = useSelector((state) => state.licenseEdit);
  const { loading, error, license } = licenseEdit;

  const licenseUpdate = useSelector((state) => state.licenseUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = licenseUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: LICENSE_UPDATE_RESET });
      toast.success("License Updated", ToastObjects);
    } else {
      if (!license.serial || license._id !== licenseId) {
        dispatch(editLicense(licenseId));
      } else {
        setCompany_name(license.company_name);
        setClient_name(license.client_name);
        setClient_email(license.client_email);
        setSerial(license.serial);
        setDecrypt_check_variable(license.decrypt_check_variable);
        setProduct(license.product);
        setSpeed(license.speed);
        setNum_mgmt_iface(license.num_mgmt_iface);
        setNum_bridge_iface(license.num_bridge_iface);
        setMgmt_mac1(license.mgmt_mac1);
        setMgmt_mac2(license.mgmt_mac2);
        setInputFields(license.inputFields);
        setPeriod_in_days(license.period_in_days);
        setStarting_date(license.starting_date);
        setDescription(license.description);
      }
    }
  }, [license, dispatch, licenseId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateLicense({
        _id: licenseId,
        company_name,
        client_name,
        client_email,
        serial,
        decrypt_check_variable,
        product,
        speed,
        num_mgmt_iface,
        num_bridge_iface,
        mgmt_mac1,
        mgmt_mac2,
        inputFields,
        period_in_days,
        starting_date,

        description,
      })
    );
  };

  // Handle Change Input
  const handleChangeInput = (index, e) => {
    //e.target.value
    const data = [...inputFields];
    data[index][e.target.name] = e.target.value;
    setInputFields(data);
  };

  const addFields = (id) => {
    let newfield = { id: id + 2, br_external_mac: "", br_internal_mac: "" };
    setInputFields([...inputFields, newfield]);

    console.log(id);
  };

  // Remove feild
  const subFields = (index) => {
    const data = [...inputFields];
    data.splice(index, 1);
    setInputFields([...data]);
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/licenses" className="btn btn-danger text-white">
              Go to license
            </Link>
            <h2 className="content-title">Upgrade License</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <Loading />}
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="company_name" className="form-label">
                          Company Name
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="company_name"
                          required
                          value={company_name}
                          onChange={(e) => setCompany_name(e.target.value)}
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="client_name" className="form-label">
                          Client Name
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="client_name"
                          required
                          value={client_name}
                          onChange={(e) => setClient_name(e.target.value)}
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="client_email" className="form-label">
                          Client Email
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="client_email"
                          required
                          value={client_email}
                          onChange={(e) => setClient_email(e.target.value)}
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="serial" className="form-label">
                          Serial
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="serial"
                          required
                          value={serial}
                          onChange={(e) => setSerial(e.target.value)}
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="decrypt_check_variable"
                          className="form-label"
                        >
                          Decrypt Check Variable
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="decrypt_check_variable"
                          required
                          value={decrypt_check_variable}
                          onChange={(e) =>
                            setDecrypt_check_variable(e.target.value)
                          }
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="product" className="form-label">
                          Product
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product"
                          required
                          value={product}
                          onChange={(e) => setProduct(e.target.value)}
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="speed" className="form-label">
                          Speed
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="speed"
                          required
                          value={speed}
                          onChange={(e) => setSpeed(e.target.value)}
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="num_mgmt_iface" className="form-label">
                          Number Manamegemnt Interface
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="num_mgmt_iface"
                          required
                          value={num_mgmt_iface}
                          onChange={(e) => setNum_mgmt_iface(e.target.value)}
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="num_bridge_iface"
                          className="form-label"
                        >
                          Number Bridge Interface
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="num_bridge_iface"
                          required
                          value={num_bridge_iface}
                          onChange={(e) => setNum_bridge_iface(e.target.value)}
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="mgmt_mac1" className="form-label">
                          Nmgmt_mac1
                        </label>
                        <input
                          class="form-control"
                          id="mgmt_mac1"
                          required
                          value={mgmt_mac1}
                          onChange={(e) => setMgmt_mac1(e.target.value)}
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="mgmt_mac2" className="form-label">
                          Nmgmt_mac2
                        </label>
                        <input
                          class="form-control"
                          id="mgmt_mac2"
                          required
                          value={mgmt_mac2}
                          onChange={(e) => setMgmt_mac2(e.target.value)}
                        />
                          
                      </div>

                      {inputFields.map((input, index) => {
                        return (
                          <div key={index}>
                            <div class="row">
                              <div className="mb-4 col-sm">
                                <label
                                  htmlFor="br_external_mac"
                                  className="form-label"
                                >
                                  br_external_mac
                                </label>
                                <input
                                  type="text"
                                  placeholder="Type here"
                                  className="form-control"
                                  id="br_external_mac"
                                  required
                                  name="br_external_mac"
                                  value={input.br_external_mac}
                                  onChange={(e) => handleChangeInput(index, e)}
                                />
                              </div>

                              <div className="mb-4 col-sm">
                                <label
                                  htmlFor="br_internal_mac"
                                  className="form-label"
                                >
                                  br_internal_mac
                                </label>
                                <input
                                  type="text"
                                  placeholder="Type here"
                                  className="form-control"
                                  id="br_internal_mac"
                                  required
                                  name="br_internal_mac"
                                  value={input.br_internal_mac}
                                  onChange={(e) => handleChangeInput(index, e)}
                                />
                              </div>

                              <div className="mb-4 mt-2 col-auto">
                                <button
                                  onClick={() => addFields(index)}
                                  className="mt-4 btn btn-outline-danger btn-floating mr-5"
                                >
                                  <i className="fas fa-plus"></i>
                                </button>

                                <button
                                  disabled={inputFields.id === 1}
                                  onClick={() => subFields(index)}
                                  className="mt-4 btn btn-outline-success btn-floating"
                                >
                                  <i className="fas fa-minus"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      <div className="mb-4">
                        <label htmlFor="period_in_days" className="form-label">
                          Period in days
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="period_in_days"
                          required
                          value={period_in_days}
                          onChange={(e) => setPeriod_in_days(e.target.value)}
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="starting_date" className="form-label">
                          starting_date
                        </label>
                        <input
                          type="date"
                          placeholder="Type here"
                          className="form-control"
                          id="starting_date"
                          required
                          value={starting_date}
                          onChange={(e) => setStarting_date(e.target.value)}
                        />
                      </div>

                      <div className="mb-4">
                        <label className="form-label">Description</label>
                        <textarea
                          placeholder="Type here"
                          className="form-control"
                          rows="1"
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditLicenseMain;
