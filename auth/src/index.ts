import  express from 'express'

const PORT = 3000
const app = express()

app.use(express.json())

app.get('/api/users/currentuser', (req, res) => {

    res.json({message: "Rafa"})
})

app.listen(PORT, () => console.log("Listening on 3000"))