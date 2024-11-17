import express from "express"
import dotenv from "dotenv"



const env = dotenv.config()
const app = express()

let port;

app.get('/', (req, res) => {
    res.send("hello world!")
})

process.env.PORT ? port = process.env.PORT : port = 3001;

app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})
