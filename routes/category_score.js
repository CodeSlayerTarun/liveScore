var express = require('express');
var router = express.Router();
var Sports = require('../models/sports');

// GET category scores 
router.get('/category/:catId', function(req, res, next){
    var idName = req.params.catId;
    //fetching data
    Sports.find({"eventName": idName }).sort({ "_id": -1 }).exec(function(err, docs){
    //create row size
    var catScoresChunks = [];
    var chunkSize = 3;
    for(var i=0; i < docs.length; i+= chunkSize){
        catScoresChunks.push(docs.slice(i, i + chunkSize));
    }
    //pasing the data to views
    res.render('home/category_scores', {catId: idName, catScores: catScoresChunks});
  })

})

module.exports = router;