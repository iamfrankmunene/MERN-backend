const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AuthModel = require('../models/authModel')

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body

    // Check if the user already exists
    const existingUser = await AuthModel.findOne({ username })
    if (existingUser) {
      return res.status(409).json({ message: 'Username taken' })
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new user in the database
    const newUser = new AuthModel({
      username,
      password: hashedPassword,
    })

    await newUser.save()

    res.status(201).json({ message: 'User created successfully' })
  } catch (error) {
    res.status(500).json({ message: 'All fields required' })
  }
}

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body

    // Find the user in the database
    const user = await AuthModel.findOne({ username })
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' })
    }

    // Check if the password matches the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect credentials' })
    }

    // Create and send a JSON Web Token (JWT) to the client for further authentication
    const token = jwt.sign({ username: user.username }, 'your_secret_key', { expiresIn: '1h' })

    res.status(200).json({ message: 'Authentication successful'})
  } catch (error) {
    res.status(500).json({ message: 'Error authenticating user', error })
  }
}


module.exports = { registerUser, loginUser }
