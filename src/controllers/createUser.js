import User from  "../models/user.js"

async function handleUserRegistration(req, res) {
    // console.log(req.body);
    const { name, mobile, email, password } =
      req.body;
    try {
      if (
        [name, mobile, email, password].some(
          (ele) => ! ele || ele?.trim===""
        )
      ) {
        throw new Error("Fill all required data")
      }
      const result=await User.findOne({
        $or:[{email:email.toLowerCase()},{mobile}]
      })
  
      if (result){
        throw new Error("User already exists")
      }
  
      const hashedPassword=await bcrypt.hash(password,10)
  
      const createdUser=await User.create({
        name,
        mobile,
        email:email.toLowerCase(),
        password:hashedPassword,
      });
  
      const findUser=await User.findById(createdUser._id).select("-password")
  
      if (!findUser){
        throw new Error("Error finding creadted user")
      }
  
      res.status(200).json({ msg: "user successfully created" ,user:findUser});
    } catch (e) {
      res.status(401).json({msg:e.message})
    }
  }
  
  export default handleUserRegistration