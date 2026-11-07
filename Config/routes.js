const express = require("express");
const router = express.Router();
const post = require("../Controller/Controller.js");
const comment = require("../Controller/CommentController.js");

router.get("/", post.getAllPosts);
router.post("/", post.createPost);
router.post("/posts/:id/comments", comment.createComment);
router.post("/delete/:id", post.deletePost);
router.get("/edit/:id", post.editPost);
router.post("/edit/:id", post.updatePost);

module.exports = router;