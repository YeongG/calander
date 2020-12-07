const { User, Calander } = require("../models");
const { isLogined } = require("./middleware");
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

calanderRouter.patch("/success/:id", isLogined, async (req, res, next) => {
  const {
    params: { id },
    decode: { id: userId },
  } = req;

  try {
    await Calander.update(
      { id: parseInt(id), isDone: true },
      {
        where: {
          id,
          userId,
        },
      }
    );
    res.status(200).json({ message: "수정 완료" });
  } catch (err) {
    res.status(404).json({ message: "id가 없습니다" });
  }
});

calanderRouter.patch("/fail/:id", isLogined, async (req, res, next) => {
  const {
    params: { id },
    decode: { id: userId },
  } = req;

  try {
    await Calander.update(
      { id, isDone: false },
      {
        where: {
          id,
          userId,
        },
      }
    );
    res.status(200).json({ message: "수정 완료" });
  } catch (err) {
    res.status(404).json({ message: "id가 없습니다" });
  }
});

module.exports = calanderRouter;
