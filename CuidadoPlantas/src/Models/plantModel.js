const {Schema,model}=require('mongoose');

const plantSchema=new Schema({
    ID:{type:String, require:true},
    token: {type:String, require:true},
    name: {type:String, require:true},
    type: {type: String, require: true},
    status:{type: String, require:true},
    pin: {type:String, require:true}
})

module.exports=model('plants',plantSchema);