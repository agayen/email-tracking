'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const logger = require('../../config/logger');

var emailAttachment = new Schema({
    filename: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
});

var emailSchema = new Schema({
    to: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    attachments: [emailAttachment],
    openedDate: Date,
    html: String,
    error: Schema.Types.Mixed,
    status: {
        type: String,
        enum: ['new', 'opened', 'failed'],
        default: 'new'
    }
}, { timestamps: true });

var Email = mongoose.model('Email', emailSchema);

const fetchData = async function ({callback, fallback, no_skip = 0, limit = 5, stats_require = false, email_status = null}) {
    try {
        let stats_data, data;
        if (email_status && ['new', 'opened', 'failed'].includes(email_status) ){
            data = await Email.find({status: email_status}).skip(no_skip).limit(limit).sort({ createdAt: -1 }).exec();
        }else{
            data = await Email.find({}).skip(no_skip).limit(limit).sort({createdAt: -1}).exec();
        }
        
        if (stats_require){
            const no_of_emails = await Email.find({}).count();
            const no_of_new = await Email.find({status:'new'}).count();
            const no_of_opened = await Email.find({status:'opened'}).count();
            const no_of_failed = await Email.find({status:'failed'}).count();

            console.log(no_of_emails,'no_of_emails');

            stats_data ={
                no_of_emails,
                no_of_new,
                no_of_opened,
                no_of_failed
            };
        }
        return callback(data, stats_data);
    } catch (error) {
        logger.error(error);
        return fallback();
    }
};

module.exports = {
    Email,
    FetchData: fetchData
};
