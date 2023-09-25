const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

/*
        Making a user to test the functionality , in real case th e user will be from database.
*/

const user = {
    "name" : "Priyesh",
    "email" : "test123@gmail.com",
    "password" : "8992ye2eey2ydg7jxoish8d092ujij"
}

const JWT_SECRET = 'SuperSecret2023'                // in real it must be kept in .env file

/*
Express provides you with middleware to deal with the (incoming) data (object) in the body of the request.

a. express.json() is a method inbuilt in express to recognize the incoming Request Object
 as a JSON Object. This method is called as a middleware in your application using the code: app.use(express.json());

b. express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object
 as strings or arrays. This method is called as a middleware in your application using the code: app.use(express.urlencoded());

*/

app.use(express.json())
app.use(express.urlencoded({extended : false}))             // extended = false means this deals with simple key value pair type data. Not the nested object.
app.set('view engine' , 'ejs')                              //When you set the view engine to 'ejs' using app.set('view engine', 'ejs'),
                                                            // you are telling Express that you will be using EJS templates to render HTML views

app.get('/',(req,res)=>{
    res.send("Hello Priyesh")
})

app.listen(3000,()=>{
    console.log('server is listening at port 3000')
})


app.get('/forgotPassword',(req,res)=>{                             // when we get forgot password request we will open the page for forgot password
    res.render('forgotPassword')
})

app.post('/forgotPassword',(req,res,next)=>{                // body will be posted on forgotPassword page opened just before it
    const {email} = req.body

    if(email !== user.email){                               // checking if user exists in database
        res.send("User Not Registered !")
        return
    }

                                                            // creating one time link
    const secret = JWT_SECRET + user.password
    const payload = {
       "email" : user.email,
       "name" : user.name
    }

    const token = jwt.sign(payload,secret,{expiresIn: '15m'})                       // 15 min expiration time
    const link = `https://localhost:3000/resetPassword/${user.name}/${token}`
    console.log(link)                                                               // instead of consol we will send mail to user.email
    res.send("Password reset link has been sent to the registered email.")

})