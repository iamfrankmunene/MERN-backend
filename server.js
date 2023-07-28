const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const shelflifeRoutes = require('./src/routes/shelflifeRoutes')
const shoppingListRoutes = require('./src/routes/shoppingListRoutes')
const shoppingListHistoryRoutes = require('./src/routes/shoppingListHistoryRoutes')
const  authRoutes = require('./src/routes/authRoutes')
const app = express()
const port = process.env.PORT || 3000

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.on('error', err => {
 // console.error(`DB connection error: ${err.message}`)
})

// Middleware
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Routes
app.use('/shelflife', shelflifeRoutes)
app.use('/shoppingList', shoppingListRoutes)
app.use('/shoppingHistory', shoppingListHistoryRoutes)

//Authentication
app.use('/', authRoutes)

// Start the server
app.listen(port, () => {
  //console.log(`Server running on port ${port}`)
})
