const Post = require("../Model/post");
const Comment = require("../Model/comment");

const getPostsWithComments = async () => {
  const post = await Post.find().sort({ createdAt: -1 }).lean();
  const comments = await Comment.find().sort({ createdAt: -1 }).lean();
  post.forEach((p) => {
    p.comments = comments.filter((c) => c.post.toString() === p._id.toString());
  } );
  return post;
};
exports.getPostsWithComments = getPostsWithComments;

exports.getAllPosts = async (req, res) => {
  const posts = await getPostsWithComments();
  res.render("index", { posts, error: null, text: "", commentError: null });
};

exports.createPost = async (req, res) => {
  try {
    await Post.create({ post: req.body.post });
    res.redirect("/");
  } catch (err) {
    const posts = await getPostsWithComments();
    res.render("index", { posts, error: err.message, text: req.body.post,commentError: null });
  }
};

exports.showPost = async (req, res) => {
   
  const post = await Post.findById(req.params.id);
  res.render("show", { post });
};

exports.deletePost = async (req, res) => {
     await Comment.deleteMany({ post: req.params.id });
  await Post.findByIdAndDelete(req.params.id);
  res.redirect("/");
};

exports.editPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("edit", { post, error: null });
};

exports.updatePost = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(
      req.params.id,
      { post: req.body.post },
      { runValidators: true }
    );
    res.redirect("/");
  } catch (err) {
    const post = await Post.findById(req.params.id);
    res.render("edit", { post, error: err.message });
  }
};