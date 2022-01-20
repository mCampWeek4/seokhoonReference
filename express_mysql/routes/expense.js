const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const dbConfig = require('../config/database.js');
const connection = mysql.createConnection(dbConfig);
const bodyParser = require('body-parser');

connection.connect();

router.use(bodyParser.json());

router.get('/',(req,res)=>{
    connection.query('SELECT * FROM expense', (error, rows)=>{
        if(error) throw error;
        console.log('expense info is: ', rows);
        res.send(rows);
    });
});

//해당 id를 가지는 expense get
router.get("/:id",(req,res)=>{
    connection.query('SELECT * FROM expense WHERE id=\''+req.params.id+'\'', (error, rows)=>{
        if(error) throw error;
        console.log('expense info is: ', rows);
        res.send(rows)
    });
});

//해당 user_id에 속하는 모든 expense get
router.get("/user/:user_id",(req,res)=>{
    connection.query('SELECT * FROM expense WHERE user_id=\''+req.params.user_id+'\'', (error, rows)=>{
        if(error) throw error;
        console.log('expense info is: ', rows);
        res.send(rows)
    });
});

//새로운 expense을 추가
router.post("/",(req,res)=>{
    var sql = 'INSERT INTO expense (cost, name, user_id) VALUES (?,?,?)';
    var params = [req.body.cost,req.body.name, req.body.user_id];
    connection.query(sql, params, (error, rows)=>{
        if(error) throw error;
        console.log('expense info is: ', rows);
        res.send(rows);
    });
})


//해당 id에 해당하는 expense의 name과 cost를 수정
router.put("/:id",(req,res)=>{
    var sql = 'UPDATE expense SET cost=\''+req.body.cost+'\', name=\''+req.body.name+'\' WHERE id=\''+req.params.id+"\'";
    connection.query(sql, (error, rows)=>{
        if(error) throw error;
        console.log('expense info is: ', rows);
        res.send(rows);
    });
})

//해당 id에 해당하는 expense을 삭제
router.delete("/:id",(req,res)=>{
    var sql = 'DELETE FROM expense WHERE id=\''+req.params.id+'\'';
    connection.query(sql, (error, rows)=>{
        if(error) throw error;
        console.log('expense info is: ', rows);
        res.send(rows);
    });
})

module.exports = router;