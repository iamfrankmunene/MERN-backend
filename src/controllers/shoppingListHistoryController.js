const ShoppingListModel = require('../models/shoppingListModel')

const getDeleteHistory = async (req, res) => {
    try {
      const deletedItems = await ShoppingListModel.find({ completed: true })
      res.status(200).json(deletedItems)
    } catch (error) {
      res.status(500).send('Error fetching delete history', error)
    }
  }
  
  const deleteItemFromHistory = async (req, res) => {
    try {
      const { itemId } = req.params
      const item = await ShoppingListModel.findByIdAndDelete(itemId)
      if (!item) {
        return res.status(404).send('Shopping list item not found in the delete history')
      }
      res.status(200).json(item)
    } catch (error) {
      res.status(500).send('Error deleting item from delete history',error)
    }
  }

  module.exports = {
    getDeleteHistory,
    deleteItemFromHistory
  }