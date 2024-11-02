const express = require('express')
const router = express.Router()

const { localFileUpload, imageUpload, videoUpload, imageSizeReducer, videoSizeReducer } = require('../controllers/fileUpload');


router.post('/localFileUpload', localFileUpload);
router.post('/imageUpload', imageUpload);
router.post('/videoUpload', videoUpload);
router.post('/imageSizeReducer', imageSizeReducer);
// router.post('/videoSizeReducer', videoSizeReducer);


module.exports = router;