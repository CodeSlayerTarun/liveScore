var express = require('express');
var router = express.Router();
var csrf = require('csurf')
var Sports = require('../models/sports');

/* GET home page. */
router.get('/', function(req, res, next) {
  //fetching data
  Sports.find({}).sort({ "_id": -1 }).exec(function(err, docs){
    //create row size
    var scoresChunks = [];
    var chunkSize = 3;
    for(var i=0; i < docs.length; i+= chunkSize){
      scoresChunks.push(docs.slice(i, i + chunkSize));
    }
    //pasing the data to views
    res.render('home/index', {title: 'Live-Score Timeline:', scores: scoresChunks});
  })

});

module.exports = router;
