const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String
});

// 'user' is the name set for the collection on the mongo side
// UserSchema is the schema the data should obey
// User represents the entire collection of data
const User = mongoose.model("user", UserSchema);

module.exports = User;
