//@ts-check
require("dotenv").config();
// @ts-ignore
require("express-async-errors");
const http = require("http");
// @ts-ignore
const express = require("express");

const app = express();
const accountRouter = require("./routes/accounts");
const transfersRouter = require("./routes/transfers");

// database
const connectDB = require("./db/index");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// @ts-ignore
app.use(express.json());
// @ts-ignore
app.use(
  express.urlencoded({
    extended: true,
  })
);

// @ts-ignore
app.get("/", (req, res) => {
  res.send("Ledger");
});

// @ts-ignore
app.use("/api/v1/accounts", accountRouter);
// @ts-ignore
app.use("/api/v1/transfers", transfersRouter);

// middleware
// @ts-ignore
app.use(notFoundMiddleware);
// @ts-ignore
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    // @ts-ignore
    const server = http.createServer(app);
    server.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
