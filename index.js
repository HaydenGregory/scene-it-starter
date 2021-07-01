const movieContainer = document.getElementById('movie-container')

function renderMovies(movieArray) {
    const movieHTMLArray = movieArray.map(currentMovie => {
        return `<div class="col-4">
                    <div class="movie border border-secondary rounded">
                        <img src="${currentMovie.Poster}"></img>
                        <div class="headings">
                            <h5 class="movie-title">${currentMovie.Title}</h5>
                            <h4 class="movie-release  rounded-bottom rounded-start">${currentMovie.Year}</h4>
                        </div>
                        <button type="button" class="btn btn-success">Add</button>
                        </div>
                    </div>`
    })
    return movieHTMLArray.join('')
}


document.addEventListener('DOMContentLoaded', () => {
    movieContainer.innerHTML = renderMovies(movieData)
})