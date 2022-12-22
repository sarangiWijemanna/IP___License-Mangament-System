import React from "react";

const Main = () => {
  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"> Dashboard </h2>
        </div>

        <div className="card-body">
          <div className="card card-license-grid shadow-sm p-0 mb-0 bg-white rounded">
            <div className="info-wrap">
              <div class="container">
                <div class="row ">
                  <div class="col justify-content-left text-left">
                    <img
                      className="img-lg rounded mx-auto "
                      src="images/favicon.png"
                      alt="User pic"
                    />
                  </div>

                  <div class="row ">
                    <h5>
                      <strong>
                        License Generation & Managment System
                      </strong>
                    </h5>
                    <div class="row mb-4">&nbsp;&nbsp;&nbsp;Version: 1.0</div>

                    <div class="container mb-4">
                      <div class="row ">
                        <div class="col-auto">
                          <button class="btn btn-light" type="button" disabled>
                            <span
                              class="spinner-grow spinner-grow-sm text-primary"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            &nbsp;<em>Add License</em>
                          </button>
                        </div>
                        <div class="col-auto">
                          <button
                            class="btn btn-light text-sm"
                            type="button"
                            disabled
                          >
                            <span
                              class="spinner-grow spinner-grow-sm "
                              role="status"
                              aria-hidden="true"
                            ></span>
                            &nbsp;<em>View License</em>
                          </button>
                        </div>
                        <div class="col-auto">
                          <button
                            class="btn btn-light text-sm"
                            type="button"
                            disabled
                          >
                            <span
                              class="spinner-grow spinner-grow-sm text-primary"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            &nbsp;<em>Upgrade License</em>
                          </button>
                        </div>
                        <div class="col-auto">
                          <button
                            class="btn btn-light text-sm"
                            type="button"
                            disabled
                          >
                            <span
                              class="spinner-grow spinner-grow-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            &nbsp;<em>Download License</em>
                          </button>
                        </div>
                        <div class="col-auto">
                          <button
                            class="btn btn-light text-sm"
                            type="button"
                            disabled
                          >
                            <span
                              class="spinner-grow spinner-grow-sm text-primary"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            &nbsp;<em>Delete License</em>
                          </button>
                        </div>
                        <div class="col-auto">
                          <button
                            class="btn btn-light text-sm"
                            type="button"
                            disabled
                          >
                            <span
                              class="spinner-grow spinner-grow-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            &nbsp;<em>License Expire Reminder</em>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;
