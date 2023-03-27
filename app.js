const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");
require("dotenv").config();

//Routes
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const subcategoryRoutes = require("./routes/subcategory");
const productRoutes = require("./routes/product");
const cloudinaryRoutes = require("./routes/cloudinary");
const couponRouter = require("./routes/coupon");
const reservationRoutes = require("./routes/reservation");
const stripeRoutes = require("./routes/stripe");
const orderRoutes = require("./routes/order");
const contactRoutes = require("./routes/contact");
const pressRoutes = require("./routes/press");

const app = express();


//middlewares
app.use(bodyParser.json({ limit: "2mb" }));
app.use(morgan("dev"));
app.use(cors());

app.use("/",(req,res,next)=>{
  res.send("Hi");
})

//routes middleware
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", subcategoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cloudinaryRoutes);
app.use("/api", couponRouter);
app.use("/api", reservationRoutes);
app.use("/api", stripeRoutes);
app.use("/api", orderRoutes);
app.use("/api", contactRoutes);
app.use("/api", pressRoutes);

//port
const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED!");
    const server = app.listen(port, () =>
    console.log(`Server is running on port ${port}`)
);
  })
  .catch((err) => console.log("DB CONNECTION ERR", err));



