/*const http = require('http');
const server = http.createServer((request, response) => {
    response.end('Hola Mundo!');
})
const port = 5000; 
const host = 'localhost';
server.listen(port, host, () => {
    console.log(`Servidor ejecutandose en http://${host}:${port}`)
})*/

const express = require('express');
const app = express()
const UserRouter = require('./routers/userRouters')
const morgan = require('morgan') 
const userLogin = require('./middlewares/userLogin')
const path = require('path')

app.use(express.json())
app.use(morgan('dev'))
app.use(userLogin) 
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    const data = {
        "title": "Titulo de la pagina",
        "message": "Mensaje de la pagina",
        "showMessage": true,
        "items": [1,2,3,4,5,6]
    }
    res.render('index',data)
})

app.use('/users', UserRouter)

app.listen(3000, () => {
    console.log('Aplicacion con express ejecutandose en el puerto 3000')
})




