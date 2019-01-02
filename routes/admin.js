var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var mongoose = require('mongoose');

var Sports = require('../models/sports'); //sports model
var MatchMaker = require('../models/match_maker'); //match maker model

//CSRF Protection
var csrfProtection = csrf();
router.use(csrfProtection);

/* GET entry_score page */
router.get('/score_entry', isLoggedin, function(req, res, next){
    var messages = req.flash('error');
    res.render('admin/score_entry', {csrfToken: req.csrfToken, messages: messages, hasErrors: messages.length > 0})
  })

/* POST entry_score page */
router.post('/score_entry', isLoggedin, function(req, res, next){
    var newScore = new Sports();
    newScore.eventName = req.body.eventName;
    if(newScore.eventName == "Overarm Cricket"){
        newScore.color = "text-info border-info";
    }else if(newScore.eventName == "Athletics"){
        newScore.color = "text-success border-success";
    }else if(newScore.eventName == "Box Cricket"){
        newScore.color = "text-warning border-warning";
    }else if(newScore.eventName == "Tug Of War"){
        newScore.color = "text-primary border-primary";
    }else if(newScore.eventName == "Cricket"){
        newScore.color = "text-danger border-danger";
    }else if(newScore.eventName == "Carrom"){
        newScore.color = "text-muted border-muted";
    }else if(newScore.eventName == "Chess"){
        newScore.color = "text-info border-info";
    }else if(newScore.eventName == "Table Tennis"){
        newScore.color = "text-success border-success";
    }else if(newScore.eventName == "Badminton"){
        newScore.color = "text-warning border-warning";
    }else if(newScore.eventName == "Kho-Kho"){
        newScore.color = "text-primary border-primary";
    }else if(newScore.eventName == "Volleyball"){
        newScore.color = "text-danger border-danger";
    }else if(newScore.eventName == "Football"){
        newScore.color = "text-muted border-muted";
    }else if(newScore.eventName == "Throwball"){
        newScore.color = "text-info border-info";
    }else if(newScore.eventName == "Kabaddi"){
        newScore.color = "text-success border-success";
    }else if(newScore.eventName == "Dead lift"){
        newScore.color = "text-warning border-warning";
    }

    newScore.format = req.body.format;
    newScore.dateOfEvent = req.body.dateOfEvent;
    newScore.eventType = req.body.eventType;
    newScore.sportGender = req.body.sportGender;
    newScore.winningTeam = req.body.winningTeam;
    newScore.otherTeam = req.body.otherTeam;
    newScore.collegeNameTeamWinner = req.body.collegeNameTeamWinner;
    newScore.collegeNameTeamOther = req.body.collegeNameTeamOther;
    newScore.winningParticpant1 = req.body.winningParticpant1;
    newScore.collegeNameWinParticipant1 = req.body.collegeNameWinParticipant1;
    newScore.winningParticpant2 = req.body.winningParticpant2;
    newScore.collegeNameWinParticipant2 = req.body.collegeNameWinParticipant2;
    newScore.winningParticpant3 = req.body.winningParticpant3;
    newScore.collegeNameWinParticipant3 = req.body.collegeNameWinParticipant3;
    newScore.someDescription = req.body.someDescription;
    newScore.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/admin/score_entry');
        }
    })
})

/* GET admin panel page */
router.get('/panel', isLoggedin, function(req, res, next){
    var messages = req.flash('error');
    res.render('admin/admin_panel', {csrfToken: req.csrfToken, messages: messages, hasErrors: messages.length > 0})
  })


/* GET Match maker */ /////show only when logged in
router.get('/match_maker', isLoggedin, function(req, res, next){
    var messages = req.flash('error');
    res.render('admin/match_maker', {csrfToken: req.csrfToken, messages: messages, hasErrors: messages.length > 0})
})

