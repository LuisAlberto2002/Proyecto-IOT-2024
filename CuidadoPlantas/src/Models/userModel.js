const {Schema,model}=require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    token: { type: String, required: true, unique: true }, 
});

module.exports=model('clients',userSchema);