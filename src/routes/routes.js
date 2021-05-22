const express = require('express');

const router = express.Router();

router.get("/", (req, res) => {
    res.send('Hello World!')
});

// router.use((err, req, res, next) => {
//     logger.error(`${req.method} ${req.baseUrl} - ${err.message}`)
//     res.status(400).send({ error: err.message })
// })

module.exports = router