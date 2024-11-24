const {Schema,model}=require('mongoose');

const plantSchema = new Schema({
    ID: { type: String, required: true, unique: true, default: () => new mongoose.Types.ObjectId().toString() }, // Automatically assigned
    token: { type: String, required: true },
    name: { type: String, required: true, unique:true},
    type: { type: String, required: true },
    pin: { type: String, required: true },
});

module.exports=model('plants',plantSchema);