import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";

 async function handleLoginUser(req, res) {
  try {
    const { mobile, password } = req.body;
    // console.log(req.body);
    if ([mobile, password].some((field) => !field || field.trim === "")) {
      throw new Error("Invalid Login Credentials");
    }
    const findUser = await User.findOne({ mobile });
    if (!findUser){
        throw new Error("User not found")
    }
    if (findUser) {
      const validPassword = await bcrypt.compare(password, findUser.password);
      if (!validPassword){
        throw new Error("Invalid Login Credentials");
      }
      if (validPassword) {
        const jwt = JWT.sign({ mobile }, process.env.BCRYPT_SECRET, {
          expiresIn: "3 days",
        });
        res
          .status(201)
          .json({
            msg: "Successfull Login",
            jwt,
          })
          .end();
      } 
    }
  } catch (e) {
    res.status(402).json({
      msg: e.message,
    });
  }
}

export default handleLoginUser