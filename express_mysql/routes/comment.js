const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const dbConfig = require('../config/database.js');
const connection = mysql.createConnection(dbConfig);
const bodyParser = require('body-parser');

connection.connect();

router.use(bodyParser.json());

router.get('/',(req,res)=>{
    connection.query('SELECT * FROM comment', (error, rows)=>{
        if(error) throw error;
        console.log('comment info is: ', rows);
        res.send(rows);
    });
});

router.get("/:id",(req,res)=>{
    connection.query('SELECT * FROM comment WHERE id=\''+req.params.post_id+'\'', (error, rows)=>{
        if(error) throw error;
        console.log('comment info is: ', rows);
        res.send(rows)
    });
});

router.get("/user/:user_id",(req,res)=>{
    connection.query('SELECT * FROM comment WHERE user_id=\''+req.params.user_id+'\'', (error, rows)=>{
        if(error) throw error;
        console.log('comment info is: ', rows);
        res.send(rows)
    });
});

router.get("/post/:post_id/user/:user_id",(req,res)=>{
    if(!req.query) {
        return res.send({
            error: "you must provide postId and userId"
        })
    }

    connection.query('SELECT * FROM comment WHERE post_id=\''+req.params.post_id+'\'' + 'AND user_id=\''+req.params.user_id+'\'', (error, rows)=>{
        if(error) throw error;
        console.log('comment info is: ', rows);
        res.send(rows)
    });
});

router.get("/post/:post_id",(req,res)=>{
    connection.query('SELECT * FROM comment WHERE post_id=\''+req.params.post_id+'\'', (error, rows)=>{
        if(error) throw error;
        console.log('comment info is: ', rows);
        res.send(rows)
    });
});

//새로운 comment를 추가
router.post("/",(req,res)=>{
    var sql = 'INSERT INTO comment (content, post_id, user_id) VALUES (?,?,?)';
    var params = [req.body.content,req.body.post_id, req.body.user_id];
    connection.query(sql, params, (error, rows)=>{
        if(error) throw error;
        console.log('comment info is: ', rows);
        res.send(rows);
    });
})


//해당 id를 가지는 comment의 content를 수정
router.put("/:id",(req,res)=>{
    var sql = 'UPDATE comment SET content='+req.body.content+', WHERE id=\''+req.params.id+"\'";
    connection.query(sql, (error, rows)=>{
        if(error) throw error;
        console.log('comment info is: ', rows);
        res.send(rows);
    });
})

router.delete("/:id",(req,res)=>{
    var sql = 'DELETE FROM comment WHERE id=\''+req.params.id+'\'';
    connection.query(sql, (error, rows)=>{
        if(error) throw error;
        console.log('comment info is: ', rows);
        res.send(rows);
    });
})

module.exports = router;