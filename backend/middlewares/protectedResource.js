const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const UserModel = mongoose.model("UserModel");
require("dotenv").config();


module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // Bearer hfjfjddkfffsffefhtyv
  if (!authorization) {
    return res.status(401).json({ error: "User Not Logged In" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
    if (error) {
      return res.status(401).json({ error: "User Not Logged In" });
    }
    const { _id } = payload;
    UserModel.findById(_id).then((dbUser) => {
      req.user = dbUser;
      next(); //goed to the next middlewear or goes to the next API being hit
    });
  });
};
