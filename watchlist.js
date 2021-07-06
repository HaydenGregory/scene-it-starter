const movieContainer = document.getElementById('movies-container')

function renderMovies(movieArray) {
    const movieHTMLArray = movieArray.map(currentMovie => {
        return `<div class="col-4">
                    <div class="movie border border-secondary rounded">
                        <img src="${currentMovie.Poster}"></img>
                        <div class="headings">
                            <h5 class="movie-title">${currentMovie.Title}</h5>
                            <h4 class="movie-release  rounded-bottom rounded-start">${currentMovie.Year}</h4>
                        </div>
                        <button type="button" data-imdbid="${currentMovie.imdbID}" class="btn btn-danger add-button remove"><span>Remove</span></button>
                        </div>
                    </div>`
    })
    return movieHTMLArray.join('')
}

function arrayRemove(arr, value) { 
    
    return arr.filter(ele =>{ 
        return ele != value; 
    });
}

function removeFromWatchList(imdbID){
    let watchlistJSON = localStorage.getItem('watchlist');
    let watchlist = JSON.parse(watchlistJSON);
    watchlist = watchlist.filter(currentMovie =>{  
        return currentMovie.imdbID != imdbID
    })
    watchlistJSON = JSON.stringify(watchlist)
    localStorage.setItem('watchlist', watchlistJSON)
    movieContainer.innerHTML = renderMovies(watchlist)
}

document.addEventListener('DOMContentLoaded', ()=>{
    let watchlistJSON = localStorage.getItem('watchlist');
    let watchlist = JSON.parse(watchlistJSON);
    movieContainer.innerHTML = renderMovies(watchlist)
    document.addEventListener('click', (event)=>{
        if (event.target.classList.contains('remove')){
            const imbdID = event.target.dataset.imdbid
            removeFromWatchList(imbdID)
        }
        if (event.target.parentElement.classList.contains('remove')){
            const imbdID = event.target.parentElement.dataset.imdbid
            removeFromWatchList(imbdID)
        }
    })
})
