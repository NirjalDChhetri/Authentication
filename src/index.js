import express from "express";
import connection from "./config/database.config.js";
import HttpException from "./exceptions/http.exception.js";
import userRoute from "./routes/user.route.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import sanitizer from "perfect-express-sanitizer";
import xss from "xss-clean";
import cors from "cors";

const app = express();
// 1) Global Middlewares
app.use(cors());

//Set security HTTP headers
app.use(helmet());

app.use(cors());
//Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Limit request for API
const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: "Too many request from this IP, Please try again later",
});
app.use("/", limiter);

//Data sanitization against SQL and NOSQL query injection
app.use(sanitizer.clean({ noSql: true, sql: true }));

//Data sanitization against XSS
app.use(xss());



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
  console.log("server has started in server 8000");
  try {
    await connection.authenticate();
    //connection.sync({ force: true});
    console.log("Connected to Database");
  } catch (err) {
    console.log(err);
    console.log("Error database Connection");
  }
});
