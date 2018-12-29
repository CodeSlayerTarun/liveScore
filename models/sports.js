//MODEL FOR THE SCORES TO BE ENTERED 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Sports = new Schema ({
    eventName: {
        type: String,
        required: true
    },
    format: {
        type: String,
        required: true
    },
    dateOfEvent: {
        type: String ,
        required: true
    },
    eventType: {
        type: String,
        required: true
    },
    sportGender: {
        type: String
    },
    winningTeam: {
        type: String
    },
    otherTeam: {
        type: String
    },
    collegeNameTeamWinner: {
        type: String
    },
    collegeNameTeamOther: {
        type: String
    },
    winningParticpant1: {
        type: String
    },
    collegeNameWinParticipant1: {
        type: String
    },
    winningParticpant2: {
        type: String
    },
    collegeNameWinParticipant2: {
        type: String
    },
    winningParticpant3: {
        type: String
    },
    collegeNameWinParticipant3: {
        type: String
    },
    someDescription: {
        type: String
    }
})

module.exports = mongoose.model('SportEvents', Sports);