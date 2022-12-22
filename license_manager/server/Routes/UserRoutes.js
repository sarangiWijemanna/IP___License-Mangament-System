import express from "express";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../Middleware/AuthMiddleware.js";
import generateToken from "../utils/generateToken.js";
import User from "./../Models/UserModel.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();
const userRouter = express.Router();

// EMAIL CONFIG
let transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  //secure: true,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

// LOGIN
userRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);

// REGISTER
userRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);

// PROFILE
userRouter.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// UPDATE PROFILE
userRouter.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        createdAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// GET ALL USER ADMIN
userRouter.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);

// FORGET PASSWORD - SEND EMAIL LINK FOR RESET PASSWORD
userRouter.post(
  "/sendpasswordlink",
  asyncHandler(async (req, res) => {
    //console.log(req.body)

    const { email } = req.body;

    if (!email) {
      res.status(401).json({ status: 401, message: "Enter Your Valid Email" });
    }

    try {
      const userFind = await User.findOne({ email });
      //console.log("userFind.........", userFind)

      // token generate for reset password
      const token = jwt.sign({ _id: userFind._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      //console.log(token)

      const setusertoken = await User.findByIdAndUpdate(
        { _id: userFind._id },
        { verifytoken: token },
        { new: true }
      );
      //console.log("setusertoken",setusertoken )

      if (setusertoken) {
        const mailOptions = {
          from: process.env.AUTH_EMAIL,
          to: email,
          subject: "Sending Email for password Reset",
          text: `This link valid for 1 day http://localhost:1000/passwordreset/${userFind.id}/${setusertoken.verifytoken}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error", error);
            res.status(401).json({ status: 401, message: "Email Not sent" });
          } else {
            console.log("Email sent succesfully", info.response);
            res
              .status(201)
              .json({ status: 201, message: "Email sent succesfully" });
          }
        });
      }

    } catch (error) {
      res.status(401).json({ status: 401, message: "Invalid User" });
    }
  })
);

// VERIFY USER FOR FORGOT PASSWORD TIME
userRouter.get(
  "/passwordreset/:id/:token",
  asyncHandler(async (req, res) => {
    const { id, token } = req.params;
    //console.log("id........",id, "token..........",token)

    try {
      const ValidUser = await User.findOne({ _id: id, verifytoken: token });

      const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

      if (ValidUser && verifyToken._id) {
        res.status(201).json({ status: 201, ValidUser });
        console.log("Valid User and Verify Token");
      } else {
        res.status(401).json({ status: 401, message: "user not exist" });
        console.log("Not Valid User or Not Verify Token");
      }
    } catch (error) {
      res.status(401).json({ status: 401, error });
    }
  })
);

// CHANGE PASSWORD
userRouter.put(
  "/:id/:token",

  asyncHandler(async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    try {
      const validuser = await User.findOne({ _id: id, verifytoken: token });

      const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

      if (validuser && verifyToken._id) {
        validuser.password = password || validuser.password;

        const setnewuserpass = await validuser.save();

        res.status(201).json({ status: 201, setnewuserpass });
      } else {
        res
          .status(401)
          .json({ status: 401, message: "User Not Exist or Error Occurs" });
      }
    } catch (error) {
      res
        .status(403)
        .json({
          status: 403,
          message: "Token Expired ..! Generate New Rest Link..! or Error Occured in Server",
        });
    }
  })
);

export default userRouter;
