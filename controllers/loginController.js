const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

// JOIN TABLE funcionality on login, to create new table that holds only those notes associated with that users user_id?

// @desc    verifies login credentials
// @route   POST /
const userLogin = (req, res, next) => {
  console.log(req.body);
  const { officer_id, password } = req.body;
  console.log(officer_id);
  pool.query(
    "SELECT * FROM login WHERE Officer_Id = '" + officer_id + "' ",
    (err, results) => {
      if (err) return handleSQLError(res, err);
      if (!results.length)
        return res
          .status(404)
          .send(`User with user_name "${officer_id}" does not exist.`);

      const hash = results[0].Pass;
      console.log(hash);
      const userData = { ...results[0] };
      if (hash === password) {
        const token = jwt.sign(
          {
            userData,
          },
          "secret",
          { expiresIn: 5 * 60 * 60 }
        );
        
        return res.status(201).json({
          result: token,
          userData,
        });
      } else {
        res.status(400).send("Invalid password");
      }
    }
  );
};

module.exports = { userLogin };
