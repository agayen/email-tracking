'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
        enum : ['new','opened', 'failed'],
        default: 'new'
    }
}, { timestamps: true });

var Email = mongoose.model('Email', emailSchema);

module.exports = Email;
