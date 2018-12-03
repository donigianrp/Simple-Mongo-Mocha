const assert = require("assert");
const User = require("../src/user");

describe("Creating records", () => {
  it("saves a user", done => {
    const rob = new User({
      name: "Rob"
    });

    rob.save().then(() => {
      // has rob been saved?
      assert(!rob.isNew);
      done();
    });
  });
});
