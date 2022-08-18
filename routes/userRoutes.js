const User = require("../models/userModel");
const router = require("express").Router();
require("../db/conn");
const bcrypt = require("bcrypt");

//signup route
router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password, cpassword } = req.body;
    const userCheck = await User.findOne({ email });
    if (userCheck) {
      return res.json({ msg: "Email is already used", status: false });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userCreated = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      const user = { name: userCreated.name, email: userCreated.email };
      return res.json({
        msg: "User Signed in successfully",
        status: true,
        user,
      });
    }
  } catch (ex) {
    next(ex);
  }
});

//login route
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userCheck = await User.findOne({ email });

    if (!userCheck) {
      return res.json({ msg: "Incorrect username or password", status: false });
    } else {
      const passwordCheck = await bcrypt.compare(password, userCheck.password);

      if (!passwordCheck) {
        res.json({ msg: "Incorrect username or password", status: false });
      } else {
        const user = { name: userCheck.name, email: userCheck.email };
        res.json({ msg: "Login Succesfull", status: true, user });
      }
    }
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
