const express = require('express');
const router  = express.Router();
const dataController = require('../controllers/controller');

router.get('/api', dataController.getAllData);
router.post('/api', dataController.uploadImg, dataController.newData);
router.delete('/api', dataController.deleteAllData);

router.get('/api/:name', dataController.getOneData);
router.delete('/api/:name', dataController.deleteOneData);

module.exports = router;