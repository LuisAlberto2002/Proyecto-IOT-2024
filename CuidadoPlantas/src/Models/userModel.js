const {Schema,model}=require('mongoose');

const userSchema=new Schema({
    name: {type:String, require:true},
    email: {type:String, require:true},
    password: {type: String, require: true},
    role: {type:String, require:true, default:"cliente"},
    token: {type:String, require:true},
    status:{type: String,require:true}
})

module.exports=model('clients',userSchema);