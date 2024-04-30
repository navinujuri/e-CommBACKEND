const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
} = require("../controller/userCtrl");
const { authMiddleware, 
isAdmin
 } = require("../middlewares/authMiddleware");
const router = express.Router();




router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);

router.put("/password", 
// authMiddleware, 
updatePassword);


router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);

//User APIs
router.get("/all-users", getallUser);
router.get("/:id",authMiddleware,isAdmin,getaUser);
router.delete("/:id", deleteaUser);
router.put("/edit-user", authMiddleware, updatedUser);



router.post("/cart", authMiddleware, userCart);
router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/cash-order", authMiddleware, createOrder);
router.get("/get-orders", authMiddleware, getOrders);
router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.post("/getorderbyuser/:id", authMiddleware, isAdmin, getAllOrders);

router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart", authMiddleware, getUserCart);

router.delete("/empty-cart", authMiddleware, emptyCart);

router.put(
  "/order/update-order/:id",
  authMiddleware,
  isAdmin,
  updateOrderStatus
);

router.put("/save-address", authMiddleware, saveAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
