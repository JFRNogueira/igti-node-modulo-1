const express = require('express');
const router = require('./routes/routes')
const app = express();
const PORT = 3000;

const { handleMainRequest, moreModels, lessModels, moreModelsThan, lessModelsThan, listModels } = require('./services/models.service');

app.get('/marcas/:requestType', (req, res) => {
    return handleMainRequest(req, res)
})
app.get('/marcas/:requestType/:nModels', (req, res) => {
    return handleMainRequest(req, res)
})

app.post('/marcas/listaModelos/:brandName', (req, res) => {
    return listModels(req, res)
})

app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`)
})