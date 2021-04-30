const express = require('express');
const cors = require('cors');
const router  = express.Router();
const dataController = require('../controllers/controller');
const app = express();
app.use(cors())
app.options('*', cors())

router.get('/api', dataController.getAllData);
router.post('/api', cors(), dataController.uploadImg, dataController.newData);
router.delete('/api', dataController.deleteAllData);

router.get('/api/:name', dataController.getOneData);
router.delete('/api/:name', dataController.deleteOneData);

module.exports = router;