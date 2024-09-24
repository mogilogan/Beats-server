const pool = require("../../sql/connection");
const { handleSQLError } = require("../../sql/error");

// JOIN TABLE funcionality on login, to create new table that holds only those notes associated with that users user_id?

// @desc    verifies login credentials
// @route   POST /
const fetch = (req, res, next) => {

  pool.query(
    "SELECT * FROM report",
    (err, results) => {
      if (err) return handleSQLError(res, err);
      if (!results.length)
        return res
          .status(404)
          .send(`No reports Exist!`);

          

      return res.status(201).json({
         results,
      });
    }
  );
};


const add = (req, res, next) => {
const {time,date,officer_id,beat} = req.body;
console.log(time);
  pool.query(
    "SELECT time FROM report WHERE beat = '"+beat+"' AND slot = '"+time+"' AND date = '"+date+"'",
    (err, results) => {
      if (err) return handleSQLError(res, err);

      //create new report
      if (!results.length){
        pool.query(
          "INSERT INTO report (slot, beat, date, officer_id, time) VALUES (?, ?, ?, ?, ?)",
          [time, beat, date, officer_id, 60],
          (err, results1) => {
            if (err) {
              return handleSQLError(res, err);
            }
            return res.status(201).json(
              results1
            );
          }
        );
      }
  
    else {
      const updatedTime = results[0].time+60;
            
      // update seconds if called
      pool.query(
        "UPDATE report SET time = "+updatedTime+" WHERE beat = '"+beat+"' AND slot = '"+time+"' AND date = '"+date+"'",
        (err, results2) => {
          if (err) return handleSQLError(res, err);
          
          return res.status(201).json(results[0]);
        }
      );  
      
    }
      
    }
  );
};

module.exports = { fetch,add };
