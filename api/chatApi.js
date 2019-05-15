var express = require('express');
var router = express.Router();
var Chat = require('../models/private-chat');
var passport = require('passport');


router.post('/sendMessage/:idChat',passport.authenticate('bearer', { session: false }),function (req,res){
    Chat.findById(req.params.idChat, function(err, chat){
        if(err){
            res.send(err);
        }
        const io = req.app.get('io');
        chat.messages.push(req.body);
        Chat.findByIdAndUpdate(chat._id, {$set: {messages: chat.messages}}, function(err2, chat2) {
            io.emit('newMessageSended', chat2);
        })
    })
});

router.get('/getPrivateMessage/:idUser1/:idUser2',passport.authenticate('bearer', { session: false }), function (req,res){    
       Chat.findOne({user1: req.params.idUser1, user2:req.params.idUser2}, function(err,chat1) {
        if(err){
            res.send(err);
        }
        if(!chat1){
          Chat.findOne({user1: req.params.idUser2, user2:req.params.idUser1}, function(err2, chat2) {
              if(err2) {
                  res.send(err2);
              }
              if(!chat2) {
                var chat = new Chat({user1: req.params.idUser1, user2: req.params.idUser2, messages: []});
                chat.save( function(err3,chat){
                    if(err3) {
                        res.send(err3)
                    }
                    res.send(chat);
                });
              }else{
              res.send(chat2);
            }
          })

        } else {
            res.send(chat1);
        }
    });
        
});


module.exports = router;

