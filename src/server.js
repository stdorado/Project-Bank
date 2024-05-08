import express from "express"
import cors from "cors"
import { client } from "./configs/database.js"

const app = express()
const PORT = process.env.PORT || 5000

//PostgreesSQL
client.connect()
.then(()=>{
    console.log('connection to db success')
})
.catch(err => console.error('Error to connection:',err))
.finally(()=> client.end())



app.use(express.json())
app.use(cors())


app.listen(PORT,()=>{
    console.log(`Escuchando el puerto ${PORT}`)
})