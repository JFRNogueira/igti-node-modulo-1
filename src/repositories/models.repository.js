const data = require('../data/car-list.json')

exports.getOneBrandDoc = async function getOneBrandDoc(brand) {
    for (let index = 0; index < data.length; index++) {
        const brandElement = data[index];
        if (brandElement['brand'] == brand) {
            return brandElement;
        }
    }
    throw new Error({ error: `Brand ${brand} not found` })
}

exports.getOneBrandSize = async function getOneBrandSize(brand) {
    for (let index = 0; index < data.length; index++) {
        const brandElement = data[index];
        if (brandElement['brand'] == brand) {
            const size = brandElement['models'].length;
            return size;
        }
    }
    throw new Error({ error: `Brand ${brand} not found` })
}


exports.getAllBrandsNames = async function getAllBrandsNames() {
    const brands = []
    for (let index = 0; index < data.length; index++) {
        const brandElement = data[index];
        var brandname = brandElement['brand'];
        brands.push(brandname)
    }
    return brands
}
