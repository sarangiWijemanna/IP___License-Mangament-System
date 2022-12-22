import _default from "concurrently";
import asyncHandler from "express-async-handler";
import License from "../Models/LicenseModel.js";
import nodemailer from "nodemailer";

// Add Period to Date
function addDays(date, days) {
  var result_1 = new Date(date);
  result_1.setDate(result_1.getDate() + days);
  return result_1;
}

// Remaining Days
function remainDays(endDate, today) {
  var endDate_1 = new Date(endDate);
  var today_1 = new Date(today);
  let result_2 = endDate_1.getDate() - today_1.getDate();
  return result_2;
}

// Email Sending
const emailGenerate = (id, remainDays, period,endDate,company_name,client_name,client_email) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
    },
  });

  var mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: process.env.AUTH_ADMIN_EMAIL,
    subject: "License Renewal & Expiration Reminder Emails",
    html: `<html>Hello {name},

    Your license for {product_name} is expiring within 30 days. It is time to renew and save 30% off of the original price.

    It is important to keep your license up to date in order to continue getting updates for {product_name} and continued support.

    If you wish to renew your license, simply click the link below and follow the instructions.

    Your license expires on: {expiration}.

    Your expiring license key is: {license_key}.

    Renew now: <em>http://localhost:1000/license/${id}/edit</em>.

    
    <strong>Best regards,
    Your Company</strong></html>`



  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent when license expired soon: " + info.response);
    }
  });
};

const expireDate = asyncHandler(async (req, res, next) => {

  const datePeriod = await License.find(
    {},
    {
      _id: 1,
      starting_date: 1,
      period_in_days: 1,
      company_name: 1,
      client_name: 1,
      client_email: 1,
    }
  );

  setInterval(() => {
    for (let i = 0; i < datePeriod.length; i++) {
      let readId = datePeriod[i]._id;

      if (readId) {
        // Details
        let company_name = datePeriod[i].company_name;
        let client_name = datePeriod[i].client_name;
        let client_email = datePeriod[i].client_email;
        // Valid Period
        let period = datePeriod[i].period_in_days;

        // Started Date
        let startedDate = datePeriod[i].starting_date;

        // Today
        var nowDate = new Date();
        var today =
          nowDate.getFullYear() +
          "-" +
          (nowDate.getMonth() + 1) +
          "-" +
          nowDate.getDate();

        // Due date of License
        let x = addDays(startedDate, period);
        let endDate =
          x.getFullYear() + "-" + (x.getMonth() + 1) + "-" + x.getDate();

        // Remaining Day
        let remainingDate = remainDays(endDate, today);

        if (remainingDate === 0) {
          //console.log("Your License is already expired..!");
        } else if (remainingDate < 10) {
          emailGenerate(readId,remainingDate, period,endDate,company_name,client_name,client_email);
        } else if (remainingDate > 10) {
          return 0;
        }
      }
    }
  }, 86400000);
});

export default expireDate;
