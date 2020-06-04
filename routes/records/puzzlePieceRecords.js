var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var config = require("../../config.json");


//get all puzzlePiecesRecord of a specific player
router.get("/player",function(req,res){
    var connection = mysql.createConnection(config.connection);
    connection.connect();
    let playerId = req.query.playerId;
    let query = `SELECT * FROM puzzle_piece_record\
                 WHERE player_id = ${playerId}`;
    connection.query(query,function(err,rows,fields){
        if(err) throw err;

        res.status(200).json(rows);
    });
    connection.end();
})

//generate the puzzle pieces record for a specific player
router.post("/player",function(req,res){
    var connection = mysql.createConnection(config.connection);
    connection.connect();
    let playerId = req.body.playerId;
    for (let puzzle_id=1;puzzle_id<=48;puzzle_id++){
        let query = `INSERT INTO puzzle_piece_record(player_id,puzzle_piece_id,earned,placed)\
                     VALUES (${playerId},${puzzle_id},0,0)`;
        connection.query(query,function(err,rows,fields){
            if(err) throw err;
        });
    }

    let query = `SELECT * FROM puzzle_piece_record\
                 WHERE player_id = ${playerId}`;
    connection.query(query,function(err,rows,fields){
        if(err) throw err;
        res.status(200).json(rows);
    });
    connection.end();
})



//update specific earned puzzle piece record status of specific player
router.put("/piece_record/earned/:pieceid",function(req,res){
    let pieceId = req.params.pieceid,
        playerId = req.body.playerid,
        earned = req.body.earned,
        piece_record = [earned, pieceId,playerId];

    let query = 'UPDATE puzzle_piece_record SET earned = ? WHERE puzzle_piece_id = ? AND player_id = ?';
    var connection = mysql.createConnection(config.connection);
    connection.connect();
    connection.query(query,piece_record,function(err, rows, fields){
        if(err) throw err;
    });
    query = `SELECT * FROM puzzle_piece_record WHERE puzzle_piece_id = ${pieceId} AND player_id = ${playerId}`;
    connection.query(query, function(err,rows,fields){
        if (err) throw err;
        res.status(200).json(rows);
    });
    connection.end();
})

//update specific earned puzzle piece record status of specific player
router.put("/piece_record/placed/:pieceid",function(req,res){
    let pieceId = req.params.pieceid,
        playerId = req.body.playerid,
        placed = req.body.placed,
        piece_record = [placed, pieceId,playerId];

    let query = 'UPDATE puzzle_piece_record SET placed = ? WHERE puzzle_piece_id = ? AND player_id = ?';
    var connection = mysql.createConnection(config.connection);
    connection.connect();
    connection.query(query,piece_record,function(err, rows, fields){
        if(err) throw err;
    });
    query = `SELECT * FROM puzzle_piece_record WHERE puzzle_piece_id = ${pieceId} AND player_id = ${playerId}`;
    connection.query(query, function(err,rows,fields){
        if (err) throw err;
        res.status(200).json(rows);
    });
    connection.end();
})

module.exports = router;