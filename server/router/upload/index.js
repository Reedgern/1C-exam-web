const express = require('express');
const { uploadImageController, getImageController } = require('../../controllers/upload');

const uploadRouter = express.Router();

uploadRouter.post('/', uploadImageController);
uploadRouter.get('/', getImageController);

module.exports.uploadRouter = uploadRouter;