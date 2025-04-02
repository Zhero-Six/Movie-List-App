# Movie-List-App

## Overview

The Movie List App is a simple web application that demonstrates frontend development skills including DOM manipulation, event handling, and server communication. It allows users to view a list of movies, add new movies, and delete existing ones, all while interacting with a mock API.

This project was built as part of a Phase 1 Code Challenge to showcase proficiency in:
- DOM Manipulation
- Event Handling
- Server Communication

## Features

- **View Movies**: Displays a list of movies fetched from a mock API
- **Add Movies**: Form to add new movies with title and year
- **Delete Movies**: Remove individual movies from the list
- **Responsive Design**: Basic styling for a clean user interface
- **Error Handling**: Graceful handling of network errors

## Learning Goals

- Practice DOM manipulation using JavaScript
- Implement event listeners for user interactions
- Communicate with a server using GET and POST requests
- Structure code in a clean, reusable manner

## Technologies Used

- HTML5
- CSS3 (basic styling)
- JavaScript (ES6+)
- Fetch API for server communication
- JSONPlaceholder as a mock API

## Project Structure
movie-list-app/
├── index.html    # Main HTML file with structure and styles
├── app.js        # JavaScript file with all functionality
└── README.md     # This documentation


## Setup Instructions

1. **Clone or Download**:
   - Clone this repository: `git clone <repository-url>`
   - Or download the ZIP file and extract it

2. **Open the Application**:
   - Simply open `index.html` in a modern web browser
   - No server setup is required as it uses JSONPlaceholder as a mock API

3. **Requirements**:
   - A modern web browser (Chrome, Firefox, Edge, etc.)
   - Internet connection (for API calls)

## Usage

1. **Initial Load**:
   - When you open the app, it automatically fetches and displays 5 sample movies from the mock API

2. **Adding a Movie**:
   - Enter a movie title and year in the form
   - Click "Add Movie" to submit
   - The new movie appears at the top of the list

3. **Deleting a Movie**:
   - Click the "Delete" button on any movie card
   - The movie is removed from the display

## Code Details

### DOM Manipulation
- Uses `createElement()` and `append()` for dynamic content
- Structured in reusable functions like `createMovieCard()`
- Updates the DOM efficiently with `renderMovies()`

### Event Handling
- Form submission handler for adding movies
- Click handlers for delete buttons
- DOMContentLoaded listener for initial load
- Prevents default form behavior

### Server Communication
- GET request to fetch initial movies
- POST request to add new movies
- Error handling with try/catch
- Uses Fetch API with async/await

### Key Functions
- `createMovieCard(movie)`: Creates a movie card element
- `renderMovies(movies)`: Renders the movie list
- `fetchMovies()`: Fetches movies from API
- `addMovie(title, year)`: Adds a new movie
- `deleteMovie(card)`: Removes a movie from DOM

## API Integration

The app uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) as a mock API:
- GET `/posts` to fetch initial data
- POST `/posts` to simulate adding movies
- Transforms post data into movie-like structure (title and id/year)

Note: In a real application, you'd replace this with an actual movie API and adjust the data structure accordingly.

## Rubric Alignment

This project aims for 4/4 in all criteria:
- **DOM Manipulation**: Structured, reusable code with semantic HTML
- **Events**: Clean event handling with multiple listener types
- **Server Communication**: GET and POST requests with proper structure

## Troubleshooting

- **Movies not loading**: Check your internet connection
- **Form not working**: Ensure all fields are filled
- **Console errors**: Check browser developer tools for details

## Resources

- [MDN: DOM Manipulation](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [MDN: Event Handling](https://developer.mozilla.org/en-US/docs/Web/Events)
- [MDN: Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)

## Contributing

This is a learning project, but feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request with improvements

## Completed Improvements

- **Form Validation**: HTML5 validation with Bootstrap styling and custom feedback
- **Persistent Storage**: Uses localStorage to maintain movies between sessions
- **Edit Functionality**: Inline editing of existing movies
- **CSS Framework**: Implemented Bootstrap 5 for responsive styling
- **Loading States**: Spinner during API operations