const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/Scaffoldzoid", {
    //connect to this address of database of name users-authentication if present else will create one
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((e) => {
    console.log(`error is ${e}`);
  });
