const pool = require("../../sql/connection");
const { handleSQLError } = require("../../sql/error");

// JOIN TABLE funcionality on login, to create new table that holds only those notes associated with that users user_id?

// @desc    verifies login credentials
// @route   POST /
const Assign = (req, res, next) => {
  const { Officer_Id,start_time,end_time,assigned_by } = req.body;
  console.log(Officer_Id);
  pool.query(
    "UPDATE assign SET start_time = ?, end_time = ?, assigned_by = ? WHERE Officer_Id = ?",
    [start_time, end_time, assigned_by, Officer_Id],
    (err, results) => {
      if (err) return handleSQLError(res, err);
      if (results.affectedRows === 0) {
        return res
          .status(404)
          .send(`User with Officer_Id "${Officer_Id}" does not exist.`);
      }

      return res.status(201).json({
        message: "Assignment updated successfully",
      });
    }
  );
};

module.exports = { Assign };
