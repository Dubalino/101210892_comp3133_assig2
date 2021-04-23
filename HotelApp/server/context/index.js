const {verify} = require("jsonwebtoken");

module.exports = req => {
  const token = req.cookies.token;
  console.log(token)
  const context = {isAuth: false, userId: null};
  if (!token) {
    return context;
  }

  if (!token || token === "") {
    return context;
  }

  let payload;
  try {
    payload = verify(token, "THIS_IS_MY_SECRET");
  } catch (err) {
    return context;
  }

  if (!payload) {
    return context;
  }

  context.isAuth = true;
  context.userId = payload.userId;
  return context;
};
