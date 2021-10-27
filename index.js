const express = require('express');
const cors = require('cors');
require('dotenv').config()

const PORT = process.env.PORT || 7000

const app = express()

app.use(cors)

app.get('/api', (req, res) => {
    res.json({ success: true })
})

app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`)
})