import User from "../models/user.js";
import JWT from "jsonwebtoken";

async function handleUserAuthentication(req, res, next) {
  try{
    const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  const isValid = await JWT.verify(token, process.env.BCRYPT_SECRET);
  if (!isValid) {
    throw new Error("Invalid jwt token");
  }

  const { mobile, email } = isValid;
  const findUser = await User.findOne({ mobile: mobile });
  if (!findUser) {
    throw new Error("User not Found");
  }
  req.mobile = mobil;
  req.mobile = mobile;
  req.userId = findUser._id;
  next();
  }
  catch(e){
    res.status(502).json({
      msg:e.mesaage
    })
  }
}

export default handleUserAuthentication;
