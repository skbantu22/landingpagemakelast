import User from "../models/User.js";
import Counter from "../models/Counter.js";

// GET all users/orders
export const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const { isComplete } = req.query;
    const filter = {};
    if (isComplete === "true") filter["order.isComplete"] = true;
    else if (isComplete === "false") filter["order.isComplete"] = false;

    const total = await User.countDocuments(filter);

    const users = await User.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ "order.date": -1 });

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      users,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create a new user/order

export const createUser = async (req, res) => {
  const { name, phone, address, quantity, total, paymentMethod, isComplete } = req.body;

  try {
    // Get next order number
    const counter = await Counter.findByIdAndUpdate(
      { _id: "orderNumber" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    const orderNumber = counter.seq;

    // Check if user with this phone exists
    let user = await User.findOne({ phone });

    const newOrder = {
      orderNumber,
      quantity,
      total,
      paymentMethod: paymentMethod || "cod",
      isComplete,
      date: new Date()
    };

    if (user) {
      // Push to orders array
      user.orders.push(newOrder);
      // Optionally update latest order
      user.order = newOrder;
      if (name) user.name = name;
      if (address) user.address = address;
    } else {
      // Create new user
      user = new User({
        name,
        phone,
        address,
        order: newOrder,
        orders: [newOrder]
      });
    }

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// UPDATE delivery status
export const updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { deliveryStatus } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { deliveryStatus },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json({
      message: "Delivery status updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update delivery status" });
  }
};
