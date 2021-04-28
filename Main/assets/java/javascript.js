// This gets the random word, sets the starred section and runs the timer for the spotify token
// window.onload = getRandomApi(), restoreData(), getToken();
window.onload = restoreData(), getToken();

// This gets a new token from the SPOTIFY API
function getToken() {
  $.ajax({
    type: "POST",
    url: "https://accounts.spotify.com/api/token",        
    headers: {
      Authorization: 
      "Basic " + 
      "ZmQzMTk5MmQ5Zjk0NGFmZjlkMTEyYzI2MjEwMjRmZGM6ZTFlOTZjYzI2NGY2NDkzMmFkODIxNzM2OGE2OWQxYzA="},       
      data: "grant_type=client_credentials",
      
    success:function(response)
    {
      newToken = response.access_token
      localStorage.setItem("new token", newToken);
      console.log("refresh token");
    },
    error : function()
    {
      console.log("Something went wrong refreshing the token");
    }   
  });
}

// This refresh the token
setInterval(function(){ getToken(); }, 3600000);


// This manages the functionality between pages
$("#lyrics").hide();
$("#song").hide();
$("#definition-section").hide();
$("#hide").show();
$("#starred-section").hide();
$("#clear").hide()

var input;
// This gets the val from the input in the search engine
$("#search-btn").click(function () {
  // This avoids searching for nothing
  if ($("#word-input").val() !== "") {
    $("#definition-section").show();
  $("#search-engine").hide();
  input = $("#word-input").val()
  // This sets the value in the local storage
  localStorage.setItem("word", input)
  var random = document.getElementById("random");
      random.innerHTML = input;
      $("#word-text").text(input);
  getWord();
  getSong();
    
  } else {
    window.alert("Please enter a valid input")
  }
  
});

// This displays the song section
$("#audio").click(function () {
  $("#song").show();
  $("#definition-section").hide();
  $("header").hide();
});

// This shows the search engine again
$("#search-again").click(function () {
  location.reload()
});

// This displays the definition section
$(".fa-arrow-left").click(function () {
  $("#song").hide();
  $("#definition-section").show();
  $("header").show();
  $("#lyrics").hide();
  $("#starred-section").hide();

});

// This displays the lyrics section
$(".fa-chevron-circle-down").click(function () {
  $("#lyrics").show();
});

// This shows the starred section
$("#saved-btn").click(function () {
  $("#starred-section").show();
  $("#definition-section").hide();
  $("header").hide();
  if ($("#saved-words-list")[0].childNodes.length > 3){
    $("#clear").show()
  } else if ($("#saved-words-list")[0].childNodes.length == 3) {
    $("#no-starred").show()
    $("#clear").hide()
  }
});

$("#current-date").text(moment().format("LL"));

// function getRandomApi() {
//   // fetch request gets a random word
//   var requestUrl = "https://random-word-api.herokuapp.com/word?number=1";

//   fetch(requestUrl) // --when you get the response to this function
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       var random = document.getElementById("random");
//       // random.innerHTML =
//       random.innerHTML = data;
//       $("#word-text").text(data);
//       var word2 = data;

//       localStorage.setItem("random word", word2);
 
//       getWord();
//       getSong();
//     });
// }




var fetchLyrics = document.getElementById("fetch-lyrics");
function getLyricsApi() {
//get Song and Artist from LocalStorage and set them to variables to be inputs for the Lyrics API
  var getLocalSong = localStorage.getItem("Song");
  var getLocalArtist = localStorage.getItem("Artist");
  console.log(getLocalSong);
  console.log(getLocalArtist);

  // fetch request gets Lyrics for Artist + Song requested
  var requestUrl = "https://api.lyrics.ovh/v1/"+ getLocalArtist + "/" + getLocalSong;

  fetch(requestUrl) // --when you get the response to this function
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var displayLocalSong = document.getElementById("getLocalSong");
      var displayLocalArtist = document.getElementById("getLocalArtist");
      var lyrics = document.getElementById("lyrics-block");
      displayLocalSong.innerHTML = getLocalSong;
      displayLocalArtist.innerHTML = getLocalArtist;
      lyrics.innerHTML = data.lyrics;
      console.log(lyrics);
    });
}

fetchLyrics.addEventListener("click", getLyricsApi);

