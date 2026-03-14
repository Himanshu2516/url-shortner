const express = require('express');
const { handleGenerteNewShortUrl, handleGetAnalytics} = require('../controllers/url');
const router = express.Router();

router.post('/', handleGenerteNewShortUrl);

router.get('/analytics/:shortId', handleGetAnalytics);


module.exports = router;