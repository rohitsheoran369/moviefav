const API_KEY = "d5585837c92af34f108abad6a1e84115";

const movieList = `
12 Angry Men
12 Years a Slave
A Beautiful Mind
A Prophet
Atonement
Amélie
American Sniper
Arrival
Before Sunrise
Before Sunset
Black Panther
Boyhood
Dead Poets Society
Everything Everywhere All at Once
Eternal Sunshine of the Spotless Mind
Fight Club
Forrest Gump
Get Out
Gladiator
Gone Girl
Good Will Hunting
Goodfellas
Gravity
Inception
Inglourious Basterds
Interstellar
It's a Wonderful Life
Jurassic Park
Kill Bill: Vol. 1
La La Land
Life Is Beautiful
Little Miss Sunshine
Lost in Translation
Mad Max: Fury Road
Memories of Murder
Memento
Moneyball
Mulholland Drive
No Country for Old Men
Ocean's Eleven
Oldboy
Once Upon a Time in Hollywood
Oppenheimer
Parasite
Ratatouille
Schindler's List
Superbad
Taxi Driver
The Dark Knight
The Departed
The Favourite
The Godfather
The Green Mile
The Lord of the Rings: The Fellowship of the Ring
The Matrix
The Shawshank Redemption
The Social Network
The Wolf of Wall Street
There Will Be Blood
Toy Story
Up
WALL-E
Whiplash
Zodiac
`
.split("\n")
.map(t => t.trim())
.filter(Boolean);

const container = document.getElementById("movies");

/* PLAYER FUNCTIONS */
function openPlayer(tmdbId) {
  const iframe = document.getElementById("videasyPlayer");
  iframe.src = `https://player.videasy.net/movie/${tmdbId}?overlay=true&color=00ffff`;
  document.getElementById("playerModal").style.display = "flex";
}

function closePlayer() {
  document.getElementById("videasyPlayer").src = "";
  document.getElementById("playerModal").style.display = "none";
}

/* LOAD MOVIES */
movieList.forEach(title => {
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(title)}`)
    .then(res => res.json())
    .then(data => {
      const movie = data.results?.find(
        m => m.title.toLowerCase() === title.toLowerCase()
      );
      if (!movie || !movie.poster_path) return;

      container.innerHTML += `
        <div class="card" onclick="openPlayer(${movie.id})">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
          <h3>${movie.title}</h3>
          <p>⭐ ${movie.vote_average.toFixed(1)}</p>
          <p>${movie.overview.slice(0,120)}...</p>
        </div>
      `;
    });
});

/* PROGRESS LISTENER (TEST) */
window.addEventListener("message", event => {
  try {
    const data = JSON.parse(event.data);
    console.log("Player progress:", data);
  } catch (e) {}
});

