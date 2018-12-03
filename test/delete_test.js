const assert = require("assert");
const User = require("../src/user");

describe("Deleting a user", () => {
  let rob;

  beforeEach(done => {
    rob = new User({ name: "Rob" });
    rob.save().then(() => done());
  });

  it("model instance remove", done => {
    rob
      .remove()
      .then(() => {
        User.findOne({ name: "Rob" });
      })
      .then(user => {
        assert(user == null);
        done();
      });
  });

  it("class method deleteOne", done => {
    // Remove a bunch of records withsome given criteria
    User.deleteOne({ name: "Rob" })
      .then(() => {
        User.findOne({ name: "Rob" });
      })
      .then(user => {
        assert(user == null);
        done();
      });
  });

  it("class method findAndDelete", done => {
    User.findOneAndDelete({ name: "Rob" })
      .then(() => {
        User.findOne({ name: "Rob" });
      })
      .then(user => {
        assert(user == null);
        done();
      });
  });

  it("class method findByIdAndDelete", done => {
    User.findByIdAndDelete(rob._id)
      .then(() => {
        User.findOne({ name: "Rob" });
      })
      .then(user => {
        assert(user == null);
        done();
      });
  });
});
