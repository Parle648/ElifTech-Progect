export default function sendOrder(data: any) {
    return new Promise((resolve, reject) => {
        try {
            resolve(fetch('http://localhost:3001/api/mail/', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }))
        } catch (err) {
            reject(err)
        }
    })
    .then((response: any) => response.json())
}