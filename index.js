const movieContainer = document.getElementById('movie-container')
const form = document.querySelector('form')
const searchBar = document.querySelector('input')


function renderMovies(movieArray) {
    const movieHTMLArray = movieArray.map(currentMovie => {
        return `<div class="col-4">
                    <div class="movie border border-secondary rounded">
                        <img src="${currentMovie.Poster}"></img>
                        <div class="headings">
                            <h5 class="movie-title">${currentMovie.Title}</h5>
                            <h4 class="movie-release  rounded-bottom rounded-start">${currentMovie.Year}</h4>
                        </div>
                        <button type="button" data-imdbid="${currentMovie.imdbID}" class="btn btn-success add-button"><span>Add To Watch List</span></button>
                        </div>
                    </div>`
    })
    return movieHTMLArray.join('')
}


document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', event => {
        const searchValue = searchBar.value
        const urlEncodedSearchString = encodeURIComponent(searchValue)
        event.preventDefault()
        fetch(`https://www.omdbapi.com/?apikey=59354c85&s=${urlEncodedSearchString}`).then(res => res.json()).then(data => {
            movieData = data.Search
            movieContainer.innerHTML = renderMovies(movieData)
            function saveToWatchList(imdbID) {
                const movie = movieData.find((currentMovie) => {
                    return currentMovie.imdbID == imdbID;
                })
                let watchlistJSON = localStorage.getItem('watchlist');
                let watchlist = JSON.parse(watchlistJSON);
                if (watchlist == null) {
                    watchlist = []
                }
                if (!watchlist.find((eachMovie) => {
                    return eachMovie.Title == movie.Title
                })) {
                    watchlist.push(movie)
                }
                watchlistJSON = JSON.stringify(watchlist)
                localStorage.setItem('watchlist', watchlistJSON)
            }
            document.addEventListener('click', (event) => {
                if (event.target.classList.contains('add-button')) {
                    const imbdID = event.target.dataset.imdbid
                    saveToWatchList(imbdID)
                    event.target.querySelector('span').textContent = "Added!"
                }
                if (event.target.parentElement.classList.contains('add-button')) {
                    const imbdID = event.target.parentElement.dataset.imdbid
                    saveToWatchList(imbdID)
                    event.target.textContent = "Added!"
                }
            })
        })
    })
    searchBar.value = ""
})

