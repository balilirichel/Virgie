const mongoose = require("mongoose");
const express = require("express");
const { getDb, connectToDb } = require("./db");
const { ObjectId } = require("mongodb");
const Joi = require("joi");
var cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");
const Order = require("./models/orderModel");

require("dotenv").config();

// init app & middleware
const app = express();
app.use(express.json());
app.use(
  cors(/* {
    origin: ["http://localhost:5173", "https://virgie-frontend.onrender.com"],
  } */)
);

// db connection
let db;

connectToDb((err) => {
  if (!err) {
    app.listen("8080", () => {
      console.log("app listening on port 8080");
    });
    db = getDb();
  }
});

// routes
//get all products
app.get("/", (req, res) => {
  res.send("Welcome to the root path!");
});

app.get("/products", async (req, res) => {
  const page = parseInt(req.query.page) || 0; // changed from p → page
  const productsPerPage = 25;

  try {
    const products = await db
      .collection("products")
      .find()
      .sort({ subcategory: 1 })
      .skip(page * productsPerPage)
      .limit(productsPerPage)
      .toArray();

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch the documents" });
  }
});

//get specific subcategory
app.get("/products/subcategory/:subcategory", (req, res) => {
  // current page
  const page = req.query.p || 0;
  const subcategoriesPerPage = 70;

  let products = [];

  db.collection("products")
    .find({ subcategory: req.params.subcategory })
    .sort({ subcategory: 1 })
    .skip(page * subcategoriesPerPage)
    .limit(subcategoriesPerPage)
    .forEach((product) => products.push(product))
    .then(() => {
      res.status(200).json(products);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});

//get specific product
app.get("/products/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("products")
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not fetch the document" });
      });
  } else {
    res.status(500).json({ error: "Could not fetch the document" });
  }
});

// User schema and validation
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("user", userSchema);

const validateUser = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

// Signup route
app.post("/signup", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already exists!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Login route
app.post("/signin", async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });

    console;
    if (!user)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    console.log(user);
    let route = "";
    let role = 0;
    if (user.role === 1) {
      route = "dashboard";
      role = 1;
    }
    const token = user.generateAuthToken();
    res.status(200).send({
      userId: user._id,
      token: token,
      role: role,
      route: route,
      message: "logged in successfully",
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.post("/likes/add", (req, res) => {
  const { userId, productId } = req.body; // Extract userId and productId from the request body

  if (!userId || !productId) {
    return res.status(400).json({ error: "userId and productId are required" });
  }

  const like = {
    userId,
    productId,
    // You can add more fields to the 'like' object if needed
  };

  db.collection("likes")
    .insertOne(like)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not create new document" });
    });
});
// app.post("/cart/add", (req, res) => {
//   const { userId, productId } = req.body; // Extract userId and productId from the request body

//   if (!userId || !productId) {
//     return res.status(400).json({ error: "userId and productId are required" });
//   }

//   const cart = {
//     userId,
//     productId,
//     // You can add more fields to the 'cart' object if needed
//   };

//   db.collection("carts")
//     .insertOne(cart)
//     .then((result) => {
//       res.status(201).json(result);
//     })
//     .catch((err) => {
//       res.status(500).json({ error: "Could not create new document" });
//     });
// });
// Add to cart
app.post("/cart/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;
  if (!userId || !productId) {
    return res.status(400).json({ error: "userId and productId are required" });
  }
  const qty = quantity && Number(quantity) > 0 ? Number(quantity) : 1;
  try {
    // Fetch product price
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(productId) });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    const price = product.saleprice || product.originalprice;

    // Check if already in cart
    const existing = await db
      .collection("carts")
      .findOne({ userId, productId });
    if (existing) {
      // If already in cart, increment the quantity and update price
      await db
        .collection("carts")
        .updateOne(
          { userId, productId },
          { $inc: { quantity: qty }, $set: { price } }
        );
      return res.status(200).json({ message: "Cart quantity updated" });
    }
    const cart = { userId, productId, quantity: qty, price };
    const result = await db.collection("carts").insertOne(cart);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "Could not add to cart" });
  }
});

app.delete("/likes/delete/:id", (req, res) => {
  console.log(req.params.id);
  if (ObjectId.isValid(req.params.id)) {
    db.collection("likes")
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not delete document" });
      });
  } else {
    res.status(500).json({ error: "Could not delete document" });
  }
});

app.delete("/carts/delete/:id", (req, res) => {
  console.log(req.params.id);
  if (ObjectId.isValid(req.params.id)) {
    db.collection("carts")
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not delete document" });
      });
  } else {
    res.status(500).json({ error: "Could not delete document" });
  }
});
app.get("/likes/:userId/:productId", (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;

  db.collection("likes").findOne(
    { userId: userId, productId: productId },
    (err, like) => {
      if (err) {
        res.status(500).json({ error: "Error finding liked item" });
      } else {
        if (like) {
          res.status(200).json(like);
        } else {
          res.status(404).json({ error: "Liked item not found" });
        }
      }
    }
  );
});

app.get("/likes/:userId", (req, res) => {
  const userId = req.params.userId;

  db.collection("likes")
    .find({ userId })
    .toArray()
    .then((likes) => {
      res.status(200).json(likes);
    })
    .catch((err) => {
      res.status(500).json({ error: "Error fetching liked products" });
    });
});

// get all cart
app.get("/carts", async (req, res) => {
  try {
    const carts = await db.collection("carts").find().toArray();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json({ error: "Error fetching cart" });
  }
});

// get all members
app.get("/users", async (req, res) => {
  try {
    const users = await db.collection("users").find().toArray();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

app.get("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (user) {
      res.json({ firstName: user.firstName });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
// Generate order number
const generateOrderNumber = () => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${timestamp}-${random}`;
};

// Create order (checkout)
app.post("/orders/create", async (req, res) => {
  try {
    const { userId, items, shippingAddress, paymentMethod } = req.body;

    if (!userId || !items || !shippingAddress || !paymentMethod) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Items array is required and cannot be empty" });
    }

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingFee = 50; // Fixed shipping fee
    const total = subtotal + shippingFee;

    // Generate unique order number
    const orderNumber = generateOrderNumber();

    // Create order
    const order = new Order({
      userId,
      items: items.map(item => ({
        ...item,
        total: item.price * item.quantity
      })),
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingFee,
      total,
      orderNumber,
    });

    const savedOrder = await order.save();

    // Clear user's cart after successful order
    await db.collection("carts").deleteMany({ userId });

    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Could not create order" });
  }
});

// Get user orders
app.get("/orders/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Could not fetch orders" });
  }
});

// Get single order
app.get("/orders/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Could not fetch order" });
  }
});

const requireSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin access
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};

app.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected Admin route auth
app.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//orders
app.get("/orders", requireSignIn, async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
});

//all orders
app.get("/all-orders", requireSignIn, isAdmin, async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
});

// order status update
app.put("/order-status/:orderId", requireSignIn, isAdmin, async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
});
