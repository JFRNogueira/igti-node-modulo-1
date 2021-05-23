const {
    getOneBrandDoc,
    getOneBrandSize,
    getAllBrandsNames
} = require('../repositories/models.repository');


const brandsWithSize = async function brandsWithSize() {
    const allBrands = await getAllBrandsNames();
    var brandsWithSizeArray = [];

    for (let index = 0; index < allBrands.length; index++) {
        var brandSize = await getOneBrandSize(allBrands[index]);
        const text = allBrands[index] + ' - ' + brandSize;
        const brandsWithSizeElement = {
            text: text,
            brand: allBrands[index],
            size: brandSize
        };
        brandsWithSizeArray.push(brandsWithSizeElement);
    }

    return brandsWithSizeArray;
}


const sortBySize = async function sortBySize(array, type) {
    var sortedArray = []
    if (type == 'asc') {
        sortedArray = array.sort((a, b) => {
            if (a.size > b.size) return 1;
            if (b.size > a.size) return -1;
            return 0;
        })
    } else {
        sortedArray = array.sort((a, b) => {
            if (a.size < b.size) return 1;
            if (b.size < a.size) return -1;
            return 0;
        })
    }
    return sortedArray;
}

const getFirstNElements = async function getFirstNElements(array, nElements) {
    var slicedArray = array.slice(0, nElements);
    return slicedArray;
}

const getFieldFromArray = async function getFieldFromArray(array, field) {
    var fieldArray = array.map(element => element[field]);
    return fieldArray;
}

exports.handleMainRequest = async function handleMainRequest(req, res) {
    const requestType = req.params.requestType
    const nModels = req.params.nModels || 1

    var sortType = ''
    if (requestType.toLowerCase().includes('mais')) {
        sortType = 'desc'
    }
    if (requestType.toLowerCase().includes('menos')) {
        sortType = 'asc'
    }

    const brandsWithSizeArray = await brandsWithSize()
    const brandsWithSizeSorted = await sortBySize(brandsWithSizeArray, sortType)
    var fieldArray = []
    if (nModels == 1) {
        fieldArray = await getFieldFromArray(brandsWithSizeSorted, 'brand')
    } else {
        fieldArray = await getFieldFromArray(brandsWithSizeSorted, 'text')
    }
    const response = await getFirstNElements(fieldArray, nModels)

    res.send(response)
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
