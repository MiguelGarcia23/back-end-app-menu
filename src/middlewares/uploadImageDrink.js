const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb( null, 'public/img/drinks' );
    },

    filename: (req, file, cb) => {
        let imageName = 'drink-' + Date.now() + path.extname( file.originalname );
        cb( null, imageName )
    }

})

const upload = multer( { storage } );

module.exports = upload;