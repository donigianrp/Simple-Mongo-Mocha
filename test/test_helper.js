const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// initiates connection
// "before makes sure connection to mongo before testing
before(done => {
  mongoose.connect(
    "mongodb://localhost/users_test",
    { useNewUrlParser: true, useFindAndModify: false }
  );

  // adding event handlers on the mongoose.connection instantiation
  // open and error are specific handlers native to library
  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("error", err => {
      console.warn("Warning", err);
    });
});

// invoked before each test to clean up
beforeEach(done => {
  mongoose.connection.collections.users.drop(() => {
    // Ready to run next test
    done();
  });
});
