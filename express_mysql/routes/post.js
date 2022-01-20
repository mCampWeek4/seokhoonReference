const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const dbConfig = require('../config/database.js');
const connection = mysql.createConnection(dbConfig);
const bodyParser = require('body-parser');

connection.connect();

router.use(bodyParser.json());

router.get('/',(req,res)=>{
    connection.query('SELECT * FROM post', (error, rows)=>{
        if(error) throw error;
        console.log('post info is: ', rows);
        res.send(rows);
    });
});


router.get("/:id",(req,res)=>{
    connection.query('SELECT * FROM post WHERE id=\''+req.params.id+'\'', (error, rows)=>{
        if(error) throw error;
        console.log('post info is: ', rows);
        res.send(rows)
    });
});

//새로운 post를 추가
router.post("/",(req,res)=>{
    var sql = 'INSERT INTO post (user_id, title, content, category) VALUES (?,?,?,?)';
    var params = [req.body.user_id, req.body.title, req.body.content, req.body.category];
    connection.query(sql, params, (error, rows)=>{
        if(error) throw error;
        console.log('post info is: ', rows);
        res.send(rows);
    });
})


//해당 id를 가지는 post의 content를 수정
router.put("/:id",(req,res)=>{
    var sql = 'UPDATE post SET content=\''+req.body.content+'\', WHERE id=\''+req.params.id+"\'";
    connection.query(sql, (error, rows)=>{
        if(error) throw error;
        console.log('post info is: ', rows);
        res.send(rows);
    });
})
//해당 id를 가지는 post를 삭제
router.delete("/:id",(req,res)=>{
    var sql = 'DELETE FROM post WHERE id=\''+req.params.id+'\'';
    connection.query(sql, (error, rows)=>{
        if(error) throw error;
        console.log('post info is: ', rows);
        res.send(rows);
    });
})

module.exports = router;