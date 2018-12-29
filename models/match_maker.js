//MODEL FOR MATCH MAKER
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MatchMaker = new Schema ({
    eventName: {
        type: String
    },
    formatType: {
        type: String
    },
    matchGroupDate: {
        type: String
    },
    matchGroupDesc: {
        type: String
    },
    matchGroup: {
        type: String
    },
    noMatchpairs: {
        type: Number
    },
    teamPairList1: {
        type: Array
    },
    teamPairList2: {
        type: Array
    }
})

module.exports = mongoose.model('MatchMaker', MatchMaker);