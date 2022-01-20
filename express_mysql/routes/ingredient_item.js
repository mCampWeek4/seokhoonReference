const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const dbConfig = require('../config/database.js');
const connection = mysql.createConnection(dbConfig);
const bodyParser = require('body-parser');

connection.connect();

router.use(bodyParser.json());

router.get('/',(req,res)=>{
    connection.query('SELECT * FROM ingredient_item', (error, rows)=>{
        if(error) throw error;
        console.log('ingredient_item info is: ', rows);
        res.send(rows);
    });
});

//해당 id를 가지는 ingredient_item get
router.get("/:id",(req,res)=>{
    connection.query('SELECT * FROM ingredient_item WHERE id=\''+req.params.id+'\'', (error, rows)=>{
        if(error) throw error;
        console.log('ingredient_item info is: ', rows);
        res.send(rows)
    });
});

//해당 menu_list_id에 속하는 모든 ingredient_item get
router.get("/menu_list/:menu_list_id",(req,res)=>{
    connection.query('SELECT * FROM ingredient_item WHERE menu_list_id=\''+req.params.menu_list_id+'\'', (error, rows)=>{
        if(error) throw error;
        console.log('ingredient_item info is: ', rows);
        res.send(rows)
    });
});

//새로운 ingredient_item을 추가
router.post("/",(req,res)=>{
    var sql = 'INSERT INTO ingredient_item (cost, name, menu_list_id) VALUES (?,?,?)';
    var params = [req.body.cost,req.body.name, req.body.menu_list_id];
    connection.query(sql, params, (error, rows)=>{
        if(error) throw error;
        console.log('ingredient_item info is: ', rows);
        res.send(rows);
    });
})


//해당 id에 해당하는 ingredient_item의 name과 cost를 수정
router.put("/:id",(req,res)=>{
    var sql = 'UPDATE ingredient_item SET cost=\''+req.body.cost+'\', name=\''+req.body.name+'\' WHERE id=\''+req.params.id+"\'";
    connection.query(sql, (error, rows)=>{
        if(error) throw error;
        console.log('ingredient_item info is: ', rows);
        res.send(rows);
    });
})

//해당 id에 해당하는 ingredient_item을 삭제
router.delete("/:id",(req,res)=>{
    var sql = 'DELETE FROM ingredient_item WHERE id=\''+req.params.id+'\'';
    connection.query(sql, (error, rows)=>{
        if(error) throw error;
        console.log('ingredient_item info is: ', rows);
        res.send(rows);
    });
})

module.exports = router;