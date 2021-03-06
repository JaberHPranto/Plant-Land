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


//routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/identify-plant", plantIdentifyRoutes)

app.get("/api/config/paypal",(req,res)=>res.send(process.env.PAYPAL_CLIENT_ID))

// static folder
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, './uploads')))

// for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname,'../','client', 'build', 'index.html'))
  })
}
 else {
  app.get("/", (req, res) => {
    res.send("Hello world");
  });
}



// error handler
app.use(notFound);
app.use(errorHandler);

// connect to database
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  console.log(`Server started on port ${PORT}`);
});
