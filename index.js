const express = require('express');
const app = express();

// Essential: This allows your app to parse incoming JSON data
app.use(express.json());

// 1 & 3. GET endpoint to check if it's live and return JSON
app.get('/', (index, res) => {
  res.json({ message: "Welcome to myapp.render.com!" });
});

// 2 & 3. POST endpoint to receive data and return JSON
app.post('/data', (req, res) => {
  const receivedData = req.body;
  console.log("Data received:", receivedData);
  
  res.status(201).json({
    status: "success",
    received: receivedData
  });
});

// Important: Render assigns a port dynamically via process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
