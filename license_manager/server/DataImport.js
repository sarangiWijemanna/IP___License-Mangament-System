import express from "express";

import User from "./Models/UserModel.js";
import users from "./data/users.js";

import License from "./Models/LicenseModel.js";
import licenses from "./data/Licenses.js";

import asyncHandler from "express-async-handler";

const ImportData = express.Router();

ImportData.post(
  "/user",
  asyncHandler(async (req, res) => {
    await User.remove({});
    const importUser = await User.insertMany(users);
    res.send({ importUser });
  })
);

ImportData.post(
  "/licenses",
  asyncHandler(async (req, res) => {
    await License.remove({});
    const importLicenses = await License.insertMany(licenses);
    res.send({ importLicenses });
  })
);

export default ImportData;
