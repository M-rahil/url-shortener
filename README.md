# URL Shortener
A full-stack URL shortening service built using Node.js, Express, and MongoDB Atlas.
This application allows users to generate short links, create custom aliases, set optional expiry dates, track clicks in real time, and generate QR codes through a modern, responsive user interface.

## Live Demo

https://url-shortener-6ip9.onrender.com


## Features
- Generate short URLs
- Custom short codes (user-defined aliases)
- Optional link expiry
- Real-time click tracking
- Live statistics updates
- QR code generation
- Dark mode support
- Input validation
- Duplicate short code prevention
- Rate limiting protection

## Technology Stack

### Frontend
- HTML5
- CSS3 (Modern UI with animations)
- Vanilla JavaScript

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- NanoID
- Express Rate Limit
- Dotenv


## Project Structure

url-shortener/
│
├── models/
│ └── Url.js
│
├── routes/
│ └── urlRoutes.js
│
├── public/
│ └── index.html
│
├── server.js
├── package.json
├── .gitignore
└── README.md

## Installation

### 1. Clone Repository
git clone https://github.com/your-username/url-shortener.git
cd url-shortener


### 2. Install Dependencies
npm install

### 3. Create Environment File
Create a `.env` file in the root directory:
MONGO_URI=your_mongodb_connection_string

### 4. Run the Server
node server.js
Application runs on:
http://localhost:5000


## API Endpoints
### Create Short URL
POST `/shorten`
Request Body:
{
"originalUrl": "https://example.com
",
"customCode": "optional-code",
"expiryDays": 7
}

### Redirect
GET `/:shortCode`
Redirects to the original URL if not expired.

### Get Statistics
GET `/stats/:shortCode`
Response:
{
"originalUrl": "...",
"shortCode": "...",
"clicks": 10,
"createdAt": "...",
"expiryDate": "..."
}

## Security
- Environment variables stored in `.env`
- `.env` excluded via `.gitignore`
- Rate limiting enabled
- Duplicate short codes validated

## Author
Mohammed Rahil Raza 
Full Stack Developer
