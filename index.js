var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/Databases')
var db=mongoose.connection
db.on('error',()=>console.log("Error in connection to database"))
db.once('open',()=>console.log("Connected to database"))

app.post("/signup",async(req,res)=>{
    var name=req.body.name
    var email=req.body.email
    var password=req.body.password

    var data={
        "name":name,
        "email":email,
        "password":password
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record inserted")
    })
    return res.redirect('home.html')
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.get("/home", (req,res)=>{
    res.redirect('home')
})

app.get("/chatbot",(req,res)=>{
    res.redirect('chatbot.html')
})

app.get("/about",(req,res)=>{
    res.redirect('about.html')
})

app.post("/login",(req,res)=>{
    try{
        const check=db.collection.findOne({name:req.body.name})

        if(check.password==req.body.password){
           res.redirect('home.html')
        }
        else{
            res.send("Wrong password")
        }
    }
    catch{
        res.redirect('home.html')
    }
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('home2.html')
}).listen(3000);

console.log("Listening on port 3000")