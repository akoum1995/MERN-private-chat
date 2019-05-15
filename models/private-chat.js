var mongoose = require('mongoose');

var privateChat = new mongoose.Schema({
    user1:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    user2:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    messages:[ {
        content: String,
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
        createdDate: {type: Date, default: Date.now()}
}]
});

module.exports = mongoose.model('privateChat', privateChat);