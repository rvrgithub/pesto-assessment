const express = require('express');
const { getTodo } = require('../controller/todoController');
const router = express.Router();
router.get("/getTodo", getTodo);

module.exports = router;