// This is the SPOTIFY API section
function getSong() {
  // This gets the random word from local storage
  var word = localStorage.getItem("word");

  // This sets the URL for the ajax call
  var queryURL =
    "https://api.spotify.com/v1/search?q=" + word + "&type=track&market=us";

  // This gets the data from the SPOTIFY API
  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      Authorization:
        "Bearer " +

        localStorage.getItem("new token"),

    },
  }).then(function (response) {
    // This creates a new var with the preview audio
    var song = new Audio(response.tracks.items[0].preview_url);
    var isPlaying = false;

    // This changes the HTML with the data from the response
    $("#Song-name").html(response.tracks.items[0].name);
    $("#artist").html(response.tracks.items[0].artists[0].name);
    $("#song-cover")[0].attributes[1].nodeValue =
      response.tracks.items[0].album.images[0].url;
    //Set Song and Artist elements in local storage to be fetch by the lyrics API
    var setSong = response.tracks.items[0].name; 
    var setArtist = response.tracks.items[0].artists[0].name;
    
    console.log(setSong);
    console.log(setArtist);

    localStorage.setItem("Song", setSong);
    localStorage.setItem("Artist", setArtist);

    

    var play;

    // This plays the song
    $(".fa-play-circle").click(function () {
      // Play
      if (isPlaying == false) {
        play = song.play();
        // This changes the play/pause icon
        $("#play-i")[0].className = "fas fa-pause-circle";
        isPlaying = true;
        // Pause
      } else if (isPlaying == true) {
        song.pause();
        $("#play-i")[0].className = "fas fa-play-circle";
        isPlaying = false;
      }
    });


    // This makes an array with all the songs that have preview audio to avoid using songs that can't be played
    var array;
    if (song.src == "file:///Users/reginaa_fc/project-1/Main/null") {
      var array = [];
      // This makes the array and sorts it
      for (var i = 0; i < response.tracks.items.length; i++) {
        array.push(response.tracks.items[i].preview_url + "--" + i);
        array.sort();
        var topval = array[0].split("--")[1];
      }
      // This changes the html
      $("#Song-name").html(response.tracks.items[topval].name);
      $("#artist").html(response.tracks.items[topval].artists[0].name);
      $("#song-cover")[0].attributes[1].nodeValue =
        response.tracks.items[topval].album.images[0].url;
      var song = new Audio(response.tracks.items[topval].preview_url);
    } 
});
}




var getWord = function () {
  localStorage.getItem("word");
  localStorage.getItem("random def");

  var apiUrl =
    "https://lingua-robot.p.rapidapi.com/language/v1/entries/en/"
     +
    localStorage.getItem("word");
  console.log(apiUrl);

  fetch(apiUrl, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "dba152fef7mshbdc2b7d805cce41p1ed6d3jsn7bda9d07ce37",
      "x-rapidapi-host": "lingua-robot.p.rapidapi.com",
    },
  })
    .then((response) => response.json())
    .then((data) => {
     
      var worddef = data.entries[0].lexemes[0].senses[0].definition;
      var wordtyp = data.entries[0].lexemes[0].partOfSpeech;
      var wordpron = new Audio(data.entries[0].pronunciations[1].audio.url);
      var isPlaying = false;

      localStorage.setItem("definition", worddef)

      $("#typeword").text(wordtyp);
      $("#definition").text(worddef);
      console.log(data);
      console.log(wordpron);
      localStorage.setItem("pronunciation", wordpron);
      
var play;
    // This plays the pronunciation 
    $("#pronunciation").click(function () {
     
      console.log(wordpron);
      // Play
      if (isPlaying == false) {
        play = wordpron.play();
        isPlaying = true;
      } else if (isPlaying == true) {
        wordpron.pause();
        isPlaying = false;
      }
    });

    });
};

// This saves the words
var isSaved = false;
$("#save-btn").click(function () {
  if (isSaved == false) {
    $("#clear").show()
    localStorage.setItem("saved-song", localStorage.getItem("word"));
    $("#save-btn")[0].className = "fas fa-bookmark";
    // This appends the li elements
    $("#saved-words-list").prepend(
      $('<li class="li-el">').html(localStorage.getItem("saved-song"))
    );
    $("#no-starred").hide()
    isSaved = true;
    // This saves it in the local storage
    localStorage.setItem("starred", $("#saved-words-list")[0].innerHTML);
  
  } else if (isSaved == true) {
    // This removes the saved
    localStorage.removeItem("starred"[0]);
    $("#save-btn")[0].className = "far fa-bookmark";
    $("#saved-words-list")[0].children[0].remove();
    localStorage.setItem("starred", $("#saved-words-list")[0].innerHTML);
    isSaved = false;
    if ($("#saved-words-list")[0].childNodes.length == 3) {
      $("#no-starred").show()
      $("#clear").hide()
      isSaved = false;
    }
  }
});
console.log($("#saved-words-list")[0].childNodes.length)
// This clears the saved section
$("#clear").click(function () {
  $("#no-starred").show()
  // This clears the local storage
  localStorage.removeItem("starred");
  // This removes the li elements from the starred section
  $('.li-el').remove()
  $("#clear").hide()
  $("#save-btn")[0].className = "far fa-bookmark";
  isSaved = false;
});


// This restores the data from the starred section
function restoreData() {
  // Check for saved wishlist items
  var saved = localStorage.getItem("starred");

  // If there are any saved items, update our list
  if (saved) {
    $("#saved-words-list")[0].innerHTML = saved;
  }
}
    
$("#saved-words-list").on("click", "li.li-el", function (event) {
  input= $(this).html()
  console.log(input)
  $("#definition-section").show();
  $("#starred-section").hide();
  // This sets the value in the local storage
  localStorage.setItem("word", input)
  var random = document.getElementById("random");
      random.innerHTML = input;
      $("#word-text").text(input);
  getWord();
  getSong();
});