/* POST Match maker */ ////
router.post('/match_maker', isLoggedin, function(req, res, next){
    var matchMaked = new MatchMaker();
    matchMaked.eventName = req.body.eventName;
    matchMaked.formatType = req.body.formatType;
    matchMaked.matchGroupDate = req.body.matchGroupDate;
    matchMaked.matchGroupDesc = req.body.matchGroupDesc;
    matchMaked.matchGroup = req.body.matchGroup;
    matchMaked.noMatchpairs = req.body.noMatchpairs;
    //array list one
    matchMaked.teamPairList1.push(req.body.teamPair11);
    matchMaked.teamPairList1.push(req.body.teamPair21);
    matchMaked.teamPairList1.push(req.body.teamPair31);
    matchMaked.teamPairList1.push(req.body.teamPair41);
    matchMaked.teamPairList1.push(req.body.teamPair51);
    matchMaked.teamPairList1.push(req.body.teamPair61);
    matchMaked.teamPairList1.push(req.body.teamPair71);
    matchMaked.teamPairList1.push(req.body.teamPair81);
    matchMaked.teamPairList1.push(req.body.teamPair91);
    matchMaked.teamPairList1.push(req.body.teamPair101);
    //array list two
    matchMaked.teamPairList2.push(req.body.teamPair12);
    matchMaked.teamPairList2.push(req.body.teamPair22);
    matchMaked.teamPairList2.push(req.body.teamPair32);
    matchMaked.teamPairList2.push(req.body.teamPair42);
    matchMaked.teamPairList2.push(req.body.teamPair52);
    matchMaked.teamPairList2.push(req.body.teamPair62);
    matchMaked.teamPairList2.push(req.body.teamPair72);
    matchMaked.teamPairList2.push(req.body.teamPair82);
    matchMaked.teamPairList2.push(req.body.teamPair92);
    matchMaked.teamPairList2.push(req.body.teamPair102);

    matchMaked.save(function(err){
        if(err) {
            console.log(err);
        }else {
            res.redirect('/admin/match_maker');
        }
    })
})
//GET all schedules for deletion 
router.get('/match_maker/delete_schedule', isLoggedin, function(req, res, next){
    MatchMaker.find({}).sort({ "_id": -1 }).exec(function(err, docs){
        var schedules = docs;
        res.render('admin/delete_match_schedule', {schedules: schedules});
    });
});
//GET (removing a match schedule from db)
router.get('/match_maker/delete_schedule/:schedId', isLoggedin, function(req, res, next){
    MatchMaker.findByIdAndRemove(req.params.schedId, function(err, doc){
        if (err) {
            console.log(err);
        }
        res.redirect('/admin/match_maker/delete_schedule');
    })
});

// GET socres for UPDATION
router.get('/scores/update', isLoggedin, function(req, res, next){
    //fetching data
    Sports.find({}).sort({ "_id": -1 }).exec(function(err, docs){
    //create row size
    var scoresChunks = [];
    var chunkSize = 3;
    for(var i=0; i < docs.length; i+= chunkSize){
      scoresChunks.push(docs.slice(i, i + chunkSize));
    }
    //pasing the data to views
    res.render('admin/update_delete_score', {csrfToken: req.csrfToken, title: 'Delete Score!', scores: scoresChunks});
  })
})
//Update GET scores from above
router.get('/scores/update/:scoreId', isLoggedin, function(req, res, next){
    Sports.findById(req.params.scoreId, function(err, result){
        if (err){
            res.render('admin/update_delete_score', {csrfToken: req.csrfToken, err: err}); 
        }
        res.render('admin/update_form_entry', {csrfToken: req.csrfToken, result: result});
    })
})
//Update form
router.post('/scores/update/:scoreId', isLoggedin, function(req, res, next){
    Sports.findOneAndUpdate({ "_id": req.params.scoreId },
        { "$set" : {
            "eventName": req.body.eventName,
            "format": req.body.format,
            "dateOfEvent": req.body.dateOfEvent,
            "eventType": req.body.eventType,
            "sportGender": req.body.sportGender,
            "winningTeam": req.body.winningTeam,
            "otherTeam": req.body.otherTeam,
            "collegeNameTeamWinner": req.body.collegeNameTeamWinner,
            "collegeNameTeamOther": req.body.collegeNameTeamOther,
            "winningParticpant1": req.body.winningParticpant1,
            "collegeNameWinParticipant1": req.body.collegeNameWinParticipant1,
            "winningParticpant2": req.body.winningParticpant2,
            "collegeNameWinParticipant2": req.body.collegeNameWinParticipant2,
            "winningParticpant3": req.body.winningParticpant3,
            "collegeNameWinParticipant3": req.body.collegeNameWinParticipant3,
            "someDescription": req.body.someDescription
        
        }})
        .exec(function(err, docRes){
            if(err){
                console.log(err);
            }
            res.render('admin/update_delete_score',{docRes: docRes});
        })
})
//remove score GET
router.get('/scores/update/delete/:scoreId', isLoggedin, function(req, res, next){
    Sports.findByIdAndRemove(req.params.scoreId, function(err, doc){
        if (err) {
            console.log(err);
        }
        res.redirect('/')
    })
})


/* GET logout */
router.get('/logout', isLoggedin, function(req, res, next){
    req.logout();
    res.redirect('/admin/login');
})

/* GET signup page */
router.get('/signup', notLoggedin, function(req, res, next){
    var messages = req.flash('error');
    res.render('admin/signup', {csrfToken: req.csrfToken, messages: messages, hasErrors: messages.length > 0});    
})
/* POST signup page */
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/admin/login',
    failureRedirect: '/admin/signup',
    session: false,
    failureFlash: true
}));

//notLoggedin routes:
router.use('/', notLoggedin, function(req, res, next){
    next();
})

/* GET login page */
router.get('/login', function(req, res, next){
    var messages = req.flash('error');
    res.render('admin/login', {csrfToken: req.csrfToken, messages: messages, hasErrors: messages.length > 0});
})

/* POST login page */
router.post('/login', passport.authenticate('local.signin', {
    successRedirect: '/admin/panel',
    failureRedirect: '/admin/login',
    failureFlash: true
}))

module.exports = router;

function isLoggedin(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/admin/login')
}

function notLoggedin(req, res, next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/admin/panel')
}