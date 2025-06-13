const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const crypto = require("crypto");

const resetPassword = async (req, res) => {
  const resetToken = req.params.resetToken; // 🔁 Get token from URL
  const { newPassword } = req.body;

  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = resetPassword;
