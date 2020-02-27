const express = require("express")

const router = express.router()

router.get("/", (req, res) => {
    res.json({
        message: "Welcome to my api"
    })
})

module.exports = router