// app.js
const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const movieList = document.getElementById('movie-list');
const movieForm = document.getElementById('movie-form');
const loading = document.getElementById('loading');

// Load movies from localStorage or return empty array
const getStoredMovies = () => JSON.parse(localStorage.getItem('movies')) || [];

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card card';
    card.dataset.id = movie.id || Date.now(); // Unique ID for local storage
    
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body d-flex justify-content-between align-items-center';
    
    const title = document.createElement('h5');
    title.className = 'card-title mb-0';
    title.textContent = movie.title;
    
    const year = document.createElement('p');
    year.className = 'card-text mb-0 mx-3';
    year.textContent = `Year: ${movie.year || movie.id}`;
    
    const btnGroup = document.createElement('div');
    
    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-sm btn-warning me-2';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => editMovie(card, movie));
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-sm btn-danger';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteMovie(card));
    
    btnGroup.append(editBtn, deleteBtn);
    cardBody.append(title, year, btnGroup);
    card.append(cardBody);
    return card;
}

function renderMovies(movies) {
    movieList.innerHTML = '';
    movies.forEach(movie => movieList.appendChild(createMovieCard(movie)));
}

async function fetchMovies() {
    loading.style.display = 'block';
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const movies = data.slice(0, 5).map(item => ({
            title: item.title,
            id: item.id
        }));
        const storedMovies = getStoredMovies();
        const allMovies = [...movies, ...storedMovies];
        renderMovies(allMovies);
        return allMovies;
    } catch (error) {
        console.error('Error fetching movies:', error);
        movieList.innerHTML = '<p class="text-danger">Error loading movies</p>';
    } finally {
        loading.style.display = 'none';
    }
}

async function addMovie(title, year) {
    loading.style.display = 'block';
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, year })
        });
        const newMovie = await response.json();
        const movie = { title, year, id: Date.now() };
        
        // Update localStorage
        const storedMovies = getStoredMovies();
        storedMovies.unshift(movie);
        localStorage.setItem('movies', JSON.stringify(storedMovies));
        
        movieList.prepend(createMovieCard(movie));
    } catch (error) {
        console.error('Error adding movie:', error);
    } finally {
        loading.style.display = 'none';
    }
}

function deleteMovie(card) {
    const id = card.dataset.id;
    const storedMovies = getStoredMovies();
    const updatedMovies = storedMovies.filter(movie => movie.id != id);
    localStorage.setItem('movies', JSON.stringify(updatedMovies));
    card.remove();
}

function editMovie(card, movie) {
    const cardBody = card.querySelector('.card-body');
    cardBody.innerHTML = '';
    
    const form = document.createElement('form');
    form.className = 'd-flex w-100';
    
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.className = 'form-control me-2';
    titleInput.value = movie.title;
    
    const yearInput = document.createElement('input');
    yearInput.type = 'number';
    yearInput.className = 'form-control me-2';
    yearInput.value = movie.year || movie.id;
    yearInput.min = '1900';
    yearInput.max = '2025';
    
    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn btn-sm btn-success';
    saveBtn.textContent = 'Save';
    
    form.append(titleInput, yearInput, saveBtn);
    cardBody.append(form);
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const updatedMovie = {
            id: movie.id,
            title: titleInput.value,
            year: parseInt(yearInput.value)
        };
        
        const storedMovies = getStoredMovies();
        const index = storedMovies.findIndex(m => m.id == movie.id);
        if (index !== -1) {
            storedMovies[index] = updatedMovie;
        } else {
            storedMovies.push(updatedMovie);
        }
        localStorage.setItem('movies', JSON.stringify(storedMovies));
        card.replaceWith(createMovieCard(updatedMovie));
    });
}

// Form validation and submission
movieForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!movieForm.checkValidity()) {
        e.stopPropagation();
        movieForm.classList.add('was-validated');
        return;
    }
    
    const title = document.getElementById('title').value;
    const year = document.getElementById('year').value;
    addMovie(title, year);
    movieForm.reset();
    movieForm.classList.remove('was-validated');
});

document.addEventListener('DOMContentLoaded', fetchMovies);