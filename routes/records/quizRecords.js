var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var config = require("../../config.json");

//get all the quizRecords rows for a specific player
router.get("/player",function(req,res){
    let playerId = req.query.playerId;
    var query = `SELECT * FROM quiz_record WHERE player_id = ${playerId}`;
    var connection = mysql.createConnection(config.connection);
    connection.connect();
    connection.query(query,function(err,rows,fields){
        if (err) throw err;
        res.status(200).json(rows);
    })
    connection.end();
});

//create the quizRecords for a single Player
router.post("/player",function(req,res){
    var connection = mysql.createConnection(config.connection);
    let playerId = req.body.playerId;
    connection.connect();
    for(let quizId = 1; quizId<=48;quizId++){
        let query = `INSERT INTO quiz_record (quiz_id,player_id,hits,fails,score,completed)\
                     VALUES (${quizId}, ${playerId}, 0, 0,0,0)`;
        connection.query(query,function(err,rows,fields){
            if(err) throw err;
        })
    }

    let query = `SELECT * FROM quiz_record WHERE player_id = ${playerId}`;
    connection.query(query, function(err,rows,fields){
        if (err) throw err;
        res.status(200).json(rows);
    });

    connection.end();
})

//update specific quiz record of specific player
router.put("/quiz_record/:quizid",function(req,res){
    let playerId = req.body.playerid,
        quizId = req.params.quizid,
        hits = req.body.hits,
        fails = req.body.fails,
        score = req.body.score,
        completed = (req.body.score===30)?1:0,
        quiz_record = [
            hits,
            fails,
            score,
            completed,
            quizId,
            playerId   
       ];
    let query = 'UPDATE quiz_record SET hits = ?, fails = ?, score = ?, completed = ? WHERE quiz_id = ? and player_id = ?';
    var connection = mysql.createConnection(config.connection);
    connection.connect();
    connection.query(query,quiz_record,function(err,rows,fields){
        if(err) throw err;
    });

    query = `SELECT * FROM quiz_record WHERE player_id = ${playerId} AND quiz_id = ${quizId}`;
    connection.query(query,function(err,rows,fields){
        if(err) throw err;
        res.status(200).json(rows);
    })
    connection.end();
})

module.exports = router;
