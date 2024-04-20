const pool = require("../../sql/connection");
const { handleSQLError } = require("../../sql/error");

// JOIN TABLE funcionality on login, to create new table that holds only those notes associated with that users user_id?

// @desc    verifies login credentials
// @route   POST /
const About = (req, res, next) => {
  const { officer_id } = req.body;
  console.log(officer_id);
  pool.query(
    "SELECT * FROM department_details WHERE Officer_Id = '" + officer_id + "' ",
    (err, results) => {
      if (err) return handleSQLError(res, err);
      if (!results.length)
        return res
          .status(404)
          .send(`User with user_name "${officer_id}" does not exist.`);

      return res.status(201).json({
        ...results[0],
      });
    }
  );
};

module.exports = { About };
