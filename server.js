import express from "express";
import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

// Auth
import userRoutes from "./routes/userRoutes.js";

// Product
import productRoutes from "./routes/productRoutes.js";

// Category
import categoryRoutes from "./routes/categoryRoutes.js";

// Order
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

//cloudinary Config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Rest Object
const app = express();

// Middlewares
app.use(helmet());
app.use(mongoSanitize());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Api
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cat", categoryRoutes);
app.use("/api/v1/order", orderRoutes);

const PORT = process.env.PORT || 8000;

// Database and Server running
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server Running On PORT ${process.env.PORT} on ${process.env.NODE_ENV} Mode and Database connected`
          .bgMagenta.white
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
