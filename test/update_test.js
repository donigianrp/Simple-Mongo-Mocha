const assert = require("assert");
const User = require("../src/user");

describe("Updating records", () => {
  let rob;

  beforeEach(done => {
    rob = new User({ name: "Rob", likes: 0 });
    rob.save().then(() => done());
  });

  function assertName(operation, done) {
    operation.then(() => {
      User.find({}) // passing an empty {} returns all records
        .then(users => {
          assert(users.length === 1);
          assert(users[0].name === "Alex");
        });
      done();
    });
  }

  it("instance type using set and save", done => {
    rob.set("name", "Alex");
    assertName(rob.save(), done);
  });

  it("A model instance can update", done => {
    assertName(rob.updateOne({ name: "Alex" }), done);
  });

  it("A model class can update", done => {
    assertName(User.updateMany({ name: "Rob" }, { name: "Alex" }), done);
  });

  it("A model class can update one record", done => {
    assertName(User.updateOne({ name: "Rob" }, { name: "Alex" }), done);
  });

  it("A model class can find a record with an Id and update", done => {
    assertName(User.findOneAndUpdate({ _id: rob._id }, { name: "Alex" }), done);
  });

  it("A user can have their likes incremented by 1", done => {
    User.updateMany({ name: "Rob" }, { $inc: { likes: 1 } })
      .then(() => User.findOne({ name: "Rob" }))
      .then(user => {
        assert(user.likes === 1);
        done();
      });
  });
});
