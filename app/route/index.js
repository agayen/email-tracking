var express = require('express');
var path = require('path');
var router = express.Router();
var emailServerRoute = require('./email.server.route');

express.static('public');

const views = {
    dashboard: path.join(__dirname, '/../public/index.html')
};

router.use('/email', emailServerRoute);
router.use('/', (req, res)=>{
    res.sendFile(views.dashboard);
});

router.get('*', function(req, res){
    res.sendFile(path.resolve(__dirname + '/../public/404.html'));
});

module.exports = router;
