const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "samsquare",
    database : "cruddb"
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}))

// db.connect(()=>{
//     console.log("connected to DB");
// })


app.get('/api/get', (req,res)=>{
    const sql_query = "SELECT * FROM moviereviews";
    db.query(sql_query, (err,result)=>{
        res.send(result);
    })
})

app.post('/api/insert', (req,res)=>{
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    // if(movieName == ' ')
    //     res.send()
    // console.log(movieName, movieReview);
    const sql_query = "INSERT INTO moviereviews (movieName, movieReview) values (?,?)"
    db.query(sql_query, [movieName, movieReview], (err,res)=>{
        console.log(err);
    })
})

app.delete('/api/delete/:movieName', (req,res)=>{
    const name  = req.params.movieName;
    const sql_query = "DELETE FROM moviereviews WHERE movieName = ?"
    db.query(sql_query, name, (err,result)=>{
        if(err) console.log(err);
    })
})

app.put('/api/update',(req,res)=>{
    // res.send("update")
    const movieName = req.body.oldMovie;
    const review = req.body.updateReview;

    const sql_query = "UPDATE moviereviews SET movieReview = ? where movieName = ?";
    db.query(sql_query, [review, movieName], (err, res)=>{
        console.log(err);
    })
})

app.listen(5000,()=> console.log("server created at 5000"))