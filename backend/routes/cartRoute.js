import express from "express";
import userModel from "../models/userModel.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

// Get user's cart
cartRouter.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      cartItems: user.cartData || []
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Update user's cart
cartRouter.post("/", authMiddleware, async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!Array.isArray(cartItems)) {
      return res.status(400).json({ success: false, message: "Cart items must be an array" });
    }

    const user = await userModel.findByIdAndUpdate(
      req.userId,
      { 
        cartData: cartItems,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "Cart updated successfully",
      cartItems: user.cartData
    });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Add single item to cart
cartRouter.post("/add", authMiddleware, async (req, res) => {
  try {
    const { projectId, itemId, projectData } = req.body;
    
    // Accept either projectId or itemId for flexibility
    const id = projectId || itemId;

    if (!id) {
      return res.status(400).json({ success: false, message: "Project ID or Item ID is required" });
    }

    console.log("Adding item to cart:", { id, projectData });
    console.log("User ID:", req.userId);

    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("Current user cart before update:", user.cartData);

    let cartItems = Array.isArray(user.cartData) ? [...user.cartData] : [];
    const existingItemIndex = cartItems.findIndex(item => item.id === id);

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      cartItems[existingItemIndex].quantity = (cartItems[existingItemIndex].quantity || 1) + 1;
      console.log("Updated existing item quantity to:", cartItems[existingItemIndex].quantity);
    } else {
      // Add new item
      const newItem = {
        id: id,
        quantity: 1,
        addedAt: new Date(),
        ...(projectData || {}) // Include projectData if provided
      };
      cartItems.push(newItem);
      console.log("Added new item to cart:", newItem);
    }

    console.log("Cart items before saving:", cartItems);

    // Use findByIdAndUpdate with $set to ensure the update happens
    const updatedUser = await userModel.findByIdAndUpdate(
      req.userId,
      { 
        $set: { 
          cartData: cartItems,
          updatedAt: new Date()
        }
      },
      { 
        new: true, 
        runValidators: true 
      }
    );

    console.log("User after update:", updatedUser.cartData);

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "Failed to update user cart" });
    }

    res.json({
      success: true,
      message: existingItemIndex > -1 ? "Item quantity updated" : "Item added to cart",
      cartItems: updatedUser.cartData,
      cartCount: updatedUser.cartData.length
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// Remove item from cart completely
cartRouter.delete("/remove/:projectId", authMiddleware, async (req, res) => {
  try {
    const { projectId } = req.params;

    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.cartData = (user.cartData || []).filter(item => item.id !== projectId);
    user.updatedAt = new Date();
    await user.save();

    res.json({
      success: true,
      message: "Item removed from cart",
      cartItems: user.cartData
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Decrement item quantity (your original removeFromCart function, updated)
cartRouter.post("/remove", authMiddleware, async (req, res) => {
  try {
    const { itemId } = req.body;
    
    if (!itemId) {
      return res.status(400).json({ success: false, message: "Item ID is required" });
    }

    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartItems = Array.isArray(user.cartData) ? [...user.cartData] : [];
    const existingItemIndex = cartItems.findIndex(item => item.id === itemId);

    if (existingItemIndex > -1) {
      const currentQuantity = cartItems[existingItemIndex].quantity || 0;
      
      if (currentQuantity > 1) {
        // Decrement quantity
        cartItems[existingItemIndex].quantity = currentQuantity - 1;
      } else {
        // Remove item if quantity becomes 0
        cartItems = cartItems.filter(item => item.id !== itemId);
      }

      const updatedUser = await userModel.findByIdAndUpdate(
        req.userId,
        { 
          cartData: cartItems,
          updatedAt: new Date()
        },
        { new: true }
      );

      res.json({
        success: true,
        message: "Removed from cart",
        cartItems: updatedUser.cartData
      });
    } else {
      res.json({
        success: false,
        message: "Item not found in cart"
      });
    }
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Update item quantity in cart
cartRouter.put("/update", authMiddleware, async (req, res) => {
  try {
    const { projectId, quantity } = req.body;

    if (!projectId || quantity < 0) {
      return res.status(400).json({ success: false, message: "Invalid project ID or quantity" });
    }

    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartItems = user.cartData || [];

    if (quantity === 0) {
      // Remove item if quantity is 0
      cartItems = cartItems.filter(item => item.id !== projectId);
    } else {
      // Update quantity
      const existingItemIndex = cartItems.findIndex(item => item.id === projectId);
      if (existingItemIndex > -1) {
        cartItems[existingItemIndex].quantity = quantity;
      }
    }

    user.cartData = cartItems;
    user.updatedAt = new Date();
    await user.save();

    res.json({
      success: true,
      message: "Cart updated successfully",
      cartItems: user.cartData
    });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Clear entire cart
cartRouter.delete("/clear", authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.userId,
      { 
        cartData: [],
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "Cart cleared successfully",
      cartItems: []
    });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default cartRouter;