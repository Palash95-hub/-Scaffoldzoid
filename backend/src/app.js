const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const session = require("express-session");

const app = express();

const session_secret = "orange";

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(
  session({
    secret: session_secret,
    cookie: { maxAge: 1 * 60 * 60 * 1000 },
  })
);

// const port = process.env.PORT || 9999;

require("./db/connection");

const Seller = require("./models/seller");
const Buyer = require("./models/buyer");
const Orange = require("./models/orange_type");

const isNullOrUndefined = (val) => val === null || val === undefined;
const SALT = 5;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/sellers", async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.send(sellers);
  } catch (e) {
    res.send(e);
  }
});

app.post("/sellersignup", async (req, res) => {
  const { userName, email, password, confirmPassword } = req.body;
  const existingUser = await Seller.findOne({ email });
  if (
    isNullOrUndefined(existingUser) &&
    password !== "" &&
    password === confirmPassword &&
    email !== ""
  ) {
    const hashedPwd = bcrypt.hashSync(password, SALT);
    const newSeller = new Seller({ userName, email, password: hashedPwd });
    await newSeller.save();
    req.session.userId = newSeller._id;
    res.status(201).send({ success: "Signed up" });
  } else if (isNullOrUndefined(existingUser) && password !== confirmPassword) {
    res.status(400).send({ err: "Password didn't matched" });
  } else {
    res.status(400).send({
      err: `Invalid data.`,
    });
  }
});

app.post("/buyersignup", async (req, res) => {
  const { userName, email, password, confirmPassword } = req.body;
  const existingUser = await Buyer.findOne({ email });
  if (
    isNullOrUndefined(existingUser) &&
    password !== "" &&
    password === confirmPassword &&
    email !== ""
  ) {
    const hashedPwd = bcrypt.hashSync(password, SALT);
    const newBuyer = new Buyer({ userName, email, password: hashedPwd });
    await newBuyer.save();
    req.session.userId = newBuyer._id;
    res.status(201).send({ success: "Signed up" });
  } else if (isNullOrUndefined(existingUser) && password !== confirmPassword) {
    res.status(400).send({ err: "Password didn't matched" });
  } else {
    res.status(400).send({
      err: `Invalid data.`,
    });
  }
});

app.post("/sellerlogin", async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await Seller.findOne({
    email,
  });
  if (isNullOrUndefined(existingUser)) {
    res.status(401).send({ err: "UserName does not exist." });
  } else {
    const hashedPwd = existingUser.password;
    if (bcrypt.compareSync(password, hashedPwd)) {
      req.session.userId = existingUser._id;
      console.log("Session saved with", req.session);
      res.status(200).send({ success: "Logged in" });
    } else {
      res.status(401).send({ err: "Password is incorrect." });
    }
  }
});

app.post("/buyerlogin", async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await Buyer.findOne({
    email,
  });
  if (isNullOrUndefined(existingUser)) {
    res.status(401).send({ err: "UserName does not exist." });
  } else {
    const hashedPwd = existingUser.password;
    if (bcrypt.compareSync(password, hashedPwd)) {
      req.session.userId = existingUser._id;
      console.log("Session saved with", req.session);
      res.status(200).send({ success: "Logged in" });
    } else {
      res.status(401).send({ err: "Password is incorrect." });
    }
  }
});

app.get("/logout", (req, res) => {
  if (!isNullOrUndefined(req.session)) {
    req.session.destroy(() => {
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(200);
  }
});

const AuthMiddleware = async (req, res, next) => {
  console.log("Session", req.session);
  if (isNullOrUndefined(req.session) || isNullOrUndefined(req.session.userId)) {
    res.status(401).send({ err: "Not logged in" });
  } else {
    next();
  }
};

app.post("/oranges", AuthMiddleware, async (req, res) => {
  const orange = req.body;
  orange.creationTime = new Date();
  orange.userId = req.session.userId;
  const newOrange = new Orange(orange);
  await newOrange.save();
  res.status(201).send(newOrange);
});

app.get("/oranges", AuthMiddleware, async (req, res) => {
  const oranges = await Orange.find({ userId: req.session.userId });
  res.send(oranges);
});

app.delete("/oranges/:orangeid", AuthMiddleware, async (req, res) => {
  const orangeid = req.params.orangeid;

  try {
    await Orange.deleteOne({
      _id: orangeid,
      userId: req.session.userId,
    });
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(404);
  }
});

app.get("/sellerinfo", AuthMiddleware, async (req, res) => {
  const seller = await Seller.findById(req.session.userId);
  console.log(seller);
  res.send({ userName: seller.userName });
});

app.get("/buyerinfo", AuthMiddleware, async (req, res) => {
  const buyer = await Buyer.findById(req.session.userId);
  res.send({ userName: buyer.userName });
});

app.post("/sellerinfooforangesfrombuyer", async (req, res) => {
  const mailId = req.body;
  // console.log(mailId);
  const seller = await Seller.findOne(mailId);
  // console.log(seller);
  // res.send(seller);
  const oranges = await Orange.find({ userId: seller._id });
  // console.log(oranges);
  res.send(oranges);
});

app.listen(9999, () => {
  console.log(`listening on port 9999 !`);
});
