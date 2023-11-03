var express = require('express');
var router = express.Router();
var controller = require('../controller/email.server.controller');

router.get('/', controller.apiDocs);
router.post('/get_email', controller.getEmails);
router.post('/send_email', controller.sendEmail);
router.get('/track/:id', controller.emailOpen);

module.exports = router;
