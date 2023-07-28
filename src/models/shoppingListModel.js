const mongoose = require('mongoose')

const shoppingListItemModel = new mongoose.Schema({
  name: {
    type: String,
    required: true
},
  completed: {
    type: Boolean,
    default: false
},
  crossedOutDate:{
     type: Date
},
})

const ShoppingListModel = mongoose.model('ShoppingListItem', shoppingListItemModel)

module.exports = ShoppingListModel
