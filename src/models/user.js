const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            index: { unique: true}
        },
        email:{
            type: String,
            required: true,
            index: { unique: true}
        },
        password:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)
const user = mongoose.model('User',UserSchema);
module.exports = user;