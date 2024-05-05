const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 8080;

// Middleware to handle JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Endpoint to upload a file
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
  }

  // Get the uploaded file details
  const file = req.file;

  // Return the link to access the uploaded file
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
  res.send(`File uploaded successfully. You can access it at: ${fileUrl}`);
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
