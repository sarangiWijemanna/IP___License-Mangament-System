import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";

import ImportData from "./DataImport.js";
import licenseRoute from "./Routes/LicenseRoutes.js";

import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Routes/UserRoutes.js";
import expireDate from "./Process/ExpireDate.js";

dotenv.config();
connectDatabase();
expireDate();

const app = express();

app.use(express.json());

// API
app.use("/api/import", ImportData);
app.use("/api/licenses", licenseRoute);
app.use("/api/users", userRouter);

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server run in port ${PORT}`));


