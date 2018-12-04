const assert = require("assert");
const User = require("../src/user");

describe("Subdocuments", () => {
  it("can create a subdocument", done => {
    const rob = new User({
      name: "Rob",
      posts: [{ title: "PostTitle" }]
    });

    rob
      .save()
      .then(() => User.findOne({ name: "Rob" }))
      .then(user => {
        assert(user.posts[0].title === "PostTitle");
        done();
      });
  });

  it("Can add subdocuments to an existing record", done => {
    const rob = new User({
      name: "Rob",
      posts: []
    });

    rob
      .save()
      .then(() => User.findOne({ name: "Rob" }))
      .then(user => {
        user.posts.push({ title: "New Post" });
        return user.save();
      })
      .then(() => User.findOne({ name: "Rob" }))
      .then(user => {
        assert(user.posts[0].title === "New Post");
        done();
      });
  });

  it("can remove an existing subdocument", done => {
    const rob = new User({
      name: "Rob",
      posts: [{ title: "New Title" }]
    });

    rob
      .save()
      .then(() => User.findOne({ name: "Rob" }))
      .then(user => {
        user.posts[0].remove();
        return user.save();
      })
      .then(() => User.findOne({ name: "Rob" }))
      .then(user => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
