const express = require("express");
const connectDb = require("./database");
const urlRoutes = require("./api/urls/urls.routes");
const userRoutes = require("./api/users/users.routes");
const notFoundHandler = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");
const morgan = require("morgan");
const passport = require("passport");
const localStrategy = require("./middlewares/passport");
const app = express();
connectDb();

app.use(express.json());

//routes
app.use("/urls", urlRoutes);
app.use(userRoutes);

//middlwaress
app.use(notFoundHandler);
app.use(errorHandler);
app.use(morgan("dev"));
app.use(passport.initialize());
passport.use("local", localStrategy);

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
