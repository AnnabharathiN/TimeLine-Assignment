const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://baratin91_db_user:pS2qtqZNr881ZfBO@cluster312.xog5rei.mongodb.net/")
.then(() => {   console.log("MongoDB connected successfully"); })
.catch((err) => {   console.error("MongoDB connection error:", err); });
