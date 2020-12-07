const { checkJWT } = require("../lib/api");

const isLogined = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const res = await checkJWT(token);
    req.decode = { ...res };
    next();
  } catch (err) {
    res.status(409).json({ message: "토큰이 이상해요" });
  }
};

module.exports = {
  isLogined,
};
