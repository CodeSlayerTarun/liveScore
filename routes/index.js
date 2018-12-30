var express = require('express');
var router = express.Router();
var csrf = require('csurf')
var Sports = require('../models/sports');

/* GET home page. */
router.get('/', function(req, res, next) {
  var PageSize = 9; //number of items to show on a page
  //fetching data
  Sports.find({}).sort({ "_id": -1 }).limit(PageSize).exec(function(err, docs){
    //create row size
    var scoresChunks = [];
    var chunkSize = 3;
    for(var i=0; i < docs.length; i+= chunkSize){
      scoresChunks.push(docs.slice(i, i + chunkSize));
    }
    var nextPage = 2;
    //pasing the data to views
    res.render('home/index', {title: 'Live-Score Timeline:', scores: scoresChunks, nextPage: nextPage});
  })
});

/* GET home page as pagination */
router.get('/:pageNum', function(req, res, next){
  var PageSize = 9; //number of items to show on a page
  var message = false;  //assign page number first
  var pageNum =  req.params.pageNum;
  pageNum = parseInt(pageNum);
  var skipNum = pageNum * PageSize;
  skipNum = parseInt(skipNum);
  Sports.find({}).sort({ "_id": -1 }).skip(skipNum).limit(PageSize).exec(function(err, docs){
    //create row size
    var scoresChunks = [];
    var chunkSize = 3;
    for(var i=0; i < docs.length; i+= chunkSize){
      scoresChunks.push(docs.slice(i, i + chunkSize));
    }
    var nextPage = pageNum + 1;
    var prevPage = pageNum - 1;
    if (docs.length <= 0 || nextPage > docs.length){
      nextPage = 1;
      message = "Nothing to show ahead, you can go back to home page."; //docs end message
    }
    if(prevPage < 0){
      prevPage = 0;
    }
    if(pageNum == 1){
      prevPage = 0;
    }
    if(pageNum == 0){
      pageNum = 1;
    }
    //pasing the data to views
    res.render('home/index', {title: 'Live-Score Timeline:',scores: scoresChunks, message: message, pageNum: pageNum, nextPage: nextPage, prevPage: prevPage});
  })

})

module.exports = router;
