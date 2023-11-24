'use strict';
require('./loadEnv');
const express = require('express');
const app = express();

const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');

const Promise = require('bluebird');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {emailsQueue,sendNewEmail} = require('./jobs/email/email-queue');

const logger = require('./config/logger');
const routes = require('./app/route');
app.use(express.static('./public'));

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');



const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
    queues: [new BullAdapter(emailsQueue, { allowRetries: true, readOnlyMode: true })],
    serverAdapter,
    options: {
        uiConfig: {
            boardTitle: 'Email BOARD',
            miscLinks: [{text: 'Logout', url: '/logout'}],
        },
    },
});

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on('error', () => {
    logger.error(`unable to connect to database: ${process.env.MONGO_URL}`);
});


// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function init_call() {
    sendNewEmail({order: 12, hello: 12});
}

init_call();
// log routes
app.use(function (req, res, next) {
    logger.info(`${req.method} ${req.originalUrl}`);
    next();
});

app.use('/admin/queues', serverAdapter.getRouter());

app.use(express.static('./app/public'));
app.use('/', routes);


app.listen(process.env.PORT, () => logger.info(`server started ->  ${process.env.PORT}`));
process.on('uncaughtException', function (err) {
    logger.error('error', err);
});
