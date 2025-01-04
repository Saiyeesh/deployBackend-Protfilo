const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const app = express();
const cors = require('cors');
app.use(cors());

const {PORT, DBUSERNAME, DBPASSWORD} = process.env;

const dburl = `mongodb+srv://${DBUSERNAME}:${DBPASSWORD}@cluster0.ckq7e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(dburl).then(function(Connection){
    console.log("Connection")
}).catch(err => console.log(err.message))

const userProtfiloSchemaRules = {
    email: {
        type: String,
        required: true
    },
    name: {
        type:String,
        required: true
    },
    subject: {
        type:String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}

const userProtfiloSchema = new mongoose.Schema(userProtfiloSchemaRules);

const UserProtfiloModel =  mongoose.model("UserProtfiloModel", userProtfiloSchema);

app.get("/api/contact", function(req, res){
    try{
        const userDetails= UserProtfiloModel.find()
        if(userDetails.length == 0){
            throw new err("no users")
        }else{
            res.status(200).json({
                status: "success",
                message: userDetails
            })
        }
    }catch(err){
        res.status(404).json({
            status: 'failure',
            message: err.message
        })
    }
})


app.use(express.json())
app.use(function(req, res, next){
        if(req.method === "POST"){
            const user = req.body;
            const isempty = Object.keys(user).length == 0;
            if(isempty){
                res.status(400).json({
                    status: "failure",
                    message: "its a empty box"
                })
            }else{
                next();
            }
        }else{
            next();
        }
})
app.post("/api/contact", function(req, res){
    try{
        const userDetails = req.body;
        const user = UserProtfiloModel.create(userDetails);
        res.status(200).json({
            status: 'success',
            message: 'message',
            user,
        })
    }catch(err){
        res.status(404).json({
            status: 'failure',
            message: err.message
        })
    }
})

app.listen(PORT, function(){
    console.log("its a console")
})