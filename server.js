const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db')
const Product = require('./models/Product')
const validateProduct = require ('./middleware/validateProduct')

connectDB();

const app = express();  // <-- create the Express app



app.use(express.json());  
app.use(cors());

const MONGODB_URI= process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test_yonzon'
mongoose.connect(MONGODB_URI)
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log("mongodb connection error: ", err))

app.get('/', (req, res) => {
  res.json({message: 'Hello World - API is up!' });
});

app.post('/api/product', validateProduct, async (req, res) => {
  try {
    const product = new Product (req.body);
    const savedProduct = await product.save();
    res.status(400).json({ message: error.message });
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

