const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const dbConfig = require('../config/database.js');
const connection = mysql.createConnection(dbConfig);
const bodyParser = require('body-parser');

connection.connect();

router.use(bodyParser.json());

router.get('/',(req,res)=>{
    connection.query('SELECT * FROM sales', (error, rows)=>{
        if(error) throw error;
        console.log('sales info is: ', rows);
        res.send(rows);
    });
});

//해당 id를 가지는 sales get

//해당 user_id에 속하는 모든 sales get
router.get("/user/:user_id",(req,res)=>{
    connection.query('SELECT * FROM sales WHERE user_id=\''+req.params.user_id+'\'', (error, rows)=>{
        if(error) throw error;
        console.log('sales info is: ', rows);
        res.send(rows)
    });
});

router.get("/date/:date/user/:user_id",(req,res)=>{
    if(!req.query) {
        return res.send({
            error: "you must provide date and userId"
        })
    }

    connection.query('SELECT * FROM sales WHERE date=\''+req.params.date+'\'' + 'AND user_id=\''+req.params.user_id+'\'', (error, rows)=>{
        if(error) throw error;
        console.log('sales info is: ', rows);
        res.send(rows)
    });
});

//새로운 sales을 추가
router.post("/",(req,res)=>{
    var sql = 'INSERT INTO sales (date, total_sale, total_cost, expense, user_id) VALUES (?,?,?,?,?)';
    var params = [req.body.date,req.body.total_sale,req.body.total_cost,req.body.expense, req.body.user_id];
    connection.query(sql, params, (error, rows)=>{
        if(error) throw error;
        console.log('sales info is: ', rows);
        res.send(rows);
    });
})


//해당 id에 해당하는 sales의 name과 cost를 수정
router.put("/date/:date/user/:user_id",(req,res)=>{
    var sql = 'UPDATE sales SET total_sale=\''+req.body.total_sale+'\', total_cost=\''+req.body.total_cost+'\', expense=\''+req.body.expense+'\' WHERE date=\''+req.params.date+"\'" + 'AND user_id=\''+req.params.user_id+'\'';
    connection.query(sql, (error, rows)=>{
        if(error) throw error;
        console.log('sales info is: ', rows);
        res.send(rows);
    });
})

//해당 id에 해당하는 sales을 삭제
router.delete("/:date",(req,res)=>{
    var sql = 'DELETE FROM sales WHERE date=\''+req.params.date+'\'';
    connection.query(sql, (error, rows)=>{
        if(error) throw error;
        console.log('sales info is: ', rows);
        res.send(rows);
    });
})

module.exports = router;