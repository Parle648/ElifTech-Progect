import { host } from "../../../shared/constants/host";

export default function getChoosedProdcuts(choosedProducts: any) {
    const identificators = choosedProducts.map((product: any) => product.id);
    
    return new Promise((resolve, reject) => {
        try {
            resolve(fetch(`${host}/api/choosed-products?choosed=[${identificators}]`))
        } catch (err) {
            reject(console.error(err))
        }
    })
    .then((response: any) => response.json())
    .then((data: any) => data)
}