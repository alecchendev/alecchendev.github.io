'use strict';
require('dotenv').config({ path: require('find-config')('.env') });

const axios = require('axios');
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const { worker } = require('cluster');
const app = express();
// const bodyParser = require('body-parser');

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

// console.log(client_id);
// console.log(client_secret);

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));

router.get('/spotifyData', async (req, res) => {
    try {

        const response = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
            },
            params: {
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            },
            json: true
        });

        const { access_token } = response.data;

        const recentlyPlayed = await axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/me/player/recently-played',
            headers: { 
              'Authorization': 'Bearer ' + access_token,
            },
            params: {
                limit: 4
            },
            json: true
        });

        const played = recentlyPlayed.data.items.map((item) => item.track.name + ' by ' + item.track.artists[0].name);

        const userTracks = await axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/me/top/tracks',
            headers: { 
              'Authorization': 'Bearer ' + access_token,
            },
            params: {
                time_range: 'short_term'
            },
            json: true
        });

        const trackNames = userTracks.data.items.map((item) => item.name);

        const userArtists = await axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/me/top/artists',
            headers: { 
              'Authorization': 'Bearer ' + access_token,
            },
            params: {
                time_range: 'medium_term'
            },
            json: true
        });

        const artistNames = userArtists.data.items.map((item) => item.name);

        res.send({
            status: 200,
            message: 'It worked!',
            topTracks: trackNames,
            topArtists: artistNames,
            recents: played
        });
    } catch (err) {
        console.log(err);
        res.send({
            status: 500,
            message: 'Sorry, it didn\'t work.'
        })
    }
});

app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

module.exports = app;
module.exports.handler = serverless(app);