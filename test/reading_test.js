const assert = require("assert");
const User = require("../src/user");

describe("Reading users out of the db", () => {
  let rob;

  beforeEach(done => {
    rob = new User({ name: "Rob" });
    // rob.save().then(() => done());

    rob
      .save()
      .then(() => {
        User.find({ name: "Rob" });
        //done();
      })
      .then(users => {
        done();
      });
  });

  it("finds all users with a name of rob", done => {
    User.find({ name: "Rob" }).then(users => {
      assert(users[0]._id.toString() === String(rob._id));
      done();
    });
  });

  it("find a user with a particular id", done => {
    User.findOne({ _id: rob._id }).then(user => {
      assert(user.name === "Rob");
      done();
    });
  });
});
