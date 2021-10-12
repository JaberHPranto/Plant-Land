import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import path from 'path';
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import blogRoutes from "./routes/blogRoute.js";
import orderRoutes from "./routes/orderRoutes.js";
import plantIdentifyRoutes from "./routes/plantIdentifyRoute.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
dotenv.config();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// middlewares
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

//routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/identify-plant",plantIdentifyRoutes)

// static folder
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, './uploads')))

// error handler
app.use(notFound);
app.use(errorHandler);

// connect to database
connectDB();

const PORT = process.env.PORT;
app.listen(PORT, (req, res) => {
  console.log(`Server started on port ${PORT}`);
});
