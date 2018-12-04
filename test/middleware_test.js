const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");

describe("Middleware", () => {
  let rob, blogPost;
  beforeEach(done => {
    rob = new User({ name: "Rob" });
    blogPost = new BlogPost({
      title: "JS is great",
      content: "Yes it really is."
    });

    rob.blogPosts.push(blogPost);

    Promise.all([rob.save(), blogPost.save()]).then(() => done());
  });

  it("users clean up dangling blogposts on remove", done => {
    rob
      .remove()
      .then(() => {
        return BlogPost.countDocuments();
      })
      .then(count => {
        assert(count === 0);
        done();
      });
  });
});
