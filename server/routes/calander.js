const { User, Calander } = require("../models");
const { isLogined } = require("../routes/middlewares");
const calanderRouter = require("express").Router();

calanderRouter.get("/", isLogined, async (req, res, next) => {
  const { id } = req.decode;
  const calanders = await Calander.findAll({ where: { userId: id } });
  res.json(calanders);
});

calanderRouter.get("/:date", isLogined, async (req, res, next) => {
  const {
    params: { date },
    decode: { id },
  } = req;

  const calanders = await Calander.findAll({
    where: {
      date,
      userId: id,
    },
  });

  res.json(calanders);
});

calanderRouter.post("/", isLogined, async (req, res, next) => {
  const {
    body: { todo, date },
    decode: { id },
  } = req;
  await Calander.create({
    date,
    todo,
    isDone: false,
    userId: id,
  });
  res.json(200);
});

module.exports = calanderRouter;
