var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var config = require("../../config.json");

//get all tool Records of a specific player
router.get("/player",function(req,res){
    var connection = mysql.createConnection(config.connection);
    connection.connect();
    let playerId = req.query.playerId;
    let query = `SELECT * FROM tool_record WHERE player_id = ${playerId}`;
    connection.query(query,function(err,rows,fields){
        if(err) throw err;
        res.status(200).json(rows);
    });
    connection.end();
})



//post all tool record for a specific player
router.post("/player",function(req,res){
    var connection = mysql.createConnection(config.connection);
    connection.connect();
    let playerId = req.body.playerId;
    for(let toolId = 1; toolId <=6; toolId ++){
        let query = `INSERT INTO tool_record(player_id,tool_id,quantity)\
                     VALUES (${playerId},${toolId},0)`;
        connection.query(query,function(err,rows,fields){
            if (err) throw err;
        });
    }
    let query = `SELECT * FROM tool_record WHERE player_id = ${playerId}`;
    connection.query(query,function(err,rows,fields){
        if (err) throw err;
        res.status(200).json(rows);
    });
})


module.exports = router;