const mongoose = require('mongoose');
const Comment = require("../Model/comment");
const Post = require("../Model/post");

const isValid = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
}   

const handleError = (res,err) => {
   if (err &&(err.name === "ValidationError"|| err.name === "CastError")) {
        return res.status(400).json({success: false, error: err.message });
    }
    console.error(err);
    return res.status(500).json({success: false, error: "Internal Server Error" });
}
//GET
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (err) {
    handleError(res, err);
  }
};
//POST 
exports.postOnePost = async (req, res) => {
  try {
    const post = await Post.create({ post: req.body?.post });
    res.status(201).json({ success: true, data: post });
  } catch (err) {
    handleError(res, err);
  }
};

//PUT
exports.updateOnePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { post}= req.body||{};

        if (!isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid post ID" });
        }

        const updatedPost = await Post.findByIdAndUpdate(id, { post }, { new: true, runValidators: true });

        if (!updatedPost) {
            return res.status(404).json({ success: false, error: "Post not found" });
        }

        res.status(200).json({ success: true, data: updatedPost });
    } catch (err) {
        handleError(res,err);
    }
};

//DELETE
exports.deleteOnePost = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid post ID" });
        }   

        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({ success: false, error: "Post not found" });
        }
        await Comment.deleteMany({ post: id });
        
        res.status(200).json({ success: true, data: deletedPost });
    } catch (err) {
        handleError(res,err);
    }
};
//GET post comments
exports.getPostComments = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid post ID" });
        }

        const postExists = await Post.findById(id);
        if (!postExists) {
            return res.status(404).json({ success: false, error: "Post not found" });
        }   
        const comments = await Comment.find({ post: id }).sort({ createdAt: 1 });
        res.status(200).json({ success: true, count: comments.length, data: comments });
    } catch (err) {
        handleError(res,err);
    }
};

//POST comment
exports.postComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body || {};
        if (!isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid post ID" });
        }
        const postExists = await Post.findById(id);
    
        if (!postExists) {
            return res.status(404).json({ success: false, error: "Post not found" });
        }   
        const newComment = await Comment.create({ post: id, comment });                     
        res.status(201).json({ success: true, data: newComment });
    } catch (err) {
        handleError(res,err);
    }   
};