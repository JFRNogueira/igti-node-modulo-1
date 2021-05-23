const {
    getOneBrandDoc,
    getOneBrandSize,
    getAllBrandsNames
} = require('../repositories/models.repository');


exports.moreModels = async function moreModels(req, res) {
    const allBrands = await getAllBrandsNames()
    var targetBrand = []
    var nModels = 0

    for (let index = 0; index < allBrands.length; index++) {
        var brandSize = await getOneBrandSize(allBrands[index])
        if (brandSize == nModels) {
            targetBrand.push(allBrands[index])
        }
        if (brandSize > nModels) {
            nModels = brandSize
            targetBrand = [allBrands[index]]
        }
    }

    res.send(targetBrand)
}


exports.lessModels = async function lessModels(req, res) {
    const allBrands = await getAllBrandsNames()
    var targetBrand = []
    var nModels = 1000000

    for (let index = 0; index < allBrands.length; index++) {
        var brandSize = await getOneBrandSize(allBrands[index])
        if (brandSize == nModels) {
            targetBrand.push(allBrands[index])
        }
        if (brandSize < nModels) {
            nModels = brandSize
            targetBrand = [allBrands[index]]
        }
    }

    res.send(targetBrand)
}


exports.moreModelsThan = async function moreModelsThan(req, res) {
    const allBrands = await getAllBrandsNames()
    var brandsArray = []
    const nBrands = req.params.nBrands

    for (let index = 0; index < allBrands.length; index++) {
        var brandSize = await getOneBrandSize(allBrands[index])
        const element = {
            text: `${allBrands[index]} - ${brandSize}`,
            size: brandSize
        }
        brandsArray.push(element)
    }

    sortedBrandsArray = brandsArray.sort((a, b) => {
        if (a.size < b.size) return 1;
        if (b.size < a.size) return -1;
        return 0;
    })

    var result = []
    for (let index = 0; index < nBrands; index++) {
        const element = sortedBrandsArray[index];
        const elementText = element.text
        result.push(elementText)
    }

    res.send(result)
}


exports.lessModelsThan = async function lessModelsThan(req, res) {
    const allBrands = await getAllBrandsNames()
    var brandsArray = []
    const nBrands = req.params.nBrands

    for (let index = 0; index < allBrands.length; index++) {
        var brandSize = await getOneBrandSize(allBrands[index])
        const element = {
            text: `${allBrands[index]} - ${brandSize}`,
            size: brandSize
        }
        brandsArray.push(element)
    }

    sortedBrandsArray = brandsArray.sort((a, b) => {
        if (a.size > b.size) return 1;
        if (b.size > a.size) return -1;
        return 0;
    })

    var result = []
    for (let index = 0; index < nBrands; index++) {
        const element = sortedBrandsArray[index];
        const elementText = element.text
        result.push(elementText)
    }

    res.send(result)
}


exports.listModels = async function listModels(req, res) {
    const brandName = req.params.brandName
    const allBrands = await getAllBrandsNames()
    var targetBrandName = ''

    for (let index = 0; index < allBrands.length; index++) {
        currentBrandname = allBrands[index]
        if (brandName.toLowerCase() == currentBrandname.toLowerCase()) {
            targetBrandName = currentBrandname
        }
    }

    if (targetBrandName == '') {
        res.send([])
    }

    const brandDoc = await getOneBrandDoc(targetBrandName)
    const brandModels = brandDoc.models
    res.send(brandModels)
}
