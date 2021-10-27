const url = require('url');
const express = require('express');
const needle = require('needle');
const apiCache = require('apicache');

const router = express.Router();

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

// init cache
let cache = apiCache.middleware;

router.get('/', cache('2 minutes'), async (req, res) => {
    try {
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            ...url.parse(req.url, true).query,
        });

        const apiRes = await needle('get', `${API_BASE_URL}?${params}`)

        const data = apiRes.body;

        if (process.env.NODE_ENV !== 'production') {
            console.log(`REQUEST: ${API_BASE_URL}?${params}`)
        }

        return res.status(200).json({ data })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})

module.exports = router;