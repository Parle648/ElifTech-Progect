export default function getAllProducts() {
    return new Promise((resolve, reject) => {
        try {
            resolve(fetch('http://localhost:3001/api/all-products'))
        } catch (error) {
            reject(console.error(error));
        }
    })
    .then((response: any) => response.json())
    .then(data => data)
};