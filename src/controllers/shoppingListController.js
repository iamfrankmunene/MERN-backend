const ShoppingListModel = require('../models/shoppingListModel')

const createItem = async (req, res) => {
  try {
    const { name } = req.body
    const newItem = new ShoppingListModel({ name })
    await newItem.save()
    res.status(201).json(newItem)
  } catch (error) {
    res.status(500).send('Error creating shopping list item', error)
  }
}

const updateItem = async (req, res) => {
  try {
    const { itemId } = req.params
    const item = await ShoppingListModel.findById(itemId)
    if (!item) {
      return res.status(404).send('Shopping list item not found')
    }
    item.completed = true
    item.crossedOutDate = new Date()
    await item.save()
    res.status(200).send(item)
  } catch (error) {
    res.status(500).json({'Error updating item': error})
  }
}

const deleteItem = async (req, res) => {
  try {
    const { itemId } = req.params
    const item = await ShoppingListModel.findByIdAndDelete(itemId)
    if (!item) {
      return res.status(404).send('Shopping list item not found')
    }
    res.status(200).json(item)
  } catch (error) {
    res.status(500).send('Error deleting shopping list item', error)
  }
}


const getItems = async (req, res) => {
    try {
      const deletedItems = await ShoppingListModel.find()
      res.status(200).send(deletedItems)
    } catch (error) {
      res.status(500).send('Error fetching delete history', error)
    }
  }



module.exports = {
  createItem,
  updateItem,
  getItems,
  deleteItem
}
