const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storagePost = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'storagePost';  // folder where post images will be stored
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });  // Create the directory if it doesn't exist
    }
    cb(null, dir);  // Destination folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    const filename = 'post-' + uniqueSuffix + ext;
    cb(null, filename);
  },
});

const uploadPost = multer({
  storage: storagePost,  // Specifies the storage configuration
  limits: { fileSize: 5 * 1024 * 1024 },  // Limits file size to 5MB
  fileFilter: (req, file, cb) => {  // Filters the files based on extension
    const ext = path.extname(file.originalname).toLowerCase();  // Extracts file extension
    // Only allow images (you can expand this if needed)
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      cb(null, true);  // Accept the file
    } else {
      cb(new Error('Only image files are allowed.'));  // Reject the file
    }
  },
});

module.exports = { uploadPost };