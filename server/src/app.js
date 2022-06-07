const express = require('express');
const path = require('path');
const cors = require('cors');
var morgan = require('morgan');
const api = require('./routes/api');
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json());
app.use('/v1',api)

app.get('/*', (req, res) => {
    console.log('/');
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

app.get('*',(req,res)=>{
    res.status(404).send('<h1 align ="center" style="color:red"} >404 Not Found</h1>');
    console.log(req.method)
    console.log(req.url)
})

module.exports = app