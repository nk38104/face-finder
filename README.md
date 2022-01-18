# Face Finder

Face Finder is a PERN stack web application that uses the Clarifai API to locate a face in a pciture. React.js serves as the front-end, Node.js as backend server with Express.js and PosrtgreSQL database for data storage (credentials, images scanned counter, etc). The user's rank gets upgraded every time user tries to detect a face in a picture.

## How to use the app
  Steps:
  
  1.  Clone this repo
  2.  Open your terminal and change directory to client directory(front-end) --> `cd ./client`
  3.  Run `npm install`
  4.  Open new terminal and change directory to server directory(back-end) --> `cd ./server`
  5.  Run `npm install`
  6.  Now you can either:

          1. Add your own Clarifai API key directly in the `controllers/image.js` to connect to Clarifai API (line 6)

          2. Add your own database credentials directly to `server.js` (line 19)

        ** In this case you can move `dotenv` and `config` from the project.<br>
        ** You can grab Clarifai API key [here](https://www.clarifai.com/).
    
      #### OR (recommended)
    
          1. Make .env file in server directory

          2. Initialize 4 variables in .env file

              NODE_ENV=development
              PORT=3000
              CLARIFAI_API_KEY=YOUR_API_KEY_HERE
              POSTGRES_PASSWORD=YOUR_DATABASE_PASSWORD_HERE
    
  7.  Run `npm start` in both terminals you opened at steps 2 and 4 (server and client direcotry terminals, if you closed them do steps 2 and 4 again).
## Technologies Used

### Front-End
- HTML/5
- CSS/3
- React.js

### Back-End
- Node.js
- Express.js

### NPM Packages
- parallax-tilt
- tsparticles
- tachyons
- bcryptjs
- clarifai
- cors
- dotenv
- express
- knex
- nodemon
- pg (postgres)

### APIs
- [Clarifai](https://www.clarifai.com/)
- [Face Finder API](https://github.com/nk38104/face-finder/tree/main/server)