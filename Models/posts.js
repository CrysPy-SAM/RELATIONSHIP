const mongoose = require("mongoose");
const {Schema} = mongoose;

main()
  .then(() => console.log("connection successful"))
  .catch((err) => console.log("connection failed", err));

  async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
  }

  const userSchema = new Schema({
    username: String,
    email: String
  });
  