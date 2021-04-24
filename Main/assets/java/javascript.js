// This manages the functionality between pages
$("#lyrics").hide();
$("#song").hide();
$("#search-engine").hide();
$("#hide").show();
$("#starred-section").hide();

$("#audio").click(function () {
  $("#song").show();
  $("#definition-section").hide();
  $("header").hide();
});

$(".fa-arrow-left").click(function () {
  $("#song").hide();
  $("#definition-section").show();
  $("header").show();
  $("#lyrics").hide();
  $("#starred-section").hide();
});

$(".fa-chevron-circle-down").click(function () {
  $("#lyrics").show();
});

$("#saved-btn").click(function () {
  $("#starred-section").show();
  $("#definition-section").hide();
  $("header").hide();
});

$("#current-date").text(moment().format("LL"));

function getRandomApi() {
  // fetch request gets a random word
  var requestUrl = "https://random-word-api.herokuapp.com/word?number=1";

  fetch(requestUrl) // --when you get the response to this function
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var random = document.getElementById("random");
      // random.innerHTML =
      random.innerHTML = data;
      $("#word-text").text(data);
      var word2 = data;

      localStorage.setItem("random word", word2);
 
      getWord();
      getSong();
    });
}

window.onload = getRandomApi(), restoreData();

var fetchLyrics = document.getElementById("fetch-button");
function getLyricsApi() {
  // fetch request gets Lyrics for Artist + Song requested
  var requestUrl = `https://api.lyrics.ovh/v1/${Artist}/${Song}`;

  fetch(requestUrl) // --when you get the response to this function
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var lyrics = document.getElementById("lyrics");
      lyrics.innerHTML = data.lyrics;
      console.log(lyrics);
    });
}

// fetchLyrics.addEventListener("click", getLyricsApi);

// This is the SPOTIFY API section
function getSong() {
  // This gets the random word from local storage
  var word = localStorage.getItem("random word");

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
        "BQC4hm1Ny9hUaBG-lBCiuC6KeEbWlbmH2D0IrgEE6CWK8PTPUKdpaDnsEq2N3RRxQ9g1QUrtGTvJ48reJCqdwKcJPdi3e2ZXvP9l9lrUKjBKKnfB3yqERin2qK3TOuWO8UPQZ6PoFJn9gj4rvuQGB2sApKlnrpI1xlPGBKPQldJ-6N3Dc9z0SH4sY5HWo4XgA2ddZ2C_7EpwlCGtcrO2MwlcZ9T4U-vl6lUzrA",
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

    // This gets the name of the song to uppercase
    var namesplit = response.tracks.items[0].name.toUpperCase().split(" ");

    var capName = word.toUpperCase();

    // This avoids using urls from songs that doesn't include the word of the day
    if (namesplit.includes(word) || namesplit.includes(capName)) {
      // console.log("si");
    } else {
      // console.log("no");
      var song = new Audio(response.tracks.items[1].preview_url);

      $("#Song-name").html(response.tracks.items[1].name);
      $("#artist").html(response.tracks.items[1].artists[0].name);
      $("#song-cover")[0].attributes[1].nodeValue =
        response.tracks.items[1].album.images[0].url;
    }

    // This makes an array with all the songs that have preview audio to avoid using songs that can't be played
    var array;
    // console.log(song.src);
    if (song.src == "file:///Users/reginaa_fc/project-1/Main/null") {
      var array = [];

      for (var i = 0; i < response.tracks.items.length; i++) {
        array.push(response.tracks.items[i].preview_url + "--" + i);
        array.sort();
        // console.log(array);
        var topval = array[0].split("--")[1];
        // console.log(topval);
        // console.log(response.tracks.items[topval]);
      }

      // console.log("null");
      $("#Song-name").html(response.tracks.items[topval].name);
      $("#artist").html(response.tracks.items[topval].artists[0].name);
      $("#song-cover")[0].attributes[1].nodeValue =
        response.tracks.items[topval].album.images[0].url;
      var song = new Audio(response.tracks.items[topval].preview_url);
    } else {
      // console.log("si tiene track");
    }
  });

  // $.ajax({
  //   url: "https://accounts.spotify.com/api/token",
  //   method: "GET",
  //   headers: {
  //     clientId: "fd31992d9f944aff9d112c2621024fdc", // my Client ID
  //     clientSecret: "e1e96cc264f64932ad8217368a69d1c0", // my Client Secret
  //   },
  // }).then(function (response) {});
}

var getWord = function () {
  localStorage.getItem("random word");
  localStorage.getItem("random def");

  var apiUrl =
    "https://lingua-robot.p.rapidapi.com/language/v1/entries/en/"
     +
    localStorage.getItem("random word");
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

      $("#typeword").text(wordtyp);
      $("#definition").text(worddef);
      console.log(data);
      //arraypron = data.entries[0].pronunciations[0].audio.url;
      //console.log(data.entries[0].pronunciations[0].audio.url);
    
     // $("#audio").href(arraypron);
    });
};

// This saves the words

var isSaved = false;
$("#save-btn").click(function () {
  if (isSaved == false) {
    localStorage.setItem("saved-song", localStorage.getItem("random word"));
    $("#save-btn")[0].className = "fas fa-bookmark";
    $("#saved-words-list").prepend(
      $('<li class="li-el">').html(localStorage.getItem("saved-song"))
    );
    isSaved = true;
    localStorage.setItem("starred", $("#saved-words-list")[0].innerHTML);
  
  } else if (isSaved == true) {
    localStorage.removeItem("starred"[0]);
    $("#save-btn")[0].className = "far fa-bookmark";
    $("#saved-words-list")[0].children[0].remove();
    localStorage.setItem("starred", $("#saved-words-list")[0].innerHTML);
    isSaved = false;
  }
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
    

