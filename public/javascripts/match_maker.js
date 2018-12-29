function numMatchChange(x) {
    //GET VALUE OF NUMBER OF MATCH PAIRS
    var getMatchNum = x.value;
    //DELETE ALL PREVIOUS INPUTS TO MAKE NEW ONE
    var allPrevs = document.querySelectorAll('.tentative_inputs')
    for(var j=0; j<allPrevs.length; j++) {
        console.log(allPrevs);
        allPrevs[j].parentNode.removeChild(allPrevs[j]);
    }
    //LOOP FOR NUMBER MATCH PAIRS
    for(var i=1; i<=getMatchNum; i++){
        var div = document.createElement("div");
        div.classList.add('form-group');
        div.classList.add('mb-3');
        div.classList.add('tentative_inputs');

        var row = document.createElement('div');
        row.classList.add('row');
        row.classList.add('mb-1');
        row.classList.add('justify-content-center');
        
        var input1 = document.createElement("input");
        input1.setAttribute("type","text");
        input1.setAttribute("name", i);
        input1.setAttribute("placeholder", i+" Enter First Team");
        input1.classList.add('form-control')
        input1.classList.add('col-5')

        var temp = document.createElement('p')
        temp.classList.add('display-6');
        temp.classList.add('m-1')
        var pText = document.createTextNode(" _Vs_");
        temp.appendChild(pText);

        var input2 = document.createElement("input");
        input2.setAttribute("type","text");
        input2.setAttribute("name", i+100);
        input2.setAttribute("placeholder", i+" Enter Second Team");
        input2.classList.add('form-control')
        input2.classList.add('col-5')
        console.log(input2);

        row.appendChild(input1);
        row.appendChild(temp);
        row.appendChild(input2);
        div.appendChild(row);
        var element = document.getElementById("form_match_maker");
        element.appendChild(div);
    }
    //ADDING SUBMIT BUTTON
    var element = document.getElementById("form_match_maker");
    var subBtnText = document.createTextNode("Submit...!")
    var subBtn = document.createElement("button");
        subBtn.setAttribute("type", "submit");
        subBtn.classList.add('btn');
        subBtn.classList.add('btn-block');
        subBtn.classList.add('btn-primary');
        subBtn.classList.add('mb-3');
        subBtn.value = "Submit";
        console.log(subBtn);

        subBtn.appendChild(subBtnText);
        element.appendChild(subBtn);
}