import express from "express"

const app = express()

app.use(express.json())

app.get('/', (request, response) => {
    response.send('teste')
})

const PORT = 3333

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })