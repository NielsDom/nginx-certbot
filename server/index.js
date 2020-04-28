"use strict"

const express = require("express")
const cors = require("cors")
const path = require("path")
const redis = require("redis")
const client = redis.createClient(process.env.REDIS_URL)

// Constants
const PORT = process.env.PORT || 8080
const HOST = "0.0.0.0"

// App
const app = express()
app.use(cors())
// Static files
app.use(express.static(path.join(__dirname, "../client/build")))

// API
app.get("/api", (req, res) => {
  res.set("Content-Type", "application/json")
  let data = {
    message: "Hello world, Woooooeeeee!!!!"
  }
  res.send(JSON.stringify(data, null, 2))
})

app.get("/addredis/:value", (req, res) => {
  const { value } = req.params
  client.set("string key", value)
  res.send(value)
})

app.get("/getredis", (req, res) => {
  client.get("string key", function(err, reply) {
    res.send(reply.toString())
  })
})

app.get("/yes", (req, res) => {
  res.send("yes")
})

app.get("/test", (req, res) => {
  res.send("test")
})

// All remaining requests return the React app, so it can handle routing.
app.get("*", function(request, response) {
  response.sendFile(path.join(CLIENT_BUILD_PATH, "index.html"))
})

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
