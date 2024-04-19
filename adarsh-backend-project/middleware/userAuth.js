const jwt = require("jsonwebtoken");
const { userContainer } = require("../db/db.js");
const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token) {
      const user = jwt.verify(token, "randomsecretfromankitandadarsh");
      if (user) {
        const currUser = await userContainer.items
          .query(`SELECT * from c WHERE c.username = "${user.username}" `)
          .fetchAll();
        if (currUser.resources.length > 0) next();
        else throw Error("User not found");
      }
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
module.exports = userAuth;
