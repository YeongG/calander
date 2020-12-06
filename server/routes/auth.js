const express = require("express");
const { makePassword, makeAccess } = require("../lib/func");
const { User } = require("../models");
const joi = require("joi");

const authRouter = express.Router();

authRouter.post("/register", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      res.status(409).json({ message: "이미 존재하는 이메일 입니다" });
      return;
    }

    await User.create({
      email,
      password: makePassword(password),
    });
    res.status(200).json({ message: "회원가입 성공" });
  } catch (err) {
    res.status(404).json({ message: "비밀번호가 없습니다" });
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const schema = joi.object({
      email: joi.string().min(1).required(),
      password: joi.string().min(1).required(),
    });

    await schema.validateAsync(req.body);

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "계정이 존재하지 않습니다" });
      return;
    }
    if (makePassword(password) !== user.password) {
      res.status(404).json({ message: "비밀번호가 다릅니다" });
    }
    const jwt = await makeAccess(process.env.JWT, { id: user.id });

    res.json({ accessToken: jwt });
  } catch (err) {
    res.status(400).json({ message: "이메일이 없습니다" });
  }
});

module.exports = authRouter;
