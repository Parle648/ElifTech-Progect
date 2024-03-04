export default function getChoosedProdcuts(choosedProducts: any) {
    const identificators = choosedProducts.map((product: any) => product.id);
    
    return new Promise((resolve, reject) => {
        try {
            resolve(fetch(`http://localhost:3001/api/choosed-products?choosed=[${identificators}]`))
        } catch (err) {
            reject(console.error(err))
        }
    })
    .then((response: any) => response.json())
    .then((data: any) => data)
}