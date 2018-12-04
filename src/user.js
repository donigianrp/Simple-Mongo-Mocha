const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = require("./post");

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => {
        return name.length > 2;
      },
      message: "Name must be longer than 2 characters."
    },
    required: [true, "Name is required."]
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "blogPost"
    }
  ]
});

UserSchema.virtual("postCount").get(function() {
  return this.posts.length;
});

UserSchema.pre("remove", function(next) {
  const BlogPost = mongoose.model("blogPost");
  BlogPost.deleteMany({ _id: { $in: this.blogPosts } }).then(() => next());
});

// 'user' is the name set for the collection on the mongo side
// UserSchema is the schema the data should obey
// User represents the entire collection of data
const User = mongoose.model("user", UserSchema);

module.exports = User;
