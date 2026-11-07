const Comment = require("../Model/comment");
const Controller = require("./Controller");

exports.createComment = async (req, res) => {
    try {
        await Comment.create({ post : req.params.id, comment: req.body.comment });
        res.redirect(`/`);
    }
    catch (err) {
        const posts = await Controller.getPostsWithComments();  ;
        res.render("index", { posts, error: null, text: "",
            commentError: { postId: req.params.Id, message: err.message, text:req.body.comment},
         });
    }
};