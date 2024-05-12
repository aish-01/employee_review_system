const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
    {
        // comment given by reviewer
        comment:{
            type:String,
        },
        // reviewers id
        reviewer:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        // recipients id
        recipient:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    },
    {
        timestamps:true,
    }
)

const Feedback = mongoose.model('Feedback',feedbackSchema);

module.exports = Feedback;