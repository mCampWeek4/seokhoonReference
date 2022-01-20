const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const dbConfig = require('../config/database.js');
const connection = mysql.createConnection(dbConfig);
const bodyParser = require('body-parser');

connection.connect();

router.use(bodyParser.json());

router.get('/',(req,res)=>{
    connection.query('SELECT * FROM menu_item', (error, rows)=>{
        if(error) throw error;
        console.log('menu_item info is: ', rows);
        res.send(rows);
    });
});

//해당 id를 가지는 menu_item get
router.get("/:id",(req,res)=>{
    connection.query('SELECT * FROM menu_item WHERE id=\''+req.params.id+'\'', (error, rows)=>{
        if(error) throw error;
        console.log('menu_item info is: ', rows);
        res.send(rows)
    });
});

//해당 user_id에 속하는 모든 menu_item get
router.get("/user/:user_id",(req,res)=>{
    connection.query('SELECT * FROM menu_item WHERE user_id=\''+req.params.user_id+'\'', (error, rows)=>{
        if(error) throw error;
        console.log('menu_item info is: ', rows);
        res.send(rows)
    });
});

//새로운 menu_item을 추가
router.post("/",(req,res)=>{
    var sql = 'INSERT INTO menu_item (cost, name, price, user_id) VALUES (?,?,?,?)';
    var params = [req.body.cost,req.body.name, req.body.price, req.body.user_id];
    connection.query(sql, params, (error, rows)=>{
        if(error) throw error;
        console.log('menu_item info is: ', rows);
        res.send(rows);
    });
})


//해당 id에 해당하는 menu_item의 name과 cost를 수정
router.put("/:id",(req,res)=>{
    var sql = 'UPDATE menu_item SET cost=\''+req.body.cost+'\', name=\''+req.body.name+'\', count=\'' + req.body.count+'\', price=\'' +req.body.price +'\' WHERE id=\''+req.params.id+"\'";
    connection.query(sql, (error, rows)=>{
        if(error) throw error;
        console.log('menu_item info is: ', rows);
        res.send(rows);
    });
})

//해당 id에 해당하는 menu_item을 삭제
router.delete("/:id",(req,res)=>{
    var sql = 'DELETE FROM menu_item WHERE id=\''+req.params.id+'\'';
    connection.query(sql, (error, rows)=>{
        if(error) throw error;
        console.log('menu_item info is: ', rows);
        res.send(rows);
    });
})

module.exports = router;