require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const accountRouter = require("./routes/accountRoutes");
const transactionRouter = require("./routes/transactionRoutes")
// database
const connectDB = require("./db/connect");
const accountNumber = require("./middleware/deposit.middleware")
// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))

app.get("/", (req, res) => {
  res.send("<h1>Ledger</h1>");
});

app.use("/api/v1", accountRouter);
app.use("/api/v1", accountNumber, transactionRouter)


// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
