const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 8080;

// Middleware to handle JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint to upload a file
app.post('/upload', (req, res) => {
    console.log(req.files);
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
  }

  // Get the file from the request
  const file = req.files.file;

  // Generate a unique filename using UUID
  const fileName = uuidv4();

  // Move the file to the upload directory with the new name
  file.mv(`uploads/${fileName}`, (err) => {
    if (err) {
      res.status(500).send(err);
    }

    // Return the link to access the uploaded file
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${fileName}`;
    res.send(`File uploaded successfully. You can access it at: ${fileUrl}`);
  });
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
