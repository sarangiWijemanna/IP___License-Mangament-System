import express from "express";
import asyncHandler from "express-async-handler";
import License from "../Models/LicenseModel.js";
import { admin, protect } from "../Middleware/AuthMiddleware.js";

const licenseRoute = express.Router();

// GET ALL LICENSE
licenseRoute.get(
  "/search/:keyword",
  asyncHandler(async (req, res) => {
    const keyword = req.params.keyword
      ? { 
          $or:[
            {
              company_name: {
                $regex: req.params.keyword,
                $options: "i",
              },
            },
            {
              client_name: {
                $regex: req.params.keyword,
                $options: "i",
              },
            },
            {
              client_email: {
                $regex: req.params.keyword,
                $options: "i",
              },
            },
            {
              serial: {
                $regex: req.params.keyword,
                $options: "i",
              },
            }
          ],
        }
      : {};
    const licenses = await License.find({ ...keyword })
      .sort({ _id: -1 });
    res.json(licenses);
  })
);

// ADMIN GET ALL LICENSE WITHOUT SEARCH AND PEGINATION
licenseRoute.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const licenses = await License.find({}).sort({ product: 1 });
    res.json(licenses);
  })
);

// GET SINGLE LICENSE
licenseRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const license = await License.findById(req.params.id);
    if (license) {
      res.json(license);
    } else {
      res.status(404);
      throw new Error("License not Found");
    }
  })
);

// DELETE LICENSE
licenseRoute.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const license = await License.findById(req.params.id);
    if (license) {
      await license.remove();
      res.json({ message: "License deleted" });
    } else {
      res.status(404);
      throw new Error("License not Found");
    }
  })
);

// CREATE LICENSE
licenseRoute.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const {
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
    } = req.body;

    const licenseExist = await License.findOne({ serial });
    if (licenseExist) {
      res.status(400);
      throw new Error("License is already exist");
    } else {
      const license = new License({
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
        user: req.user._id,
      });
      if (license) {
        const createdlicense = await license.save();
        res.status(201).json(createdlicense);
      } else {
        res.status(400);
        throw new Error("Invalid license data");
      }
    }
  })
);

// UPDATE LICENSE
licenseRoute.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const {
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
    } = req.body;

    const license = await License.findById(req.params.id);
    if (license) {
      license.company_name = company_name || license.company_name;
      license.client_name = client_name || license.client_name;
      license.client_email = client_email || license.client_email;

      license.serial = serial || license.serial;
      license.decrypt_check_variable = decrypt_check_variable || license.decrypt_check_variable;
      license.product = product || license.product;
      license.speed = speed || license.speed;
      license.num_mgmt_iface = num_mgmt_iface || license.num_mgmt_iface;
      license.num_bridge_iface = num_bridge_iface || license.num_bridge_iface;
      license.mgmt_mac1 = mgmt_mac1 || license.mgmt_mac1;
      license.mgmt_mac2 = mgmt_mac2 || license.mgmt_mac2;
      license.inputFields = inputFields || license.inputFields;
      license.period_in_days = period_in_days || license.period_in_days;
      license.starting_date = starting_date || license.starting_date;
      license.description = description || license.description;
      const updatedLicense = await license.save();
      res.json(updatedLicense);
    } else {
      res.status(404);
      throw new Error("License not found");
    }
  })
);

// DOWNLOAD LICENSE
licenseRoute.get(
  "/download/:id",
  asyncHandler(async (req, res) => {
    const license = await License.findById(req.params.id);

    const licenseModel = {};
    licenseModel["decrypt_check_variable"]= license.decrypt_check_variable;
    licenseModel["product"]= license.product;
    licenseModel["speed"]= license.speed; 
    licenseModel["num_mgmt_iface"]= license.num_mgmt_iface;
    licenseModel["num_bridge_iface"]= license.num_bridge_iface;
    licenseModel["mgmt_mac1"]= license.mgmt_mac1;
    licenseModel["mgmt_mac2"]= license.mgmt_mac2;

    const license1 = await License.find({},{inputFields:1, _id:0})
    let readId = license1[2].inputFields;

    for (let i = 0; i < readId.length; i++) {
      if (i === 0){
        licenseModel["br_external_mac"]= readId[i].br_external_mac;
        licenseModel["br_internal_mac"]= readId[i].br_internal_mac;
      }else {
        var brId = String(i);
        var br_external_mac_string = ["br_external_mac",brId].join('');
        var br_internal_mac1_string = ["br_internal_mac",brId].join('');
        licenseModel[br_external_mac_string]= readId[i].br_external_mac;
        licenseModel[br_internal_mac1_string]= readId[i].br_internal_mac;
      }

    } 
    licenseModel["period_in_days"]= license.period_in_days;
    var date_string = license.starting_date;
    var date = date_string.split("-");
    var year = parseInt(date[0]);
    var month = parseInt(date[1]);
    var day = parseInt(date[2]);
    licenseModel["starting_year"]= year;
    licenseModel["starting_month"]= month;
    licenseModel["starting_date"]= day;
    licenseModel["serial"]= license.serial;
    //const cryptr = new Cryptr("0");
    //cryptr.encrypt( ),
    if (licenseModel) {
      res.json(licenseModel);
    } else {
      res.status(404);
      throw new Error("License not Found");
    }
  })
);

export default licenseRoute;
