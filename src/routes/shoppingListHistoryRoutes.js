const express = require('express')
const {
  getDeleteHistory,
  deleteItemFromHistory
} = require('../controllers/shoppingListHistoryController')

const router = express.Router()


// Get delete history (completed items)
router.get('/', getDeleteHistory)

// Delete an item from delete history
router.delete('/:itemId', deleteItemFromHistory)

module.exports = router