var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//get matchmaker model
var MatchMaker = require('../models/match_maker');

// GET display_match_maker page
router.get('/match_schedules', function(req, res, next){
    MatchMaker.find(function(err, docs){
        if (err) {
            console.log(err);
        }
        var displaySchedule = docs;
        res.render('home/display_match_maker', {matchs: displaySchedule});
    })
})

//GET particular display_match_maker schedule
router.get('/match_schedules/:id', function(req, res, next){
    ////////all schedules 
        var displaySchedule;    
    MatchMaker.find(function(err, docs){
        if (err) {
            console.log(err);
        }
        displaySchedule = docs;
    })
    var hasMatchs;
    if (!displaySchedule){
        hasMatchs = true;
    }
    ////////particular schedule by id
    MatchMaker.findById(req.params.id, function(err, doc){
        if (err) {
            console.log(err);
        }
        var displayIdSched = doc;
        res.render('home/display_match_maker', {idSched: displayIdSched, matchs: displaySchedule, hasMatchs: hasMatchs});
    })
})

//VCET AVAHAN ABOUT PAGE
router.get('/about', function(req, res, next){
    res.render('home/about', {});
  })
  

module.exports = router;