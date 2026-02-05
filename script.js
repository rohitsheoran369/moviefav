const API_KEY = "d5585837c92af34f108abad6a1e84115";

const movieList = `
Pulp Fiction
Se7en
The Silence of the Lambs
Saving Private Ryan
The Prestige
The Truman Show
Catch Me If You Can
Léon: The Professional
American Beauty
The Pianist
The Sixth Sense

Black Swan
Shutter Island
Donnie Darko
Prisoners
Nightcrawler
Enemy
Requiem for a Dream
The Lighthouse
Her
Ex Machina

Manchester by the Sea
Blue Valentine
Marriage Story
Call Me by Your Name
The Florida Project
Sound of Metal
Moonrise Kingdom
The Grand Budapest Hotel

Heat
Scarface
The Usual Suspects
Nocturnal Animals
Drive
The Irishman
Carlito’s Way
Mystic River
The Big Short

City of God
The Lives of Others
Incendies
Pan’s Labyrinth
Cinema Paradiso
The Hunt
Burning
Shoplifters

Blade Runner
Blade Runner 2049
Minority Report
Children of Men
Gattaca
Moon
District 9
A Clockwork Orange

Spirited Away
Princess Mononoke
Your Name
Grave of the Fireflies
Inside Out
Coco
The Incredibles

Django Unchained
Reservoir Dogs
Once Upon a Time in America
Casino
Raging Bull
The Revenant
Birdman
No Country for Old Men
Fargo
True Grit

The Shining
Psycho
Get Out
Us
It Follows
The Exorcist
Rosemary’s Baby
The Witch

In the Mood for Love
Chungking Express
Yi Yi
Tokyo Story
Oldboy
Memories of Murder
Decision to Leave

Rocky
Creed
Warrior
Million Dollar Baby

The Curious Case of Benjamin Button
The Theory of Everything
Slumdog Millionaire
Life of Pi
The King’s Speech

Interstellar
Inception
Tenet
Arrival
Gravity
2001: A Space Odyssey

The Dark Knight Rises
Batman Begins
Logan
Joker
Spider-Man: Into the Spider-Verse

The Social Network
Steve Jobs
Moneyball
The Founder

The Breakfast Club
Ferris Bueller’s Day Off
Dead Poets Society

Toy Story 2
Toy Story 3
Up
WALL-E
Ratatouille
Finding Nemo
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
  .filter(t => t.length > 0);

const container = document.getElementById("movies");

movieList.forEach(title => {
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(title)}&include_adult=false`
  )
    .then(res => res.json())
    .then(data => {
      if (!data.results || data.results.length === 0) return;

      // ✅ strict title matching
      const movie = data.results.find(m =>
        m.title.toLowerCase() === title.toLowerCase()
      );

      if (!movie || !movie.poster_path) return;

      container.innerHTML += `
        <div class="card">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
          <h3>${movie.title}</h3>
          <p>⭐ ${movie.vote_average.toFixed(1)}</p>
          <p>${movie.overview.slice(0, 120)}...</p>
        </div>
      `;
    })
    .catch(err => console.error("TMDB error:", err));
});



