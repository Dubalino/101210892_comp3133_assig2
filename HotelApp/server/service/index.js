const { sign } = require("jsonwebtoken");

module.exports = {
  createRefreshToken: user => {
    return sign({ userId: user.id }, "THIS_IS_MY_SECRET", {
      expiresIn: "30min",
    });
  },
  sendRefreshToken: (res, token) => {
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 900000,
    });
  },
  clearCookie: res => {
    res.cookie('token', "", {
      httpOnly: true,
    });
  },
}
