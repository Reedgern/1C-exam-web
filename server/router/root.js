const express = require('express');
const { uploadRouter } = require('./upload');

const rootRouter = express.Router();

rootRouter.use('/image', uploadRouter);

module.exports.rootRouter = rootRouter;