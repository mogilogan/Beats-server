const pool = require("../../sql/connection");
const { handleSQLError } = require("../../sql/error");

// JOIN TABLE funcionality on login, to create new table that holds only those notes associated with that users user_id?

// @desc    verifies login credentials
// @route   POST /
const Check = (req, res, next) => {
  const { Officer_Id } = req.body;
  console.log(Officer_Id);
  pool.query(
    "SELECT * FROM assign WHERE Officer_Id = '" + Officer_Id + "' AND report IS NULL",
    (err, results) => {
      if (err) return handleSQLError(res, err);
      if (!results.length)
        return res
          .status(404)
          .send(`User with user_name "${Officer_Id}" does not exist.`);

      return res.status(201).json({
        ...results[0],
      });
    }
  );
};

module.exports = { Check };
