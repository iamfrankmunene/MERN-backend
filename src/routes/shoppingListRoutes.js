const express = require('express')
const {
  createItem,
  updateItem,
  deleteItem,
  getItems
} = require('../controllers/shoppingListController')

const router = express.Router()

// Create a new shopping list item
router.post('/', createItem)

// Get all shopping list items
router.get('/', getItems)

// Update a shopping list item
router.put('/:itemId', updateItem)

// Delete a shopping list item
router.delete('/:itemId', deleteItem)


module.exports = router
