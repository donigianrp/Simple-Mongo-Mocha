const assert = require("assert");
const User = require("../src/user");

describe("Virtual types", () => {
  it("postCount returns number of posts", done => {
    const rob = new User({
      name: "Rob",
      posts: [{ title: "PostTitle" }]
    });

    rob
      .save()
      .then(() => User.findOne({ name: "Rob" }))
      .then(user => {
        assert(rob.postCount === 1);
        done();
      });
  });
});
