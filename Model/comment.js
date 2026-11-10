const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema(
    {
         post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
        comment: {
            type: String,   
            required: true,
            minlength: [25, "Comment should be minimum 25 characters"],
        },
    },
    {timestamps: true}
);
module.exports = mongoose.model('Comment', commentSchema);
