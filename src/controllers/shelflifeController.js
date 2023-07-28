const shelflife = require('../models/shelflifeModel')

const newShelflifeInput = async (req, res) => {
    try {
      const { item, date, time, completed } = req.body
  
      const newShelflifeInput = new shelflife({
        item,
        date,
        time,
        completed: completed || false, // If completed is not provided in the request body, default it to false
      })
  
      await newShelflifeInput.save()
      res.status(200).send('Shelflife input saved successfully')
    } catch (error) {
      res.status(500).send('Error saving Shelflife input:', error)
    }
  }
  

  const getAllShelflifeInputs = async (req, res) => {
    try {
      const shelflifeInputs = await shelflife.find()
      res.status(200).json(shelflifeInputs)
    } catch (error) {
      res.status(500).send('Error getting Shelflife inputs:', error)
    }
  }
  

  const updateShelflifeInput = async (req, res) => {
    try {
      const { item, date, time, completed } = req.body
      const { id } = req.params
  
      // Find the existing shelflife input by id
      const existingShelflifeInput = await shelflife.findById(id)
  
      if (!existingShelflifeInput) {
        return res.status(404).send('Shelflife input not found')
      }
  
      // Update the fields
      existingShelflifeInput.item = item
      existingShelflifeInput.date = date
      existingShelflifeInput.time = time
      existingShelflifeInput.completed = completed || false // If completed is not provided in the request body, do not update it
  
      // Save the updated shelflife input
      await existingShelflifeInput.save()
  
      res.status(200).send('Shelflife input updated successfully')
    } catch (error) {
      res.status(500).send('Error updating Shelflife input:', error)
    }
  }
  

  const deleteShelflifeInput = async (req, res) => {
    try {
      const { id } = req.params // Assuming the ID is passed as a URL parameter
      const deletedShelflifeInput = await shelflife.findByIdAndDelete(id)
      
      if (!deletedShelflifeInput) {
        return res.status(404).json({ error: 'Shelflife input not found' })
      }
      
      res.status(200).json({ message: 'Shelflife input deleted successfully' })
    } catch (error) {
      res.status(500).send( 'Error deleting Shelflife input:', error )
    }
  }  
  
  module.exports = {
    newShelflifeInput,
    getAllShelflifeInputs,
    updateShelflifeInput,
    deleteShelflifeInput,
  }