const express = require('express')
const fetch = require('node-fetch')
const withQuery = require('with-query').default

//configure the enviroment variables
require('dotenv').config()

//set giphy key
const GIPHY_KEY = process.env.GIPHY_KEY

//Create and instance of express
const app = express();


app.get('/api/search-giphy', (req, resp) => {
    const url = withQuery('https://api.giphy.com/v1/gifs/search', {
        api_key: GIPHY_KEY,
        q: req.query.q,
        limit: 10,

    })
    fetch(url)
        .then(result => result.json())
        .then(result => {
            const gifs = result.data.map(d => {
                return {
                    title: d.title,
                    imageUrl: d.images.fixed_height.url
                }
            })
            console.info(">>>> gifs: " + gifs)
            resp.status(200).type('application/json')
            resp.json(gifs)
        })
        .catch(err => {
            resp.status(400).type('text/html').send(`error: ${JSON.stringify(err)}`)

        })
})

module.exports = app