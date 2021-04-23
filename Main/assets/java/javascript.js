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

var fetchWord = document.getElementById('fetch-word');
  function getRandomApi() {
      // fetch request gets a random word
      var requestUrl = 'https://random-words-api.vercel.app/word';
    
      fetch(requestUrl) // --when you get the response to this function
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data)
          var random = document.getElementById("random");
         // random.innerHTML =
          random.innerHTML=data[0].word;
          console.log(random);
        });
    }


fetchWord.addEventListener('click', getRandomApi);

var fetchLyrics = document.getElementById('fetch-button');
function getLyricsApi() {
    // fetch request gets Lyrics for Artist + Song requested
    var requestUrl = `https://api.lyrics.ovh/v1/${Artist}/${Song}`;
  
    fetch(requestUrl) // --when you get the response to this function
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        var lyrics = document.getElementById("lyrics");
        lyrics.innerHTML = data.lyrics;
        console.log(lyrics);
      });
  }
  
  fetchLyrics.addEventListener('click', getLyricsApi);

  
  
