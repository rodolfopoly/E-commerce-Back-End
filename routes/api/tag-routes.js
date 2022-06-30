const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const productData = await Tag.findAll({
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    })
    if (!productData) {
      res.status(404).json({ message: 'No tag find' });
    }
    res.json(productData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const productData = await Tag.findOne({
      where: { id: req.params.id },
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    })
    if (!productData) {
      res.status(404).json({ message: 'No tag find for this id' });
    }
    res.json(dbData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  };
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const productData = await Tag.create({
      tag_name: req.body.tag_name
    }).
      res.json(productData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  };
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const productData = await Category.update(req.body, { where: { id: req.params.id } });
    if (!productData) {
      res.status(404).json({ message: 'No tag find for this id' });
    }
    res.json(productData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const productData = await Tag.destroy({ where: { id: req.params.id } });

    if (!productData) {
      res.status(404).json({ message: 'No product found' });
    }
    res.json(productData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
