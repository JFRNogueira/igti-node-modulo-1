const express = require('express');
const router = require('./routes/routes')
const app = express();
const PORT = 3000;

app.get('/marcas/maisModelos', (req, res) => {
    res.send('/marcas/maisModelos')
})
app.get('/marcas/menosModelos', (req, res) => {
    res.send('/marcas/menosModelos')
})
app.get('/marcas/maisModelos/:model', (req, res) => {
    res.send('/marcas/maisModelos/:model')
})
app.get('/marcas/menosModelos/:model', (req, res) => {
    res.send('/marcas/menosModelos/:model')
})
app.post('/marcas/listaModelos', (req, res) => {
    res.send('/marcas/listaModelos')
})

app.listen(PORT, ()=>{
    console.log(`Application is runnin on port ${PORT}`)
})