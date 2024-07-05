const pool = require("../../sql/connection");
const { handleSQLError } = require("../../sql/error");

// JOIN TABLE funcionality on login, to create new table that holds only those notes associated with that users user_id?

// @desc    verifies login credentials
// @route   POST /
const Check = (req, res, next) => {

  pool.query(
    "SELECT * FROM defaultbeatassign ORDER by beat",
    (err, results) => {
      if (err) return handleSQLError(res, err);
      if (!results.length)
        return res
          .status(404)
          .send(`User with user_name  does not exist.`);

      return res.status(201).json(
        results
      );
    }
  );
};


const remove = (req, res, next) => {
  const {officer_id,beat,time} = req.body;
  pool.query(
    "UPDATE defaultbeatassign SET officer_id = NULL, Officer_name = NULL WHERE beat = '"+beat+"' AND officer_id = '"+officer_id+"' AND time = '"+time+"';UPDATE department_details SET Availability = 'yes' WHERE Officer_Id = '"+officer_id+"';",
    (err, results) => {
      if (err) return handleSQLError(res, err);
    

      return res.status(201).json(
        results
      );
    }
  );
};


const update = (req, res, next) => {

  const {officer_id,beat,officer_name,time} = req.body;

  pool.query(
    "UPDATE defaultbeatassign SET officer_id = '"+officer_id+"', Officer_name = '"+officer_name+"' WHERE beat = '"+beat+"' AND time = '"+time+"';UPDATE department_details SET Availability = 'no' WHERE Officer_Id = '"+officer_id+"';",
    (err, results) => {
      if (err) return handleSQLError(res, err);
      return res.status(201).json(
        results
      );
    }
  );
};


const available= (req, res, next) => {

  pool.query(
    "SELECT * FROM department_details WHERE Availability = 'yes'",
    (err, results) => {
      if (err) return handleSQLError(res, err);
      if (!results.length)
        return res
          .status(404)
          .send(`User with user_name does not exist.`);

      return res.status(201).json(
        results
      );
    }
  );
};


const assigned= (req, res, next) => {

  const {officer_id} = req.body;
  console.log(officer_id)

  pool.query(
    "SELECT * FROM defaultbeatassign WHERE officer_id = '"+officer_id+"';",
    (err, results) => {
      if (err) return handleSQLError(res, err);
      
      console.log(results);

      return res.status(201).json(
        results
      );
    }
  );
};



module.exports = {assigned, Check,remove,available,update };
