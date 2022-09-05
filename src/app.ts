/** Express app for Lunchly. */

import express, { NextFunction } from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
const routes = require("./routes");

const app = express();

// Parse body for urlencoded (non-JSON) data
app.use(bodyParser.urlencoded({ extended: false }));

nunjucks.configure("templates", {
  autoescape: true,
  express: app
});

app.use(routes);

/** 404 handler */

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use((err: ExpressError, req: any, res: any, next: NextFunction) => {
  res.status(err.status || 500);

  return res.render("error.html", { err });
});

module.exports = app;
