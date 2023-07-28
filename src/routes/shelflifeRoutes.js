const express = require('express')
const { 
    newShelflifeInput,
    getAllShelflifeInputs,
    updateShelflifeInput,
    deleteShelflifeInput
 } = require('../controllers/shelflifeController')

const router = express.Router()


router.post('/', newShelflifeInput)

router.get('/', getAllShelflifeInputs)

router.put('/:id', updateShelflifeInput)

router.delete('/:id', deleteShelflifeInput)

module.exports = router