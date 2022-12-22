import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteLicense,downloadLicense } from "../../Redux/Actions/LicenseActions";

import Moment from 'react-moment';

const License = (props) => {
  const { license } = props;
  const dispatch = useDispatch();

  const deletehandler = (id) => {
    if (window.confirm("Are you sure??")) {
      dispatch(deleteLicense(id));
    }
  };

  const downloadhandler = (id) => { 

  if (window.confirm("Do you want to download??")){
    dispatch(downloadLicense(id));
  } 
  };

  //today - date and time
  let Today = new Date(); 

  // Purched Day
  let PurchedDate = new Date(license.starting_date);
  let validTimePeriod = (license.period_in_days);

  // Due date of License
  PurchedDate.setDate(PurchedDate.getDate()+validTimePeriod); 
  let EndedDate = PurchedDate.toDateString();
  let ExpiredDate = new Date(EndedDate);

  // Check Reaming Dates to expire the License
  const EndDate = () =>{   
 
    let difference = ExpiredDate.getTime() - Today.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

    if (TotalDays === 0){
      
      var result_1 = `${TotalDays} (Expire soon)`
      return result_1;
    } 
    
    else if(TotalDays < 0){
      var result_2 = `(License Expired) ${-TotalDays} Days Before.`
      return result_2 
    }

    else if(TotalDays > 0){
      var result_3 = `${TotalDays}`
      return result_3 
    }
      
    else{
      return "Error Occured..."
    }
  }

  return (
    <>
      <div className="card-body">

        <div className="card card-license-grid shadow-sm p-0 mb-0 bg-white rounded">

          <div className="info-wrap">

          <div class="container">

            <div class="row ">

              <div class="col justify-content-left text-left">

                <div className="price license_color">
                  Product:  {license.product}
                </div>

                <Link to="#" className="title text-truncate mb-2">
                  Serial: {license.serial}
                </Link>

                <Link to="#" className="title  text-dark">
                  <p>Company Name: {license.company_name}</p>
                </Link>

                <Link to="#" className="title text-truncate text-dark">
                  <p> Client Name: {license.client_name} </p>
                </Link>

                <Link to="#" className="title text-truncate  mb-1">
                  <p><em> Purches Date: {license.starting_date} </em></p>
                </Link>

                <Link to="#" className="title text-truncate text-dark">
                  <p> End Date: 
                    <Moment format="YYYY-MM-DD">
                      {ExpiredDate}
                    </Moment>
                  </p>
                </Link>

                <Link to="#" className="text-success fst-italic">
                  <p><em> Remaining Days:  {EndDate()}</em></p>
                </Link>
                
              </div>

              <div class="col-auto">

                  <Link
                    to={`/license/${license._id}/edit`}
                    className="btn btn-outline-primary btn-floating "
                  >
                    <i className="col-sm fas fa-pen"></i>
                  </Link>
                
                  <Link
                    to="#"
                    onClick={() => deletehandler(license._id)}
                    className="btn btn-outline-danger btn-floating"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </Link>

                  <Link
                    to="#"
                    onClick={() => downloadhandler(license._id)}
                    className="btn btn-outline-success btn-floating"
                  >
                    <i className="fas fa-download"></i>
                  </Link>
                
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default License;
