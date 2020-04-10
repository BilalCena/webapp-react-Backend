const Sequelize = require("sequelize");
const db = require("../config/database");

const Gig = db.define(
  "trytables",
  {
    try1: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    try2: {
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Gig;
