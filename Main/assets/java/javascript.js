//var userFormEl = document.querySelector('#user-form');
//var nameInputEl = document.querySelector('#username');
var defdisplay = document.querySelector('#linguaro');
var defpron = document.querySelector('#pronuncia');
var arraypron;

var worsarray = "unlike"



$("#song-display").hide();
$("#quote-display").hide();

$("#audio").click(function(){
    $("#song-display").show();
});

$("#cita").click(function(){
    $("#quote-display").show();
    $("#linguaro").show();
    getWord();
});

$("#audio").dblclick(function(){
    $("#song-display").hide();
});

$("#cita").dblclick(function(){
    $("#quote-display").hide();
});

$("#current-date").text(moment().format("LL"));

//$("#pronuncia").click(function(){
 //   var audio = {};
 //   audio["walk"] = new Audio();
 //   audio["walk"].src = arraypron;
 //   audio["walk"].addEventListener('load', function () {
 //   audio["walk"].play();});
//});



var getWord = function (worsarray) {
    var apiUrl = 'https://lingua-robot.p.rapidapi.com/language/v1/entries/en/'+ 'boat' ;
  
    fetch(apiUrl,{
     method: "GET",
     headers: {
         "x-rapidapi-key" : "dba152fef7mshbdc2b7d805cce41p1ed6d3jsn7bda9d07ce37",
         "x-rapidapi-host" : "lingua-robot.p.rapidapi.com"
     }
    })
      .then(response => response.json())
      .then(data => {
     
        console.log(data);

        console.log(data.entries[0].lexemes[0].senses[0].definition);
        var worddef = data.entries[0].lexemes[0].senses[0].definition;
        
        defdisplay.textContent = worddef;  

      

        arraypron = data.entries[0].pronunciations[0].audio.url;
        console.log(data.entries[0].pronunciations[0].audio.url);
         
        //console.log(arraypron);

        //for (var i; i < arraypron.lenght; i++ ){
           // audiourl = data.entries[0].pronunciations[i].audio.url;
          //  console.log(arraypron[i].audio.url);
           // if (audiourl === null){
           // continue;     
          //  }
           //      else {
              //       break;
              //   }
       // }
        
             
      });   
      
     }

    // userFormEl.addEventListener('submit', formSubmitHandler);
  
