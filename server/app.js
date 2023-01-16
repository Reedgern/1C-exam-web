/* eslint-disable no-console */
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { rootRouter } = require('./router/root');


const app = express();
const PORT = 8081;

// middlewares
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(multipart());

// router
app.use(rootRouter);

// eslint-disable-next-line
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
});

app.listen(PORT, () => console.info(`mock server started on port ${PORT}`));
