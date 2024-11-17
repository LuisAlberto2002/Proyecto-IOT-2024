require('mongoose')
const userModel = require("./../Models/userModel");

class userController{
    login(req,res){
        res.send("Mensaje solido");
    }

}



module.exports = new userController();