const express = require('express');
const router = require('./routes/routes')
const app = express();
const PORT = 3000;

const { moreModels, lessModels, moreModelsThan, lessModelsThan, listModels } = require('./services/models.service');

app.get('/marcas/maisModelos', (req, res) => {
    return moreModels(req, res)
})
app.get('/marcas/menosModelos', (req, res) => {
    return lessModels(req, res)
})
app.get('/marcas/listaMaisModelos/:nBrands', async (req, res) => {
    return moreModelsThan(req, res)
})
app.get('/marcas/listaMenosModelos/:nBrands', (req, res) => {
    return lessModelsThan(req, res)
})
app.post('/marcas/listaModelos/:brandName', (req, res) => {
    return listModels(req, res)
})

app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`)
})