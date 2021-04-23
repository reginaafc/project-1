// $("main").hide();
$("#song-display").hide();
$("#quote-display").hide();

$("#audio").click(function () {
  $("#song-display").show();
});

$("#cita").click(function () {
  $("#quote-display").show();
});

$("#audio").dblclick(function () {
  $("#song-display").hide();
});

$("#cita").dblclick(function () {
  $("#quote-display").hide();
});


$("#current-date").text(moment().format("LL"));


var word;

$("#search-button").click( function () {

  var searchInput = $("#word-input").val();
  word = searchInput;

 var queryURL =
  "https://api.spotify.com/v1/search?q=" + word + "&type=track&market=us";

$.ajax({
  url: queryURL,
  method: "GET",
  headers: {
    Authorization:
      "Bearer " +
      "BQCSzDbDRoEsHbixeswvDNKTUhbXM786w-7vksto4hzp3hFMFzg5bQzLmV254_OUj3pHIDM3Fwn12LObT7Q5iW5MQ0BAFGU_8-UU4_HGanDk21DpxmhINdtDnowV0ly-w0hADDY3eK1ANego9o8lTmRCKuNl23EWAhDXhbkOXIp569E42cOaRARswGyxdb8D4d55zNnoE-ZXPA",
  },
}).then(function (response) {

  var song = new Audio(response.tracks.items[0].preview_url);
  var isPlaying = false;

  $("#Song-name").html(response.tracks.items[0].name);
  $("#artist").html(response.tracks.items[0].artists[0].name);
  $("#song-cover")[0].attributes[1].nodeValue =
    response.tracks.items[0].album.images[0].url;

  var play;

  $(".fa-play-circle").click(function () {
    if (isPlaying == false) {
      play = song.play();
      $("#play-i")[0].className = "fas fa-pause-circle";
      isPlaying = true;
    } else if (isPlaying == true) {
      song.pause();
      $("#play-i")[0].className = "fas fa-play-circle";
      isPlaying = false;
    }
  });

  var namesplit = response.tracks.items[0].name.toUpperCase().split(" ");

  var capName = word.toUpperCase();
  console.log(namesplit);
  console.log(capName);

  if (namesplit.includes(word) || namesplit.includes(capName)) {
    console.log("si");
  } else {
    console.log("no");
    var song = new Audio(response.tracks.items[1].preview_url);

    $("#Song-name").html(response.tracks.items[1].name);
    $("#artist").html(response.tracks.items[1].artists[0].name);
    $("#song-cover")[0].attributes[1].nodeValue =
      response.tracks.items[1].album.images[0].url;
  }

  
  var array;
  console.log(song.src);
  if (song.src == "file:///Users/reginaa_fc/project-1/Main/null" ) {

    
    var array = [];

for (var i = 0; i < response.tracks.items.length; i++) {
  array.push(response.tracks.items[i].preview_url + "--" + i);
  array.sort();
  console.log(array);
  var topval = array[0].split("--")[1];
  console.log(topval);
  console.log(response.tracks.items[topval]); }

    console.log("null");
    $("#Song-name").html(response.tracks.items[topval].name);
    $("#artist").html(response.tracks.items[topval].artists[0].name);
    $("#song-cover")[0].attributes[1].nodeValue =
      response.tracks.items[topval].album.images[0].url;
    var song = new Audio(response.tracks.items[topval].preview_url);  
  } else {
    console.log("si tiene track");
  }
});


$.ajax({
  url: "https://accounts.spotify.com/api/token",
  method: "GET",
  headers: {
    clientId : "fd31992d9f944aff9d112c2621024fdc", // my Client ID
    clientSecret : "e1e96cc264f64932ad8217368a69d1c0" // my Client Secret
  },
}).then(function (response) {
  
})




  
})



var getWord = function (worsarray) {
  var apiUrl = 'https://lingua-robot.p.rapidapi.com/language/v1/entries/en/' + word ;

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

      
           
    });   
    
   }
