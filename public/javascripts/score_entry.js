//all js code for score_entry.hbs here
 function changeMatchGroup(x){
    var groupValue = x.value;
    var teamId = document.querySelectorAll('.group_team');
    var partiId = document.querySelectorAll('.group_participant');
    console.log(partiId)

    if(groupValue == 'team'){
        for(var i=0; i < teamId.length; i++){
            teamId[i].classList.remove('displayMatchGroup');
        }
        for(var j=0; j < partiId.length; j++){
            partiId[j].classList.add('displayMatchGroup');
        }
    }
    if(groupValue == 'participant'){
        for(var j=0; j < partiId.length; j++){
            partiId[j].classList.remove('displayMatchGroup');
        }
        for(var i=0; i < teamId.length; i++){
            teamId[i].classList.add('displayMatchGroup');
        }
    }
 }