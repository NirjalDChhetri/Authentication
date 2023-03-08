import express from "express";
import connection from "./config/database.config.js";
import HttpException from "./exceptions/http.exception.js";
import userRoute from './routes/user.route.js'



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", userRoute);


//if Routes Not Found
app.use((req, res, next) => {
  const err = new HttpException(404, "Route doesnot exist");
  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  err.success = false;
  err.status = err.status || 500;
  err.message = err.message || "Something went wrong";
  err.stack = err.stack;
  err.data = err.data || null;

  res.status(err.status).json({
    success: err.success,
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err.errors,
    data: err.data,
  });
});

app.listen(8000, async () => {
  console.log("server has started");
  try {
    await connection.authenticate();
    connection.sync({ force: true});
    console.log("Connected to Database");
  } catch (err) {
    console.log(err)
    console.log("Error database Connection");
  }
});
