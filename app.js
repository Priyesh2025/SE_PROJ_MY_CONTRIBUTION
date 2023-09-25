const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')


app.get('/',(req,res)=>{
    res.send("Hello Priyesh")
})

app.listen(3000,()=>{
    console.log('server is listening at port 3000')
})