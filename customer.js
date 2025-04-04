const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => console.log("connection successful"))
  .catch((err) => console.log("connection failed", err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const orderSchema = new Schema({
  item: { type: String, unique: true },
  price: Number,
});

const customerSchema = new Schema({
  name: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});
//
//customerSchema.pre("findOneAndDelete", async function () {
//  console.log("PRE MIDDLEWARE");
//});

customerSchema.post("findOneAndDelete", async function () {
  console.log("PRE MIDDLEWARE");
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

const findCustomer = async () => {
//  let cus1 = new Customer({
//   name: "SATYAM MISHRA",
//  });

  //let order1 = await Order.findOne({ item: "Chips" });
  //let order2 = await Order.findOne({ item: "Chocolate" });

  //cus1.orders.push(order1);
  //cus1.orders.push(order2);

  let result = await Customer.find({}).populate("orders");
  console.log(result[0]);
};

//findCustomer();

/* const addOrders = async () => {
  const existingOrders = await Order.find({ item: { $in: ["Samosa", "Chips", "Chocolate"] } });

  if (existingOrders.length === 0) {
    let res = await Order.insertMany([
      { item: "Samosa", price: 12 },
      { item: "Chips", price: 10 },
      { item: "Chocolate", price: 40 },
    ]);

    console.log(res);
  } else {
    console.log("Orders already exist, skipping insertion.");
  }
};

addOrders(); */

const addCust = async () =>{
  let newCust = new Customer({
    name: " Karan , Arjun"
  });

  let newOrder = new Order({
    item: "Burger",
    price: 250,
  });

  newCust.orders.push(newOrder);

  await newOrder.save()
  await newCust.save();

  console.log("added new customer");
};

const delCust = async () => {
  const result = await Customer.findOneAndDelete({ name: "SATYAM MISHRA" });
  console.log(result);
};

//addCust();
delCust();
