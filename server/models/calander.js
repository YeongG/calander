const Sequelize = require("sequelize");

module.exports = class Calander extends (
  Sequelize.Model
) {
  static init(sequelize) {
    return super.init(
      {
        date: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        todo: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        isDone: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Calander",
        tableName: "calanders",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Calander.belongsTo(db.User, {
      foreignKey: "userId",
      targetKey: "id",
    });
  }
};
