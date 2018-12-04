const assert = require("assert");
const User = require("../src/user");

describe("Reading users out of the db", () => {
  let rob, joe, maria, alex, zach;

  beforeEach(done => {
    rob = new User({ name: "Rob" });
    alex = new User({ name: "Alex" });
    maria = new User({ name: "Maria" });
    zach = new User({ name: "Zach" });

    Promise.all([alex.save(), rob.save(), maria.save(), zach.save()]).then(
      () => {
        done();
      }
    );
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

  it("can skip and limit result set", done => {
    User.find({})
      .sort({ name: 1 }) //modifiers
      .skip(1)
      .limit(2)
      .then(users => {
        assert(users.length === 2);
        assert(users[0].name === "Maria");
        assert(users[1].name === "Rob");
        done();
      });
  });
});
