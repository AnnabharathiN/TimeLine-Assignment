const Post = require("../Model/post");

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.render("index", { posts, error: null, text: "" });
};

exports.createPost = async (req, res) => {
  try {
    await Post.create({ post: req.body.post });
    res.redirect("/");
  } catch (err) {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.render("index", { posts, error: err.message, text: req.body.post });
  }
};

exports.showPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("show", { post });
};

exports.deletePost = async (req, res) => {
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