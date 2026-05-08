const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/avatars/'); 
    },
    filename: (req, file, cb) => {
        const userId = req.user ? req.user.id : 'unknown';
        const extension = path.extname(file.originalname);
        cb(null, `avatar_${userId}_${Date.now()}${extension}`);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('You can upload only images!'), false);
        }
    }
});

module.exports = upload;