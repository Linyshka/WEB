const multer  = require("multer");
 
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "static");
    },
    filename: (req, file, cb) =>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + ".jpg");
    },
});

module.exports = storageConfig;