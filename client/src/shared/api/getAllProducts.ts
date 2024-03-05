import { host } from "../constants/host";

export default function getAllProducts() {
    return new Promise((resolve, reject) => {
        try {
            resolve(fetch(`${host}/api/all-products`))
        } catch (error) {
            reject(console.error(error));
        }
    })
    .then((response: any) => response.json())
    .then(data => data)
};