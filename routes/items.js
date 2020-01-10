const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');

const Item = require('../models/Item');

// @route   GET api/items
// @desc    Get all items
// @access  Public
// router.get('/', (req, res) => {
//   Item.find()
//     .sort({ date: -1 })
//     .then(items => res.json(items));
// });
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ date: -1 });
    res.json(items);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/items
// @desc    Create an item
// @access  Private
// router.post('/', (req, res) => {
//   const newItem = new Item({
//     name: req.body.name
//   });

//   newItem.save().then(item => res.json(item));
// });
router.post('/', auth, async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name
    });

    const item = await newItem.save();

    res.json(item);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/items/:id
// @desc    Delete an item
// @access  Private
// router.delete('/:id', (req, res) => {
//   Item.findById(req.params.id)
//     .then(item => item.remove().then(() => res.json({ success: true })))
//     .catch(err => res.status(404).json({ success: false }));
// });
router.delete('/:id', auth, async (req, res) => {
  try {
    await Item.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Item deleted' });
  } catch (error) {
    console.error(error.mesage);
    res.status(500).send('Server error');
  }
});

module.exports = router;
