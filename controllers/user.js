const bcrypt = require('bcrypt');
const Users = require('../models/userModel');
const jwt = require('jsonwebtoken');

const user = {
	registerUser: async (req, res) => {
		try {
			const { username, email, password } = req.body;

   const user = await Users.findOne({ email: email });
   if(user) return res.status(400).json({msg: "The email is already taken."});

   const passwordHash = await bcrypt.hash(password, 10)
   const newUser = new Users({
    username: username,
    email: email,
    password: passwordHash
   })

   await newUser.save()
   // res.json({passwordHash})
			res.json({ msg: 'Signup success' });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	loginUser: async (req, res) => {
		try {
   const {email, password} = req.body;
   const user = await Users.findOne({email: email})
   if(!user) return res.status(400).json({msg: "User does not exist!"})

   const passwordCheck = await bcrypt.compare(password, user.password)
   if(!passwordCheck) return res.status(400).json({msg: "Incorrect Password!"})

   // If login success, create token
   const payload = {id: user._id, name: user.username}
   const token = jwt.sign(payload, process.env.SECRET_TOKEN, {expiresIn: "1d"})

   res.json({token})
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
 verifiedToken: (req, res) => {
  try {
   const token = req.header("Authorization")
   if(!token) return res.send(false)

   jwt.verify(token, process.env.SECRET_TOKEN, async (err, verified) => {
    if(err) return res.send(false)

    const user = await Users.findById(verified.id)
    if(!user) return res.send(false)

    return res.send(true)
   })
  } catch (err) {
   return res.status(500).json({msg: err.message})
  }
 }
};

module.exports = user;
