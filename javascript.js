var kegData;
var beerFull= $('#beerColFull1');
var beerHead = $('#beerHead1');
var lastPour= '1344099552';

setTimeout("checkStatus()", 1000);

function checkStatus() {
    console.debug('checking');
    $.ajax({
        url: "data.json",
        dataType: 'json',
    }).done(function(data) {
        kegData= data;
        var lastPercent = parseInt($('#vol1Num')[0].innerHTML);
        if(kegData[0].lastPour != lastPour) {
            console.debug('drink');
            tickDown(lastPercent-5);
            lastPour= kegData[0].lastPour;
            lastPercent= lastPercent-5;
        }
    });
}

function tickDown(percent) {
    var volume = $('#vol1Num')[0];
    //head
    var beerHead= $('#beerHead1');
    var beerHeadMargin= $('#beerHead1').css('margin-top').replace(/[^-\d\.]/g, '');
    beerHeadMargin= parseInt(beerHeadMargin)+10;
    
    //beer
    var beerFull = $('#beerColFull1');
    var beerFullYPos = $('#beerColFull1').css('background-position').replace(/[^-\d\.]/g, '').substr(1);
    beerFullYPos = parseInt(beerFullYPos)+10;
    
    console.debug(volume.innerHTML+'\n');
    console.debug(percent);
    
    if(volume.innerHTML != percent) {
        
        var vol = volume.innerHTML;
        vol--;
        setTimeout(function() {
            volume.innerHTML= vol;
            beerHead.css('margin-top', beerHeadMargin+'px');
            beerFull.css('background-position', "0px "+beerFullYPos+"px");
            tickDown(percent)
        },
        500);
    
    } else {
        return;
    }

}


function updateWowCount(wowCount) {
    var current = $("#"+wowCount+"")[0].innerHTML;
    console.debug(current);
    $("#"+wowCount+"")[0].innerHTML = parseInt(current)+1;
}
