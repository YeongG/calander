const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const makePassword = (password) =>
  crypto.createHash("sha512").update(password).digest("base64");

const makeAccess = async (secret, obj) => {
  return await jwt.sign(obj, secret, {
    expiresIn: "30m",
  });
};

const checkJWT = async (token = "") => {
  const res = await jwt.verify(token, process.env.JWT);
  return res;
};

module.exports = {
  makePassword,
  makeAccess,
  checkJWT,
};
