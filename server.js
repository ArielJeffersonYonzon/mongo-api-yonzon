const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db')
const Product = require('./models/Product')
const validateProduct = require ('./middleware/validateProduct')
require('dotenv').config();

connectDB();

const app = express();  // <-- create the Express app
app.use(express.json());  
app.use(cors());

app.post('/api/product', async (req, res) => {
  try {
    const product = new Product (req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct );
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

app.get('/api/product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if(!product){
      return res.status(404).json({ message: 'Product not found' }); 
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.put('/api/product/:id', validateProduct, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true}
    );
    if(!product){
      return res.status(404).json({ message: 'Product not found' }); 
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


app.delete('/api/product/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if(!product){
      return res.status(404).json({ message: 'Product not found' }); 
    }
    res.json({ message: 'Product deleted succesfully', product });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

