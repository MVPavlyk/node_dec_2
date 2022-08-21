const {Schema, model} = require('mongoose');
const {emailActions} = require('../config');

const ActionTokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },

    actionToken: {
        type: String,
        required: true
    },

    actionType: {
        type: String,
        required: true,
        enum: Object.values(emailActions)
    }
}, {timestamps: true});

module.exports = model('action-tokens', ActionTokenSchema);