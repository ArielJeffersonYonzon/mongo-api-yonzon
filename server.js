const express = require('express');
const cors = require('cors');

const app = express();  // <-- create the Express app

app.use(express.json());  
app.use(cors());


app.get('/', (req, res) => {
  res.json({message: 'Hello World - API is up!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
