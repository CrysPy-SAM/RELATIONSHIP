const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => console.log("connection successful"))
  .catch((err) => console.log("connection failed", err)); // Fixed message for errors

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo"); // Fixed connection URL
}

const userSchema = new Schema({
  username: String,
  addresses: [
    {
      _id: false,
      location: String,
      city: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

const addUsers = async () => {
  let user1 = new User({
    username: "sherlockholmes",
    addresses: [
      {
        location: "221B Bakers Street",
        city: "London",
      },
    ],
  });

  user1.addresses.push({ location: "P32 WallStreet", city: "London" }); // Fixed `Location` → `location`

  let result = await user1.save();
  console.log(result);
};

addUsers();
