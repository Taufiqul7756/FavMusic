// const searchSongs = async () => {
//   const searchText = document.getElementById("search-field").value;
//   const url = `https://api.lyrics.ovh/suggest/${searchText}`;
//   const res = await fetch(url);
//   const data = await res.json();
//   displaySongs(data.data);
// };

document
  .getElementById("search-field")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      document.getElementById("search-btn").click();
    }
  });

const searchSongs = () => {
  const lyricsGet = document.getElementById("song-lyrics");
  lyricsGet.innerText = "";
  const errorTag = document.getElementById("error-message");
  console.log(errorTag, "Hello");
  errorTag.innerText = "";
  const searchText = document.getElementById("search-field").value;
  const url = `https://api.lyrics.ovh/suggest/${searchText}`;
  toggleSpinner();
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySongs(data.data))
    .catch((error) =>
      displayError("Something went wrong!! Please try again later!")
    );
};

const displaySongs = (songs) => {
  const songContainer = document.getElementById("song-container");

  songContainer.innerHTML = "";
  songs.forEach((song) => {
    //console.log(songs);
    const songDiv = document.createElement("div");
    songDiv.className = "single-result row align-items-center my-3 p-3";
    songDiv.innerHTML = `
            <div class="col-md-9">
                              <h3 class="lyrics-name">${song.title}</h3>
              <p class="author lead">Album by <span>${song.artist.name}</span></p>
              <audio controls>
                 
              
              
              <source src="${song.preview}" type="audio/mpeg">
            </audio>
               
              </div>
            <div class="col-md-3 text-md-right text-center">
              <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Lyrics</button>
            </div>
            
    `;
    songContainer.appendChild(songDiv);
    toggleSpinner(false);
  });
};

//Previous Method for calling url by fetch
// const getLyric = (artist, title) => {
//   const url = `https://api.lyrics.ovh/v1/${artist}/:${title}`;
//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => displayLyrics(data.lyrics));
// };

//Now we can use async and await instead of .then
const getLyric = async (artist, title) => {
  const url = `https://api.lyrics.ovh/v1/${artist}/:${title}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayLyrics(data.lyrics);
  } catch (error) {
    displayError("Sorry I failed to load lyrics , Please try again later!!!");
  }
};

const displayLyrics = (lyrics) => {
  const lyricsDiv = document.getElementById("song-lyrics");
  lyricsDiv.innerText = lyrics;
};

const displayError = (error) => {
  const errorTag = document.getElementById("error-message");
  errorTag.innerText = error;
};

const toggleSpinner = () => {
  const spinner = document.getElementById("loadingSpinner");
  const songs = document.getElementById("song-container");
  spinner.classList.toggle("d-none");
  songs.classList.toggle("d-none");
};
