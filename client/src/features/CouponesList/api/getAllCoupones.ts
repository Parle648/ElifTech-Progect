export default function getAllCoupones() {
    return new Promise((resolve, reject) => {
        try {
            resolve(fetch('http://localhost:3001/api/all-coupones'))
        } catch (err) {
            reject(console.error(err))
        }
    })
    .then((response: any) => response.json())
    .then((data: any) => data);
};