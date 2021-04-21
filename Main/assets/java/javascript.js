$("#song-display").hide();
$("#quote-display").hide();

$("#audio").click(function(){
    $("#song-display").show();
});

$("#cita").click(function(){
    $("#quote-display").show();
});

$("#audio").dblclick(function(){
    $("#song-display").hide();
});

$("#cita").dblclick(function(){
    $("#quote-display").hide();
});

$("#current-date").text(moment().format("LL"));
