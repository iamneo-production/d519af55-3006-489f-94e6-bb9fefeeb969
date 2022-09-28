// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { CLIENT_URL } = process.env;
// const sendMail = require("./sendMail");
// const sendEmail = require("./sendMail");
var mysql = require('mysql');
const con = require("../db/conn");

const userCtrl = {
  register: async (req, res) => {
    try {
      const { username, mobileNumber, email, password, active, role } = req.body;

      con.getConnection( async (err, connection) => {
        if (err) throw (err)
        if(!validateEmail(email))
          res.status(409).json({msg: "Email is not valid!"})
        const sqlSearch = "SELECT * FROM UserModel WHERE email = ?"
        const search_query = mysql.format(sqlSearch,[email])
        const sqlInsert = "INSERT INTO UserModel VALUES (?,?,?,?,?,?)"
        const insert_query = mysql.format(sqlInsert,[email, password, username, mobileNumber, active, role]);
        // ? will be replaced by values
        // ?? will be replaced by string
        await connection.query (search_query, async (err, result) => {
         if (err) throw (err)
        
         if (result.length != 0) {
          connection.release()
          res.status(409).json({msg: "user already exists."}) 
         } 
         else {
          await connection.query (insert_query, (err, result)=> {
          connection.release()
          if (err) throw (err)
          console.log ("--------> Created new User")
          console.log(result.insertId)
          res.status(201).json({msg: "Registered successfully!"})
         })
        }
      })
    })
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      con.getConnection( async (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "SELECT * FROM UserModel WHERE email = ? and password=?"
        const trainerSearch = "SELECT * FROM trainers WHERE email = ? and password=?"
        const search_query = mysql.format(sqlSearch,[email,password])
        const search_query2 = mysql.format(trainerSearch,[email,password])
        // ? will be replaced by values
        // ?? will be replaced by string
        await connection.query (search_query, async (err, result) => {
         if (err) throw (err)
         if (result.length != 0) {
          connection.release()
          res.json({role: result[0].role, msg: "login successfull!"}) 
         } 
      })
      await connection.query (search_query2, async (err, result) => {
        if (err) throw (err)
        if (result.length != 0) {
         connection.release()
         res.json({role: "trainer", msg: "login successfull!"}) 
        }
        else{
          res.status(400).json({msg: "email or password is incorrect!"}) 
        } 
     })
    })
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getTrainers: async (req,res) =>{
    try {
      con.getConnection( async (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "SELECT * FROM trainers;"
        const search_query = mysql.format(sqlSearch)
        // ? will be replaced by values
        // ?? will be replaced by string
        await connection.query (search_query, async (err, result) => {
         if (err) throw (err)
         if (result.length != 0) {
          connection.release()
          res.send(result);
         } 
         else {
          res.status(400).json({msg: "No trainers yet!"})
        }
      })
    })
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  addTrainer: async (req,res) => {
    try {
      const { name, email, password, experience, shopname } = req.body;

      con.getConnection( async (err, connection) => {
        if (err) throw (err)
        if(!validateEmail(email))
          res.status(409).json({msg: "Email is not valid!"})
        const sqlSearch = "SELECT * FROM trainers WHERE email = ?"
        const search_query = mysql.format(sqlSearch,[email])
        const sqlInsert = "INSERT INTO trainers(name, email, experience, shopname, password) VALUES (?,?,?,?,?)"
        const insert_query = mysql.format(sqlInsert,[name, email, experience, shopname, password]);
        // ? will be replaced by values
        // ?? will be replaced by string
        await connection.query (search_query, async (err, result) => {
         if (err) throw (err)
        
         if (result.length != 0) {
          connection.release()
          res.status(409).json({msg: "trainer already exists."}) 
         } 
         else {
          await connection.query (insert_query, (err, result)=> {
          connection.release()
          if (err) throw (err)
          console.log ("--------> Created new trainer")
          console.log(result.insertId)
          res.status(201).json({msg: "new trainer added successfully!"})
         })
        }
      })
    })
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateTrainer: async (req,res) => {
    try {
      const { name, email, password, experience, shopname } = req.body;
      
      con.getConnection( async (err, connection) => {
        if (err) throw (err)
        if(!validateEmail(email))
          res.status(409).json({msg: "Email is not valid!"})
        const sqlSearch = "SELECT * FROM trainers WHERE id = ?"
        const search_query = mysql.format(sqlSearch,[req.params.id])
        const sqlInsert = "update trainers set name=?, email=?, experience=?, password=?, shopname=? where id=?;"
        const insert_query = mysql.format(sqlInsert,[name, email, experience, password,shopname,req.params.id]);
        // ? will be replaced by values
        // ?? will be replaced by string
        await connection.query (search_query, async (err, result) => {
         if (err) throw (err)
        
         if (result.length === 0) {
          connection.release()
          res.status(409).json({msg: "trainer not found."}) 
         } 
         else {
          await connection.query (insert_query, (err, result)=> {
          connection.release()
          if (err) throw (err)
          console.log ("--------> trainer updated")
          console.log(result.insertId)
          res.status(201).json({msg: "trainer updated successfully!"})
         })
        }
      })
    })
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteTrainer: async (req,res) => {
    try {
      con.getConnection( async (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "SELECT * FROM trainers WHERE id = ?"
        const search_query = mysql.format(sqlSearch,[req.params.id])
        const sqldelete = "delete from trainers where id=?;"
        const delete_query = mysql.format(sqldelete,[req.params.id]);
        // ? will be replaced by values
        // ?? will be replaced by string
        await connection.query (search_query, async (err, result) => {
         if (err) throw (err)
        
         if (result.length === 0) {
          connection.release()
          res.status(409).json({msg: "trainer not found."}) 
         } 
         else {
          await connection.query (delete_query, (err, result)=> {
          connection.release()
          if (err) throw (err)
          console.log ("--------> trainer deleted")
          console.log(result.insertId)
          res.status(201).json({msg: "trainer deleted successfully!"})
         })
        }
      })
    })
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  createBooking: async (req,res) => {
    try {
      const { bookingid, clientid, trainerid, lawfirmName, date, bookingStatus} = req.body;

      con.getConnection( async (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "SELECT * FROM booking WHERE bookingid = ?"
        const search_query = mysql.format(sqlSearch,[bookingid])
        const sqlInsert = "INSERT INTO booking VALUES (?,?,?,?,?,?)"
        const insert_query = mysql.format(sqlInsert,[bookingid, clientid, trainerid, lawfirmName, date, bookingStatus]);
        // ? will be replaced by values
        // ?? will be replaced by string
        await connection.query (search_query, async (err, result) => {
         if (err) throw (err)
        
         if (result.length != 0) {
          connection.release()
          res.status(409).json({msg: "booking already exists."}) 
         } 
         else {
          await connection.query (insert_query, (err, result)=> {
          connection.release()
          if (err) throw (err)
          console.log ("--------> Created new booking")
          console.log(result.insertId)
          res.status(201).json({msg: "new booking added successfully!"})
         })
        }
      })
    })
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  deleteBooking: async (req,res) => {
    try {
      con.getConnection( async (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "SELECT * FROM booking WHERE bookingid = ?"
        const search_query = mysql.format(sqlSearch,[req.params.id])
        const sqldelete = "delete from booking where bookingid=?;"
        const delete_query = mysql.format(sqldelete,[req.params.id]);
        // ? will be replaced by values
        // ?? will be replaced by string
        await connection.query (search_query, async (err, result) => {
         if (err) throw (err)
        
         if (result.length === 0) {
          connection.release()
          res.status(409).json({msg: "booking not found."}) 
         } 
         else {
          await connection.query (delete_query, (err, result)=> {
          connection.release()
          if (err) throw (err)
          console.log ("--------> booking deleted")
          console.log(result.insertId)
          res.status(201).json({msg: "booking deleted successfully!"})
         })
        }
      })
    })
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  



  
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

//   const createActivationToken = (payload) => {
//     return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
//       expiresIn: "5m",
//     });
//   };

//   const createAccessToken = (payload) => {
//     return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
//       expiresIn: "1d",
//     });
//   };

//   const createRefreshToken = (payload) => {
//     return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
//       expiresIn: "7d",
//     });
//   };

module.exports = userCtrl;