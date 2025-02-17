export const logout = async (req, res) => {
  const token = req.cookies?.token;
  try {
    res.cookie("token", "").json("Logout successful");
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};
