import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LICENSE_CREATE_RESET } from "../../Redux/Constants/LicenseConstants";
import { createLicense } from "./../../Redux/Actions/LicenseActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddLicenseMain = () => {
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

  const licenseCreate = useSelector((state) => state.licenseCreate);
  const { loading, error, license } = licenseCreate;

  // Error
  const [company_name_Err, setCompany_name_Err] = useState({});
  const [client_name_Err, setclient_name_Err] = useState({});
  const [client_email_Err, setclient_email_Err] = useState({});
  const [serial_Err, setserial_Err] = useState({});
  const [decrypt_check_variable_Err, setdecrypt_check_variable_Err] = useState({});
  const [product_Err, setproduct_Err] = useState({});
  const [mgmt_mac1_Err, setmgmt_mac1_Err] = useState({});
  const [mgmt_mac2_Err, setmgmt_mac2_Err] = useState({});
  const [description_Err, setdescription_Err] = useState({});

  useEffect(() => {
    if (license) {
      toast.success("License Added", ToastObjects);
      dispatch({ type: LICENSE_CREATE_RESET });
 
    }
  }, [license, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Input Valdation
    const isValid = formValidation();

    if (isValid) 
      dispatch(
        createLicense(
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
          description
        )
      );

  };

// Form Validation
const formValidation = () => {
  const company_name_Err = {};
  const client_name_Err = {};
  const client_email_Err = {};
  const serial_Err = {};
  const decrypt_check_variable_Err = {};
  const product_Err = {};
  const mgmt_mac1_Err = {};
  const mgmt_mac2_Err = {};
  const description_Err = {};
  //const inputFields_Err = {};

  let isValid = true;

  // Comapny Name Validation
  if (company_name < 0) {
    company_name_Err.company_name_Invalid = "Comapny Name is Invalid.";
    isValid = false;
  }
  if (company_name.trim().length < 3 || company_name.trim().length === 0) {
    company_name_Err.company_name_Short =
      "Company Name is too Short or Empty.";
    isValid = false;
  }

  if (company_name.trim().length > 20) {
    company_name_Err.company_name_Long = "Company Name is too Long.";
    isValid = false;
  }

  // Client Name Validation
  if (
    client_name < 0 ||
    !isNaN(client_name.replace(/\s+/g, "")) ||
    client_name.match(/\d+/g)
  ) {
    client_name_Err.client_name_Invalid = "Client Name is Invalid.";
    isValid = false;
  }
  if (client_name.trim().length < 3 || client_name.trim().length === "") {
    client_name_Err.client_name_Short = "Client Name is too Short or Empty.";
    isValid = false;
  }

  if (client_name.trim().length > 30) {
    client_name_Err.client_name_Long = "Client Name is too Long.";
    isValid = false;
  }

  // Email Validation
  if (client_email.trim().length < 7 || client_email === "") {
    client_email_Err.client_email_Err_Short =
      "Client Email is too Short or Empty.";
    isValid = false;
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(client_email)) {
    client_email_Err.client_email_Err_Invalid = "Client Email is Invalid.";
    isValid = false;
  }

  // Serial Validation
  if (serial.trim().length < 2 || serial.trim().length === "") {
    serial_Err.serial_Err_Short = "Serial is too Short or Empty.";
    isValid = false;
  }
  if (serial < 0) {
    serial_Err.serial_Err_Invalid = "Serial is Invalid.";
    isValid = false;
  }

  // decrypt_check_variable Validation
  if (
    decrypt_check_variable < 0 ||
    isNaN(decrypt_check_variable.replace(/\s+/g, ""))
  ) {
    decrypt_check_variable_Err.decrypt_check_variable_Invalid =
      "Decrypt_Check_Variable is Invalid.";
    isValid = false;
  }

  // Product Input Validation
  if (product < 0) {
    product_Err.product_Invalidd = "Product is Invalid.";
    isValid = false;
  }

  // mgmt_mac1 Input validation
  if (
    !/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}\\.[0-9a-fA-F]{4}\\.[0-9a-fA-F]{4})/i.test(
      mgmt_mac1
    )
  ) {
    mgmt_mac1_Err.mgmt_mac1_Err_Invalid = "Mgmt_mac1 must be Mac Address.";
    isValid = false;
  }

  // mgmt_mac2 Input validation
  if (
    !/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}\\.[0-9a-fA-F]{4}\\.[0-9a-fA-F]{4})/i.test(
      mgmt_mac2
    )
  ) {
    mgmt_mac2_Err.mgmt_mac2_Err_Invalid = "Mgmt_mac2 must be Mac Address.";
    isValid = false;
  }

  // mgmt_mac2 Input validation
  if (
    !/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}\\.[0-9a-fA-F]{4}\\.[0-9a-fA-F]{4})/i.test(
      mgmt_mac2
    )
  ) {
    mgmt_mac2_Err.mgmt_mac2_Err_Invalid = "Mgmt_mac2 must be Mac Address.";
    isValid = false;
  }

  // Description Validation
  if (description.trim().length < 5 || description === "") {
    description_Err.description_Err_Short =
      "Description must be greate than 5.";
    isValid = false;
  }

  // Update Error Object
  setCompany_name_Err(company_name_Err);
  setclient_name_Err(client_name_Err);
  setclient_email_Err(client_email_Err);
  setserial_Err(serial_Err);
  setdecrypt_check_variable_Err(decrypt_check_variable_Err);
  setproduct_Err(product_Err);
  setmgmt_mac1_Err(mgmt_mac1_Err);
  setmgmt_mac2_Err(mgmt_mac2_Err);
  setdescription_Err(description_Err);
 
  return isValid;
};

  // Handle Change Input
  const handleChangeInput = (index, e) => {
    //e.target.value
    const data = [...inputFields];
    data[index][e.target.name] = e.target.value;
    setInputFields(data);
  };

  // Add feild
  const addFields = (id) => {
    let newfield = { id: id + 2, br_external_mac: "", br_internal_mac: "" };
    setInputFields([...inputFields, newfield]);
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
              Go to License
            </Link>
            <h2 className="content-title">License Generator</h2>
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
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}

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
                    {Object.keys(company_name_Err).map((key) => {
                      return (
                        <div>
                          <small className="text-danger">
                            <em>{company_name_Err[key]}</em>
                          </small>
                        </div>
                      );
                    })}
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
                    {Object.keys(client_name_Err).map((key) => {
                      return (
                        <div>
                          <small className="text-danger">
                            <em>{client_name_Err[key]}</em>
                          </small>
                        </div>
                      );
                    })}
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
                    {Object.keys(client_email_Err).map((key) => {
                      return (
                        <div>
                          <small className="text-danger">
                            <em>{client_email_Err[key]}</em>
                          </small>
                        </div>
                      );
                    })}
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
                    {Object.keys(serial_Err).map((key) => {
                      return (
                        <div>
                          <small className="text-danger">
                            <em>{serial_Err[key]}</em>
                          </small>
                        </div>
                      );
                    })}
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
                    {Object.keys(decrypt_check_variable_Err).map((key) => {
                      return (
                        <div>
                          <small className="text-danger">
                            <em>{decrypt_check_variable_Err[key]}</em>
                          </small>
                        </div>
                      );
                    })}
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
                    {Object.keys(product_Err).map((key) => {
                      return (
                        <div>
                          <small className="text-danger">
                            <em>{product_Err[key]}</em>
                          </small>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="speed" className="form-label">
                      Speed
                    </label>
                    <input
                      type="number"
                      min={0}
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
                      Number of Manamegemnt Interface
                    </label>
                    <input
                      type="number"
                      min={0}
                      placeholder="Type here"
                      className="form-control"
                      id="num_mgmt_iface"
                      required
                      value={num_mgmt_iface}
                      onChange={(e) => setNum_mgmt_iface(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="num_bridge_iface" className="form-label">
                      Number of Bridge Interface
                    </label>
                    <input
                      type="number"
                      min={0}
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
                      type="text"
                      id="mgmt_mac1"
                      required
                      value={mgmt_mac1}
                      onChange={(e) => setMgmt_mac1(e.target.value)}
                   />
                   {Object.keys(mgmt_mac1_Err).map((key) => {
                      return (
                        <div>
                          <small className="text-danger">
                            <em>{mgmt_mac1_Err[key]}</em>
                          </small>
                        </div>
                      );
                    })}
                     
                  </div>

                  <div className="mb-4">
                    <label htmlFor="mgmt_mac2" className="form-label">
                      Nmgmt_mac2
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      id="mgmt_mac2"
                      required
                      value={mgmt_mac2}
                      onChange={(e) => setMgmt_mac2(e.target.value)}
                   />
                     {Object.keys(mgmt_mac2_Err).map((key) => {
                      return (
                        <div>
                          <small className="text-danger">
                            <em>{mgmt_mac2_Err[key]}</em>
                          </small>
                        </div>
                      );
                    })}
                  </div>

                  {Object.keys(inputFields).map((input, index) => {
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
                      min={0}
                      placeholder="Type here"
                      className="form-control"
                      id="period_in_days"
                      required
                      value={period_in_days}
                      onChange={(e) => setPeriod_in_days(e.target.value)}
                    />
                  </div>

                  <div className="mb-4 nativeDatePicker">
                    <label htmlFor="starting_date" className="form-label">
                      Starting Date
                    </label>
                    <input
                      type="date"
                      placeholder="Type here"
                      className="form-control"
                      id="starting_date"
                      required
                      pattern="\d{2}-\d{2}-\d{4}"
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
                     {Object.keys(description_Err).map((key) => {
                      return (
                        <div>
                          <small className="text-danger">
                            <em>{description_Err[key]}</em>
                          </small>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddLicenseMain;
