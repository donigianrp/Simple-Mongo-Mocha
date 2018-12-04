const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/user");
const Comment = require("../src/comment");
const BlogPost = require("../src/blogPost");

describe("Associations", () => {
  let rob, blogPost, comment;
  beforeEach(done => {
    rob = new User({ name: "Rob" });
    blogPost = new BlogPost({
      title: "JS is great",
      content: "Yes it really is."
    });
    comment = new Comment({ content: "Congrats on first post." });

    rob.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = rob;

    Promise.all([rob.save(), blogPost.save(), comment.save()]).then(() =>
      done()
    );
  });

  it("saves a relation between user and blogpost", done => {
    User.findOne({ name: "Rob" })
      .populate("blogPosts")
      .then(user => {
        assert(user.blogPosts[0].title === "JS is great");
        done();
      });
  });

  it("saves a full relation graph", done => {
    User.findOne({ name: "Rob" })
      .populate({
        path: "blogPosts",
        populate: {
          path: "comments",
          model: "comment",
          populate: {
            path: "user",
            model: "user"
          }
        }
      })
      .then(user => {
        assert(user.name === "Rob");
        assert(user.blogPosts[0].title === "JS is great");
        assert(
          user.blogPosts[0].comments[0].content === "Congrats on first post."
        );
        assert(user.blogPosts[0].comments[0].user.name === "Rob");
        done();
      });
  });
});
