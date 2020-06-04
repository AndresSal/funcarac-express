var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var config = require("../../config.json");


//get complete list of tale-records
router.get("/",function(req,res){
    let query = "SELECT * FROM tales_record";
    var connection = mysql.createConnection(config.connection);
    connection.connect();
    connection.query(query,function(err,rows,fields){
        if(err) throw err;
        res.status(200).json(rows);
    });
    connection.end();
});


//get only the tales-records of an specific player
router.get("/player",function(req,res){
    let playerId = req.query.playerId;
    let query = `SELECT * FROM tales_record\
                 WHERE player_id = ${playerId}`;

    var connection = mysql.createConnection(config.connection);
    connection.connect();
    connection.query(query,function(err,rows,fields){
        if(err) throw err;
        res.status(200).json(rows);
    })
});

//get specific tale record of a specific player
router.get("/tale_record/:talesid/:playerid",function(req,res){
    let playerId = req.params.playerid,
        talesId = req.params.talesid,
        query = `SELECT * FROM tales_record\
                 WHERE player_id = ${playerId} AND tales_id = ${talesId}`;
    var connection = mysql.createConnection(config.connection);
    connection.connect();
    connection.query(query,function(err,rows,fields){
        if (err) throw err;
        res.status(200).json(rows);
    });
    connection.end();
});

//update a specific tale record of a specific player
router.put("/:talesid",function(req,res){
    let playerId = req.body.playerid,
        talesId = req.params.talesid,
        status = req.body.status,
        tale_record = [
            status,
            playerId,
            talesId
        ];

    let query = 'UPDATE tales_record SET status = ? WHERE player_id = ? and tales_id = ?';
    
    // let playerId = req.params.playerid,
    //     talesId = req.params.talesid,
    //     status = req.params.taleStatus,
    //     query = `UPDATE tales_record SET status = '${status}'\
    //              WHERE player_id = ${playerId} AND tales_id = ${talesId}`;
    
    var connection = mysql.createConnection(config.connection);
    connection.connect();
    connection.query(query,tale_record,function(err,rows,fields){
        if(err) throw err;
    });

    query = `SELECT * FROM tales_record WHERE player_id = ${playerId}\
            AND tales_id = ${talesId}`;
    connection.query(query,function(err,rows,fields){
        if(err) throw err;
        res.status(200).json(rows);
    });
    connection.end();
});




//create the 12 tale records for a specific player
router.post("/player",function(req,res){
    var connection = mysql.createConnection(config.connection);
        connection.connect();
    let playerId = req.body.playerId;
    for (let talesId = 1;talesId<=12;talesId++){
        let query = `INSERT INTO tales_record(tales_id,player_id,status)\
                 VALUES (${talesId},${playerId},'new')`;
        connection.query(query,function(err,rows,fields){
            if(err) throw err;
        });
    }
    let query = `SELECT * FROM tales_record WHERE player_id = ${playerId}`;
    connection.query(query,function(err,rows,fields){
        if (err) throw err;
        res.status(200).json(rows);
    });
    connection.end();
})

module.exports = router;