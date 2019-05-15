var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/userSchema');
var jwt = require ('jsonwebtoken');
var passport = require('passport');


router.post('/register',function (req,res){
var motdepasse = bcrypt.hashSync(req.body.password,10);
req.body.password = motdepasse;
var user = new User(req.body);
user.save(function(err,user){
        if(err){
            res.send(err)
        }
        else {
            const io = req.app.get('io');
            io.emit('newUserAdded', user);
        }
})
});

router.post('/login',function (req,res){    
    
    User.findOne({email: req.body.email}, function(err,user){
            if(err){
                res.send(err)
            } else if(!user) {
                res.send({message : 'wrong email'});
            } else {
                if(bcrypt.compareSync(req.body.password, user.password)) {
                    var token = jwt.sign({data:user}, 's3cr3t', {expiresIn:3600});
                    res.send({success:"true", access_token:token});
                } else {
                    res.send({message: 'wrong password'});
                }
            }
})
});
router.get('/getListeUsers',function (req,res){    
    User.find( function(err,users){
            if(err){
                res.send(err)
            } else {
                res.send(users);
            }
})
});

module.exports = router;

