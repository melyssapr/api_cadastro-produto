import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // <--- SE O SEU MYSQL TIVER SENHA, COLOQUE AQUI!
    database: 'web_03mb' 
})

// Rota para mostrar os produtos
app.get('/products', (req, res) => {
    const q = "SELECT * FROM produtosMelyssaPereira"

    db.query(q, (err, data) => {
        if (err) return res.json(err)
        
        return res.status(200).json(data)
    })
})

// Rota para cadastrar produtos
app.post('/products', (req, res) => {
    const q = "INSERT INTO produtosMelyssaPereira (`name`, `price`, `category`, `description`) VALUES (?)"

    const values = [
        req.body.name,
        req.body.price,
        req.body.category,
        req.body.description
    ]

    db.query(q, [values], (err) => {
        if (err) return res.json(err)
        
        return res.status(200).json("Produto cadastrado com sucesso.")
    })
})

app.listen(8800, () => {
    console.log("Servidor rodando na porta 8800")
})