const crypto = require("crypto");
const User = require("../models/userModel");

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // 1. Generate raw token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // 2. Hash the token to store in DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // 3. Save hashed token and expiry
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour

    await user.save({ validateBeforeSave: false }); // This line is important

    // 4. Send the raw token (not hashed one)
    res.json({
      message: "Password reset token generated",
      resetToken, // This is what you’ll send in Postman
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = forgotPassword;
