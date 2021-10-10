const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const ImageUrl = 'https://image.tmdb.org/t/p/w1280';

const SearchUrl =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

getMovies(API_URL);

async function getMovies(URL) {
  const res = await fetch(URL);
  const data = await res.json();
  if (data.results.length == 0) {
    main.innerHTML = '<h1>No results found! </h1>';
  } else {
    showMovies(data.results);
  }
  console.log(data.results);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm != '') {
    getMovies(SearchUrl + searchTerm + '"');
    search.value = '';
  } else {
    window.location.reload();
  }
});

function showMovies(movies) {
  main.innerHTML = '';

  movies.forEach((movie) => {
    const { title, vote_average, overview, poster_path } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
    <img src="${ImageUrl + poster_path}"
          alt=""
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${selectClassByVote(
            vote_average
          )}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
            ${overview}
        </div>

    `;
    main.append(movieEl);
  });
}

function selectClassByVote(vote) {
  if (vote > 8) return 'green';
  else if (vote > 5) return 'orange';
  else return 'red';
}
