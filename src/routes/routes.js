const express = require('express');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const { handleMainRequest, listModels } = require('../services/models.service');

app.get('/marcas/:requestType', (req, res) => {
    return handleMainRequest(req, res)
})
app.get('/marcas/:requestType/:nModels', (req, res) => {
    return handleMainRequest(req, res)
})

app.post('/marcas/listaModelos', (req, res) => {
    return listModels(req, res)
})


module.exports = app