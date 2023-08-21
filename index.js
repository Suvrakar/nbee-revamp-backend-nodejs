const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const cors = require("cors");
const { Users } = require("./models/Users");
const mongoose = require("mongoose");
const { Users_Nbee102 } = require("./models/Users_Nbee102");

const PORT = process.env.PORT || 5000;
const users = [
  {
    id: 1,
    name: "suvra",
    email: "kar.suvra@gmail.com",
    password: "12346",
    role: "superadmin",
  },
  {
    id: 2,
    name: "suvra",
    email: "kar.suvra6682@gmail.com",
    password: "12346",
    role: "user",
  },
];

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "secret";

const strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log("payload received", jwt_payload);
  var user = users[_.findIndex(users, { id: jwt_payload.id })];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
passport.use(strategy);

const app = express();

app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.json({ message: "Express is up" });
});

mongoose
  .connect(
    "mongodb+srv://suvra123:01711536682Suv@nutriotionbee.qqsv8.mongodb.net/nutriotionBee?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

// Login route - here we will generate the token - copy the token generated in the input
app.post("/login", function (req, res) {
  if (req.body.email && req.body.password) {
    var email = req.body.email;
    var password = req.body.password;
  }
  // usually this would be a database call:
  var user = users[_.findIndex(users, { email: email })];
  if (!user) {
    res.status(401).json({ message: "no such user/email id found" });
  }

  if (user.password === password) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    var payload = { id: user.id };
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({ message: "Successful", token: token, role: user.role });
  } else {
    res.status(401).json({ message: "passwords did not match" });
  }
});

app.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // The authenticated user information is available in req.user
    res.json({ name: req.user.name, role: req.user.role });
  }
);

app.get("/users", async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const { name, phone, email, paymentStatus } = req.body;

    const editUser = await Users.findById(userId);

    if (editUser) {
      const updatedUser = await Users.findByIdAndUpdate(
        userId,
        { name, phone, email, paymentStatus },
        { new: true }
      );
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/users/search", async (req, res) => {
  try {
    const { query } = req.query;
    let users;

    if (query) {
      users = await Users.find({
        $or: [
          { email: { $regex: query, $options: "i" } },
          // { phone: { $regex: query, $options: "i" } },
          { name: { $regex: query, $options: "i" } },
        ],
      });

      if (users.length > 0) {
        res.json(users);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else {
      res.status(400).json({ message: "Please provide a query parameter" });
    }
  } catch (error) {
    console.error("Error searching for user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/usersnbee102", async (req, res) => {
  try {
    const users = await Users_Nbee102.find();
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/usersnbee102/:id", async (req, res) => {
  try {
    const user = await Users_Nbee102.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/usersnbee102/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const { name, phone, email, paymentStatus } = req.body;

    const editUser = await Users_Nbee102.findById(userId);

    if (editUser) {
      const updatedUser = await Users_Nbee102.findByIdAndUpdate(
        userId,
        { name, phone, email, paymentStatus },
        { new: true }
      );
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/usersnbee102/search", async (req, res) => {
  try {
    const { query } = req.query;
    let users;

    if (query) {
      users = await Users_Nbee102.find({
        $or: [
          { email: { $regex: query, $options: "i" } },
          // { phone: { $regex: query, $options: "i" } },
          { name: { $regex: query, $options: "i" } },
        ],
      });
    } else {
      return res
        .status(400)
        .json({ message: "Please provide a query parameter" });
    }

    if (users.length > 0) {
      res.json(users);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error searching for user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// now there can be as many route you want that must have the token to run, otherwise will show unauhorized access. Will show success
// when token auth is successfilly passed.
app.get(
  "/secret",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json("Success! You can not see this without a token");
  }
);

// server
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
