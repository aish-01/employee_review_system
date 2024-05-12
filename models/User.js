const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        // role : employee or admin
        role:{
            type:String,
            required:true
        },
        // reviews assigned to user by admin
        reviewAssigned:[
            {
                // id of user
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            }
        ],
        // feedback given to user by other employee
        feedbackByOthers:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Feedback'
            },
        ]

    },
    {
        timestamps:true,
    }
)

const User = mongoose.model('User',userSchema);
module.exports = User;